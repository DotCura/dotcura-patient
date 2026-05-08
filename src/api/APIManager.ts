import CryptoJS from 'crypto-js';
import {
  ApiBaseURL,
  ApiEndPoints,
  ApiHeaderKeyValue,
  ApiKeys,
  MethodType,
  StatusCode,
  toggleLoader,
} from './APIConstant';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { ScreenNames } from '../constants/AppConstants';
import { getTranslation } from '../localization/i18n/i18n.config';
import { flashMessageWarning } from '../constants/GConstant';
import { CommonActions } from '@react-navigation/native';
import { MmkvManager } from '../constants/utils/MmkvManager';
import { ZustandStores } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserStore from '../store/UserStore/UserStore';
import { usePaymentStore } from '../store/PaymentStore/PaymentStore';

/* =======================
   Encryption constants
======================= */
const SECRET = CryptoJS.enc.Utf8.parse(ApiKeys.SECRET_KEY);
const ENC_IV = CryptoJS.enc.Utf8.parse(ApiKeys.IV);

/* =======================
   Helper: Await MMKV
======================= */
const getUserToken = () =>
  new Promise<string | null>(resolve => {
    MmkvManager.getData(MmkvManager.Keys.userToken, (value: any) => {
      resolve(value);
    });
  });

export const APIManager = {
  /* =======================
     Base URL
  ======================= */
  getURL: (endPoint: string) => {
    return ApiBaseURL.DEVELOPMENT + endPoint;
  },

  /* =======================
     Headers
  ======================= */
  getHeader: () => {
    return {
      'api-key': ApiHeaderKeyValue.API_KEY_VALUE,
      'accept-language': 'es',
      'content-type': 'text/plain',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  },

  /* =======================
     Encrypt
  ======================= */
  encryptText: (req: any) => {
    try {
      const data = typeof req === 'object' ? JSON.stringify(req) : req;
      console.log('req', data);

      const encrypted = CryptoJS.AES.encrypt(data, SECRET, {
        iv: ENC_IV,
      }).toString();

      console.log('encrypted', encrypted);
      return encrypted;
    } catch (error: any) {
      console.log('Encryption error:', error.message);
      throw new Error('Failed to encrypt the data');
    }
  },

  /* =======================
     Decrypt
  ======================= */
  decryptText: (strData: any) => {
    return JSON.parse(
      CryptoJS.AES.decrypt(strData, SECRET, {
        iv: ENC_IV,
      }).toString(CryptoJS.enc.Utf8),
    );
  },

  /* =======================
     Make Request
  ======================= */
  makeRequest: async ({
    navigation,
    method,
    apiEndPoint,
    callback,
    showLoader = true,
    params,
  }: any) => {
    /* ---- Internet check ---- */
    // const netInfo = await NetInfo.fetch();

    // if (!netInfo.isConnected) {
    //   callback({
    //     code: 97,
    //     message: getTranslation('nointernetconnection'),
    //   });
    //   return;
    // }
    console.log('showLoader=================', showLoader);

    try {
      /* ---- Headers ---- */
      if (showLoader) {
        toggleLoader(true);
      }
      const headers: any = APIManager.getHeader();

      /* ---- Token (awaited) ---- */
      const userToken = await getUserToken();
      console.log(userToken, 'user token ===========================');

      // Add token only if exists
      if (userToken) {
        headers['user-token'] = userToken;
      }

      /* ---- Encrypt Params ---- */
      const dataToSend = params ? APIManager.encryptText(params) : null;

      /* ---- Logs ---- */
      console.log(
        '\n\n🚀🚀🚀 <========= API Request Log Start =========> 🚀🚀🚀\n\n',
      );
      console.log('\n========== Headers ==========\n', headers);
      console.log('\n========== Method ==========\n', method);
      console.log(
        '\n========== URL ==========\n',
        APIManager.getURL(apiEndPoint),
      );
      console.log('\n========== Params ==========\n', params);
      console.log('\n========== Encrypted ==========\n', dataToSend);

      /* ---- Axios Call ---- */
      let response;
      if (method === MethodType.GET) {
        response = await axios.get(APIManager.getURL(apiEndPoint), { headers });
      } else {
        response = await axios.post(
          APIManager.getURL(apiEndPoint),
          dataToSend,
          { headers },
        );
      }

      /* ---- Handle Response ---- */
      if (response.status === 200) {
        const responseData = APIManager.decryptText(response.data);

        console.log(
          '\n========== Decrypted Response ==========\n',
          JSON.stringify(responseData),
        );
        console.log(
          '\n🚀🚀🚀 <========= API Request Log End =========> 🚀🚀🚀\n\n',
        );

        if (showLoader) {
          toggleLoader(false);
        }

        if (responseData.code === StatusCode.USER_SESSION_EXPIRE) {
          handleUnauthorized();
        } else {
          callback(responseData);
        }
      } else {
        callback(null, { message: 'Unknown error' });
      }
    } catch (error: any) {
      console.log(`Error while calling ${apiEndPoint} API:`, error);

      if (error?.response?.status === 401) {
        handleUnauthorized();
        if (showLoader) {
          toggleLoader(false);
        }
      } else {
        callback(null, { message: error.message });
        if (showLoader) {
          toggleLoader(false);
        }
      }
    }

    /* =======================
       Unauthorized Handler
    ======================= */
    function handleUnauthorized() {
      flashMessageWarning(getTranslation('youhavebeenloggedout'));
      console.log('above');
      const { resetCart, resetNotificationCount } =
        ZustandStores.CartStore.getState();
      const { clearOrderData } = ZustandStores.OrderstatusStore.getState();
      console.log('below');

      AsyncStorage.removeItem('cart-store');
      resetCart();
      resetNotificationCount();
      clearOrderData();
      UserStore.getState().logout();
      usePaymentStore.getState().resetAll();
      MmkvManager.clearAllExcept([MmkvManager.Keys.isOnBoardingVisisted]);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ScreenNames.WELCOMECONTAINER }],
        }),
      );
      callback(null, { message: 'Session expired' });
    }
  },
};
