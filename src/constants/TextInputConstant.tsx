// <============================== Validation Constant ==============================>
export const ValidationConstant = {
  maxMobileDigit: 18,
  minMobileDigit: 8,

  minNameCharacters: 2,
  maxNameCharacters: 12,
  maxUserNameCharacters: 30,

  maxPassword: 6,
  minPassword: 8,
};

export const InputTypesEnum = {
  FIRSTNAME: "firstName",
  LASTNAME: "lastName",
  USERNAME: "userName",
  NAME: "name",
  EMAIL: "email",
  MOBILE: "mobile",
  PASSWORD: "password",
  ONCHANGEPASSWORD: "onChangePassword",
  ONCHANGEEMAIL: "onChangeEmail",
  ADDRESS: "address",
  CITY: "city",
  ZIPCODE: "zipCode",
  COUNTRY: "country",
  EXPERIENCE: "experience",
};

export const isValidInput = (inputType: keyof typeof InputTypesEnum, text: string) => {
  var pattern = /^[A-Za-z]+$/;

  if (
    inputType === InputTypesEnum.FIRSTNAME ||
    inputType === InputTypesEnum.LASTNAME
  ) {
    pattern = /^[A-Za-z]+$/;
  } else if (inputType === InputTypesEnum.USERNAME) {
    pattern = /^[A-Za-z0-9_.]+$/;
  } else if (inputType === InputTypesEnum.EMAIL) {
    pattern = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  } else if (inputType === InputTypesEnum.ONCHANGEEMAIL) {
    pattern = /^[A-Z0-9a-z.@]+$/;
  } else if (inputType === InputTypesEnum.MOBILE) {
    pattern = /^[0-9]{0,11}$/;
  } else if (inputType === InputTypesEnum.PASSWORD) {
    pattern =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&<>*~:`-]).{8,}$/;
  } else if (inputType === InputTypesEnum.ONCHANGEPASSWORD) {
    pattern = /^[A-Za-z0-9!@#$%&*]+$/;
  } else if (inputType === InputTypesEnum.ADDRESS) {
    pattern = /^[A-Za-z0-9, ]+$/;
  } else if (
    inputType === InputTypesEnum.CITY ||
    inputType === InputTypesEnum.COUNTRY ||
    inputType === InputTypesEnum.NAME
  ) {
    pattern = /^[A-Za-z ]+$/;
  } else if (inputType === InputTypesEnum.ZIPCODE) {
    pattern = /^[0-9]{0,6}$/;
  } else if (inputType === InputTypesEnum.EXPERIENCE) {
    pattern = /^[0-9.]{0,5}$/;
  }

  return pattern.test(text) || text === "";
};

export const formatPhoneNumber = (input: any) => {
  // Remove all non-digit characters
  const cleaned = input?.replace(/\D/g, "");

  // Slice to at most 10 digits
  const sliced = cleaned.slice(0, 18);

  // Format the phone number as (XXX) XXX-XXXX
  let formatted = "";
  for (let i = 0; i < sliced.length; i++) {
    if (i === 3 || i === 6 || i === 10) {
      formatted += " ";
    }
    formatted += sliced[i];
  }

  return formatted;
};

export const formatPhoneNumberForApi = (input: any) => {
  // Remove all non-digit characters
  // const cleaned = input.replace(/\D/g, "");

  // Slice to at most 10 digits
  const sliced = input.slice(0, 18);

  // Format the phone number as (XXX) XXX-XXXX
  let formatted = "";
  for (let i = 0; i < sliced.length; i++) {
    if (i === 3 || i === 6 || i === 10) {
      formatted += "-";
    }
    formatted += sliced[i];
  }

  return formatted;
};

export const getOrgMobileNumber = (number: any) => {
  return number.replace(/-/g, "");
};
