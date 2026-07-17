export const isLive = true;

// Base url
export const ApiBaseURL = {
  DEVELOPMENT_AUTH: isLive
    ? 'https://auth-api.dotcura.com/api/v1/auth/'
    : 'https://staging-auth-api.dotcura.com/api/v1/auth/',
  DEVELOPMENT_PAYMENT: isLive
    ? 'https://payment-api.dotcura.com/api/v1/booking/'
    : 'https://staging-payment-api.dotcura.com/api/v1/booking/',
  DEVELOPMENT_PATIENT: isLive
    ? 'https://patient-api.dotcura.com/api/v1/'
    : 'https://staging-patient-api.dotcura.com/api/v1/',
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
    GETCONSENTLIST: `${PATIENT_PREFIX}get-consent-list`,
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
    FAMILYMEMBERREPORTDETAILS: `${PATIENT_PREFIX}family_report`,
  },
  SETTINGS: {
    GETNOTIFICATIONTYPE: `${PATIENT_PREFIX}getNotificationTypes`,
    ADDUPDATENOTICATIONTYPE: `${PATIENT_PREFIX}addOrUpdateNotificationPermission`,
    LOGOUT: `${PATIENT_PREFIX}logout`,
    DELETEACCOUNT: `${PATIENT_PREFIX}delete_user`,
    PATIENTDETAILS: `${PATIENT_PREFIX}patient_details`,
    GETLIKEREPORTLIST: `${PATIENT_PREFIX}getLikeReportList`,
    GETCREDENTIAALS: `${PATIENT_PREFIX}credentials`,
    NOTIFICATIONLIST: `${PATIENT_PREFIX}getNotificationList`,
  },
  TEST: {
    GETTESTREPORTDETAILS: `${PATIENT_PREFIX}getTestReportHistory`,
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
    GETORDERDETAILS: `${PATIENT_PREFIX}get-edit-booking-details`,
    UPDATEORDERBOOKIN: `${PATIENT_PREFIX}updatebookingOrder`,
    CANCLEEDITORDER: `${PATIENT_PREFIX}cancel-edit-booking`,
    CANCLEORDER: `${PATIENT_PREFIX}cancelOrder`,
    LASTBOOKINGDETAILS: `${PATIENT_PREFIX}last_booking_details`,
  },
  OTHER: {
    GETRELATIONTYPE: `${PATIENT_PREFIX}OtherDetails`,
    GET_PRESIGNED_URL: `${PATIENT_PREFIX}get_presigned_url`,
  },
  CHECKOUT: {
    ADDTOCART: `${PATIENT_PREFIX}addToCart`,
    UPDATETOCART: `${PATIENT_PREFIX}updateCartItem`,
    GETCARTITEMDETAILS: `${PATIENT_PREFIX}getCartDetails`,
    REMOVETOCART: `${PATIENT_PREFIX}removeCartItem`,
    BOOKORDER: `${PATIENT_PREFIX}bookOrder`,
    CHECKCOUPON: `${PATIENT_PREFIX}checkCoupon`,
    AVAILABILITYBYADDRESS: `${PATIENT_PREFIX}availability-by-address`,
  },
  COUNT: {
    TOTALCOUNT: `${PATIENT_PREFIX}total_count`,
  },
  ANALITI: {
    GETANALITIDETAILS: `${PATIENT_PREFIX}getAnalitiDetails`,
  },
  REPORT: {
    GETREPORTDETAILS: `${PATIENT_PREFIX}getReportDetails`,
    REORDER: `${PATIENT_PREFIX}reOrder`,
    LIKEUNLIKEREPORT: `${PATIENT_PREFIX}likeUnlikeReport`,
    SAVEREPORT45DAYS: `${PATIENT_PREFIX}save_report`,
  },
  PAYMENT: {
    GETPAYMENTDETAILS: `${PATIENT_PREFIX}get_payment_details`,
    CREATEPAYMENTINTENT: `${PATIENT_PREFIX}create_payment_intent`,
    CREATECUSTOMERCARDINTENT: `${PATIENT_PREFIX}create_customer_card_intent`,
    GET_PENDING_PAYMENT_LIST: `${PATIENT_PREFIX}get_pending_payment_list`,
    RATEANDREVIEW: `${PATIENT_PREFIX}addEditRate`,
    CARDLIST: `${PATIENT_PREFIX}get_card`,
    ADDCARD: `${PATIENT_PREFIX}add_card`,
    SETDEFAULTCARD: `${PATIENT_PREFIX}default_card`,
    DELETECARD: `${PATIENT_PREFIX}delete_card`,
    PAYPALCHECKOUTSESSION: `${PATIENT_PREFIX}paypal-checkout-session`,
    KLARNACHECKOUTSESSION: `${PATIENT_PREFIX}Klarna-checkout-session`,
  },
  LIVEACTIVITYTOKEN: {
    GETLIVEACTIVITYTOKEN: `${PATIENT_PREFIX}send_live_activity_token`,
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
