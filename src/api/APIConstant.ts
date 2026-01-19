// Base url
export const ApiBaseURL = {
  DEVELOPMENT: 'http://3.108.139.142:6013/api/v1/',
};

// export const socketUrl = '';

// API end points
const PATIENT_PREFIX = 'patient/';

export const ApiEndPoints = {
  AUTH: {
    LOGIN: `${PATIENT_PREFIX}login`,
    RESENDOTP: `${PATIENT_PREFIX}resentOtp`,
    VERIFYOTP: `${PATIENT_PREFIX}verifyOtp`,
    COMPLETEPROFILE: `${PATIENT_PREFIX}update_patient`,
  },
  BOTTOMTAB: {
    KITLIST: `${PATIENT_PREFIX}getKitList`,
    KITDETAILS: `${PATIENT_PREFIX}getKitDetails`,
  },
  HOME: {
    GETANALITILIST: `${PATIENT_PREFIX}getAnalitiList`,
  },
  FAMILY: {
    GETFAMILYMEMBERLIST: `${PATIENT_PREFIX}getFamilyMember`,
    ADDFAMILYMEMBER: `${PATIENT_PREFIX}addFamilyMember`,
    UPDATEFAMILYMEMBER: `${PATIENT_PREFIX}updateFamilyMember`,
    DELETEFAMILYMEMBER: `${PATIENT_PREFIX}removeFamilyMember`,
    GETFAMILYMEMBERDETAILS: `${PATIENT_PREFIX}getFamilyMemberDetails`,
  },
  SETTINGS: {
    GETNOTIFICATIONTYPE: `${PATIENT_PREFIX}getNotificationTypes`,
    ADDUPDATENOTICATIONTYPE: `${PATIENT_PREFIX}addOrUpdateNotificationPermission`,
    LOGOUT: `${PATIENT_PREFIX}logout`,
    DELETEACCOUNT: `${PATIENT_PREFIX}delete_user`,
    PATIENTDETAILS: `${PATIENT_PREFIX}patient_details`,
    GETLIKEREPORTLIST: `${PATIENT_PREFIX}getLikeReportList`,
    GETCREDENTIAALS: `${PATIENT_PREFIX}credentials`,
  },
  MEDICAL: {
    GETMEDICALHISTORY: `${PATIENT_PREFIX}getmedicalHistory`,
    ADDMEDICALHISTORY: `${PATIENT_PREFIX}add_patient_medical`,
    DELETEMEDICALHISTORY: `${PATIENT_PREFIX}delete_patient_medical`,
  },
  ADDRESS: {
    GETADDRESS: `${PATIENT_PREFIX}getAddress`,
    UPDATEADDRESS: `${PATIENT_PREFIX}updateAddress`,
    REMOVEADDRESS: `${PATIENT_PREFIX}removeAddress`,
    ADDADDRESS: `${PATIENT_PREFIX}addAddress`,
  },
  ORDER: {
    GETORDERHISTORY: `${PATIENT_PREFIX}getOrderList`,
  },
  OTHER: {
    GETRELATIONTYPE: `${PATIENT_PREFIX}OtherDetails`,
  },
  CHECKOUT: {
    ADDTOCART: `${PATIENT_PREFIX}addToCart`,
    UPDATETOCART: `${PATIENT_PREFIX}updateCartItem`,
  },
  COUNT: {
    TOTALCOUNT: `${PATIENT_PREFIX}total_count`,
  },
};

// API methods
export const enum MethodType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

// API status code
export const StatusCode = {
  // SUCCESS: 200,
  // NOT_DATA_FOUND: 404,
  // UNAUTHORIZED_CODE: 401,
  // COMPLETE_PROFILE_ONE: 411,
  // COMPLETE_PROFILE_TWO: 412,
  // COMPLETE_PROFILE_THREE: 413,
  // NO_DATA_FOUND: 0,
  // DELETE_ACCOUNT: 3,
  // REDIRECT_TO_PROFILE: 11,
  // REDIRECT_TO_PROFILE_INFO: 12,
  // REDIRECT_TO_PROFILE_TYPE: 13,

  USER_SESSION_EXPIRE: -1,
  INVALID_OR_FAIL: 0,
  SUCCESS: 1,
  NO_DATA_FOUND: 2,
  INACTIVE_ACCOUNT: 3,
  OTP_NOT_VERIFIED: 4,
  SOCIAL_ID_NOT_REGISTERED: 11,
  NOT_APPROVE: 11,
  REQUEST_ERROR: 11,
  CODE_NULL: 8,
  NOT_REGISTERED: 12,
  NOT_SUBSCRIBED: 13,

  COMPLETE_PROFILE: 14,
  ADD_PREMIUM_DETAILS: 15,
  SET_AVAILABILITY: 16,
  UPLOAD_DOCUMENTS: 17,
  SELECT_PAYMENT_METHOD: 18,
  STEP_ONE: 19,
  STEP_TWO: 20,
  STEP_THREE: 21,
  STEP_FOUR: 22,
  STEP_FIVE: 23,
  STEP_SIX: 24,
};

// API keys
export const ApiKeys = {
  SECRET_KEY: 'xza548sa3vcr641b5ng5nhy9mlo64r6k',
  IV: '5ng5nhy9mlo64r6k',
};

// API Header key
export const ApiHeaderKeyValue = {
  API_KEY: 'health_care_app_api_key',
  API_KEY_VALUE: '4NX0qEJ8tGsMriZShOu62fK6l5/Cpev7i5+y6uLYBRg=',
  ACCEPT_LANGUAGE: 'accept-language',
};

export const OTPSendType = {
  SIGNUP: 'signup',
  FORGOT_PASSWORD: 'forgotpassword',
};

let loaderRef: any;
export const toggleLoader = (showLoader: any) => {
  if (loaderRef) {
    loaderRef.toggleLoader(showLoader);
  }
};

export const setLoaderRef = (ref: any) => {
  loaderRef = ref;
};
