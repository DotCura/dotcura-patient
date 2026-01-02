// import CryptoJS from 'crypto-js';
// import {
//   ApiBaseURL,
//   ApiEndPoints,
//   ApiHeaderKeyValue,
//   ApiKeys,
//   MethodType,
//   StatusCode,
//   toggleLoader,
// } from './APIConstant';
// import NetInfo from '@react-native-community/netinfo';
// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { ScreenNames } from '../constants/AppConstants';
// import { getTranslation } from '../localization/i18n/i18n.config';
// import { flashMessageWarning } from '../constants/GConstant';
// import { CommonActions } from '@react-navigation/native';
// import { MmkvManager } from '../constants/utils/MmkvManager';

// const SECRET = CryptoJS.enc.Utf8.parse(ApiKeys.SECRET_KEY);
// const ENC_IV = CryptoJS.enc.Utf8.parse(ApiKeys.IV);

// export const APIManager = {
//   getURL: (ApiEndPoints: any) => {
//     return ApiBaseURL.DEVELOPMENT + ApiEndPoints;
//   },
//   getHeader: () => {
//     return {
//       'api-key': ApiHeaderKeyValue.API_KEY_VALUE,
//       'accept-language': 'en',
//       'content-type': 'text/plain',
//     };
//   },

//   encryptText: (req: any) => {
//     try {
//       if (typeof req === 'object') {
//         req = JSON.stringify(req);
//       }
//       console.log('req', req);

//       const encrypted = CryptoJS.AES.encrypt(req, SECRET, {
//         iv: ENC_IV,
//       }).toString();
//       console.log('encrypted', encrypted);

//       return encrypted;
//     } catch (error: any) {
//       console.log('Encryption error:- ', error.message);
//       // return { req };
//       throw new Error('Failed to encrypt the data');

//       // callback({ req });
//     }
//   },

//   decryptText: (strData: any) => {
//     return JSON.parse(
//       CryptoJS.AES.decrypt(strData, SECRET, { iv: ENC_IV }).toString(
//         CryptoJS.enc.Utf8,
//       ),
//     );
//   },

//   makeRequest: async ({
//     navigation,
//     method,
//     apiEndPoint,
//     callback,
//     showLoader = true,
//     params,
//   }: any) => {
//     const netInfo = await NetInfo.fetch();

//     if (!netInfo.isConnected) {
//       // showSnackbar(localization.no_internet_connection);
//       callback({ code: 97, message: getTranslation('nointernetconnection') });
//       return;
//     }

//     if (showLoader) {
//       toggleLoader(true);
//     }
//     const headers: any = APIManager.getHeader();

//     let dataToSend: any = null;
//     let userToken: any = null;
//     MmkvManager.getData(MmkvManager.Keys.userToken, value => {
//       userToken = value;
//     });
//     // // let userToken = await StorageManager.getItem(StorageKeys.tokenHeader);
//     // let userToken = await MmkvManager.getData(MmkvManager.Keys.userToken)
//     console.log(userToken, 'user token ===========================');

//     if (userToken) {
//       console.log('in');

//       headers['user-token'] = userToken;
//       // headers.token = APIManager.encryptText(userToken);

//       if (params) {
//         dataToSend = APIManager.encryptText(params);
//       }
//       performApiRequest();
//     } else {
//       if (params) {
//         dataToSend = APIManager.encryptText(params);
//       }

//       // Make API request directly if no token is required
//       performApiRequest();
//     }

//     function performApiRequest() {
//       const axiosConfig = {
//         headers,
//       };

//       let request: any;

//       console.log(
//         '\n\n🚀🚀🚀 <========= API Request Log Start =========> 🚀🚀🚀\n\n',
//       );
//       console.log('\n\n==========Header==============\n', axiosConfig);
//       console.log(
//         '\n\n===============Encrpted Parameters============\n',
//         dataToSend,
//       );
//       console.log(
//         '\n\n==========Method & URL==========\n',
//         method,
//         APIManager.getURL(apiEndPoint),
//       );
//       console.log('\n\n===============Parameters============\n', params);

