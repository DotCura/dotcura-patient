import axios from 'axios';
import {
  ApiEndPoints,
  ApiHeaderKeyValue,
  toggleLoader,
} from '../api/APIConstant';
import { MmkvManager } from '../constants/utils/MmkvManager';
import { APIManager } from '../api/APIManager';

/* 🔹 Helper to get token properly */
const getUserToken = (): Promise<string | null> => {
  return new Promise(resolve => {
    MmkvManager.getData(MmkvManager.Keys.userToken, (value: any) => {
      resolve(value);
    });
  });
};

/* 🔹 Global upload function */
export const uploadFile = async (file: any): Promise<string> => {
  console.log('upload file type:', file.type);
  toggleLoader(true);
  try {
    const userToken = await getUserToken();
    console.log('userToken:', userToken);

    const response = await axios.post(
      APIManager.getURL(ApiEndPoints.OTHER.GET_PRESIGNED_URL),
      { file_type: file.type, folder: 'document' },
      {
        headers: {
          'api-key': ApiHeaderKeyValue.API_KEY_VALUE,
          'accept-language': 'es',
          'user-token': userToken,
        },
      },
    );
    console.log(response, 'response ==========');

    // console.log('Presigned URL API response:', response.data);

    const responseData = APIManager.decryptText(response.data);
    console.log(responseData, 'responseData ==========');

    const { url, file_name } = responseData.data;

    console.log('Upload URL:', url);
    console.log('File name:', file_name);
    // console.log(file, 'file come from picker==============');

    const uploadBlob = await fetch(file.uri);
    const blob = await uploadBlob.blob();
    // console.log(blob,'blob=============================');

    await axios.put(url, blob, {
      headers: {
        'Content-Type': file.type,
        'Content-Disposition': 'inline',
      },
      transformRequest: data => data,
    });

    console.log('File uploaded successfully');
    toggleLoader(false);
    return file_name;
  } catch (error) {
    toggleLoader(false);
    console.log('Upload error:', error);
    throw error;
  }
};
