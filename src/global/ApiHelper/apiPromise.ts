// apiPromise.ts

import { APIManager } from '../../api/APIManager';

export interface ApiPromiseParams {
  showLoader: any;
  navigation: any;
  apiEndPoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, any>;
}

/**
 * Generic Promise wrapper for APIManager
 * Resolves with the APIManager callback result
 * Does not reject — you handle codes 0/1/2 in hook
 */
export const apiPromise = ({
  apiEndPoint,
  method,
  params,
  navigation,
  showLoader,
}: ApiPromiseParams) =>
  new Promise<any>(resolve => {
    APIManager.makeRequest({
      navigation,
      method,
      apiEndPoint,
      callback: resolve,
      showLoader,
      params,
    });
  });