//       if (method === MethodType.GET) {
//         request = axios.get(APIManager.getURL(apiEndPoint), axiosConfig);
//       } else if (method === MethodType.POST) {
//         request = axios.post(
//           APIManager.getURL(apiEndPoint),
//           dataToSend,
//           axiosConfig,
//         );
//       }

//       request
//         .then((response: any) => {
//           handleResponse(response);
//         })
//         .catch((error: any) => {
//           handleError(error);
//         });
//     }

//     function handleResponse(response: any) {
//       if (response.status === 200) {
//         // console.log('\n\n========Original Response========\n', response.data);
//         const responseData = APIManager.decryptText(response.data);
//         console.log(
//           '\n\n========Decrypted Response========\n',
//           JSON.stringify(responseData),
//         );
//         console.log(
//           '\n\n🚀🚀🚀 <========= API Request Log End =========> 🚀🚀🚀\n\n',
//         );

//         if (showLoader) {
//           toggleLoader(false);
//         }

//         if (responseData.code === StatusCode.USER_SESSION_EXPIRE) {
//           handleUnauthorizedError();
//         } else {
//           callback(responseData);
//         }
//       } else if (response.status === 401) {
//         handleUnauthorizedError();

//         // hide loader
//         if (showLoader) {
//           toggleLoader(false);
//         }
//       } else {
//         callback(null, { message: 'Unknown error' });
//         // hide loader
//         if (showLoader) {
//           toggleLoader(false);
//         }
//       }
//     }

//     function handleError(error: any) {
//       if (error.response && error.response.status === 401) {
//         handleUnauthorizedError();

//         // hide loader
//         if (showLoader) {
//           toggleLoader(false);
//         }
//       }

//       // hide loader
//       if (showLoader) {
//         toggleLoader(false);
//       }
//       console.log(`Error while calling ${apiEndPoint} API:`, error);
//       console.log(`Error while calling======>`, error.response);
//       callback(null, { message: error.message });
//     }

//     async function handleUnauthorizedError() {
//       // await StorageManager.clearAll();
//       // StorageManager.setItem(StorageKeys.isWalkthroughVisisted, true);
//       flashMessageWarning(getTranslation('youhavebeenloggedout'));
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{ name: ScreenNames.WELCOMECONTAINER }],
//         }),
//       );

//       callback(null, { message: 'Session expired' });
//     }
//   },
// };
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
    MmkvManager.getData(MmkvManager.Keys.userToken, (value:any) => {
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
      'accept-language': 'en',
      'content-type': 'text/plain',
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
    params,
  }: any) => {
    /* ---- Internet check ---- */
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      callback({
        code: 97,
        message: getTranslation('nointernetconnection'),
      });
      return;
    }


    try {
      /* ---- Headers ---- */
      const headers: any = APIManager.getHeader();

      /* ---- Token (awaited) ---- */
      const userToken = await getUserToken();
      console.log(userToken, 'user token ===========================');

      // Add token only if exists
      if (userToken) {
        headers['user-token'] = userToken;
      }

      /* ---- Encrypt Params ---- */
      const dataToSend = params
        ? APIManager.encryptText(params)
        : null;

      /* ---- Logs ---- */
      console.log(
        '\n\n🚀🚀🚀 <========= API Request Log Start =========> 🚀🚀🚀\n\n',
      );
      console.log('\n========== Headers ==========\n', headers);
      console.log('\n========== Method ==========\n', method);
      console.log('\n========== URL ==========\n', APIManager.getURL(apiEndPoint));
      console.log('\n========== Params ==========\n', params);
      console.log('\n========== Encrypted ==========\n', dataToSend);

      /* ---- Axios Call ---- */
      let response;
      if (method === MethodType.GET) {
        response = await axios.get(
          APIManager.getURL(apiEndPoint),
          { headers },
        );
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
      } else {
        callback(null, { message: error.message });
      }
    } 

    /* =======================
       Unauthorized Handler
    ======================= */
    function handleUnauthorized() {
      flashMessageWarning(getTranslation('youhavebeenloggedout'));
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
