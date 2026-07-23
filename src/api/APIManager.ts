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
    const authEndPoints = [
      ApiEndPoints.AUTH.LOGIN,
      ApiEndPoints.SETTINGS.PATIENTDETAILS,
      ApiEndPoints.AUTH.VERIFYOTP,
      ApiEndPoints.AUTH.RESENDOTP,
      ApiEndPoints.AUTH.COMPLETEPROFILE,
      ApiEndPoints.OTHER.GETRELATIONTYPE,
      ApiEndPoints.SETTINGS.LOGOUT,
      ApiEndPoints.SETTINGS.DELETEACCOUNT,
    ];

    const paymentEndPoints = [
      ApiEndPoints.PAYMENT.ADDCARD,
      ApiEndPoints.PAYMENT.CARDLIST,
      ApiEndPoints.PAYMENT.SETDEFAULTCARD,
      ApiEndPoints.PAYMENT.DELETECARD,
      ApiEndPoints.CHECKOUT.ADDTOCART,
      ApiEndPoints.CHECKOUT.GETCARTITEMDETAILS,
      ApiEndPoints.CHECKOUT.UPDATETOCART,
      ApiEndPoints.CHECKOUT.REMOVETOCART,
      ApiEndPoints.CHECKOUT.BOOKORDER,
      ApiEndPoints.CHECKOUT.CHECKCOUPON,
      ApiEndPoints.ORDER.GETORDERHISTORY,
      ApiEndPoints.ORDER.GETORDERDETAILS,
      ApiEndPoints.ORDER.CANCLEORDER,
      ApiEndPoints.REPORT.REORDER,
      ApiEndPoints.ORDER.UPDATEORDERBOOKIN,
      ApiEndPoints.REPORT.SAVEREPORT45DAYS,
      ApiEndPoints.REPORT.GETREPORTDETAILS,
      ApiEndPoints.REPORT.LIKEUNLIKEREPORT,
      ApiEndPoints.SETTINGS.GETLIKEREPORTLIST,
      ApiEndPoints.TEST.GETTESTREPORTDETAILS,
      ApiEndPoints.PAYMENT.RATEANDREVIEW,
      ApiEndPoints.FAMILY.FAMILYMEMBERREPORTDETAILS,
      ApiEndPoints.COUNT.TOTALCOUNT,
      ApiEndPoints.PAYMENT.CREATEPAYMENTINTENT,
      ApiEndPoints.PAYMENT.CREATECUSTOMERCARDINTENT,
      ApiEndPoints.PAYMENT.GETPAYMENTDETAILS,
      ApiEndPoints.ORDER.CANCLEEDITORDER,
      ApiEndPoints.PAYMENT.GET_PENDING_PAYMENT_LIST,
      ApiEndPoints.PAYMENT.PAYPALCHECKOUTSESSION,
      ApiEndPoints.PAYMENT.KLARNACHECKOUTSESSION,
      ApiEndPoints.LIVEACTIVITYTOKEN.GETLIVEACTIVITYTOKEN,
      ApiEndPoints.ORDER.LASTBOOKINGDETAILS,
      ApiEndPoints.CHECKOUT.AVAILABILITYBYADDRESS,
    ];

    const patientEndPoints = [
      ApiEndPoints.SETTINGS.GETNOTIFICATIONTYPE,
      ApiEndPoints.SETTINGS.ADDUPDATENOTICATIONTYPE,
      ApiEndPoints.BOTTOMTAB.KITLIST,
      ApiEndPoints.BOTTOMTAB.KITDETAILS,
      ApiEndPoints.MEDICAL.GETMEDICALHISTORY,
      ApiEndPoints.FAMILY.ADDFAMILYMEMBER,
      ApiEndPoints.FAMILY.GETFAMILYMEMBERLIST,
      ApiEndPoints.FAMILY.GETFAMILYMEMBERDETAILS,
      ApiEndPoints.FAMILY.DELETEFAMILYMEMBER,
      ApiEndPoints.FAMILY.UPDATEFAMILYMEMBER,
      ApiEndPoints.ADDRESS.ADDADDRESS,
      ApiEndPoints.ADDRESS.GETADDRESS,
      ApiEndPoints.ADDRESS.REMOVEADDRESS,
      ApiEndPoints.ADDRESS.UPDATEADDRESS,
      ApiEndPoints.SETTINGS.NOTIFICATIONLIST,
      ApiEndPoints.HOME.GETANALITILIST,
      ApiEndPoints.ANALITI.GETANALITIDETAILS,
      ApiEndPoints.MEDICAL.ADDMEDICALHISTORY,
      ApiEndPoints.MEDICAL.DELETEMEDICALHISTORY,
      ApiEndPoints.OTHER.GET_PRESIGNED_URL,
      ApiEndPoints.SETTINGS.GETCREDENTIAALS,
      ApiEndPoints.AUTH.GETCONSENTLIST,
      ApiEndPoints.SETTINGS.GETCONSENTLISTUSER,
      ApiEndPoints.SETTINGS.UPDATECONSENT,
      ApiEndPoints.SETTINGS.DATA_EXPORT,
      ApiEndPoints.SETTINGS.DATA_EXPORT_LATEST,
    ];

    if (authEndPoints.includes(endPoint)) {
      return ApiBaseURL.DEVELOPMENT_AUTH + endPoint;
    }
    if (paymentEndPoints.includes(endPoint)) {
      return ApiBaseURL.DEVELOPMENT_PAYMENT + endPoint;
    }
    if (patientEndPoints.includes(endPoint)) {
      return ApiBaseURL.DEVELOPMENT_PATIENT + endPoint;
    }
    return ApiBaseURL.DEVELOPMENT_PATIENT + endPoint;
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
