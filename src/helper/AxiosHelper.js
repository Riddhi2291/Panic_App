import Axios from 'axios';
import {URLS} from '../constants/urls';

// Axios.defaults.baseURL = URLS.BASE_URL;

Axios.interceptors.request.use(async config => {
  const newConfig = {
    ...config,
  };

  // newConfig.headers = {
  //   authorization: `Bearer ${token}`,
  //   ...config.headers,
  // };

  newConfig.timeout = 30000;
  newConfig.baseURL = URLS.BASE_URL;

  return newConfig;
});

export const postRequestApi = (url, data, headers) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, data, {
      headers,
    })
      .then(response => {
        resolve(response?.data);
      })
      .catch(async error => {
        reject(await getApiError(error));
      });
  });
};

export const postRequestWithFormDataApi = (url, data) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, data, {
      'Content-Type': 'multipart/form-data;',
    })
      .then(response => {
        resolve(response?.data);
      })
      .catch(error => {
        reject(getApiError(error));
      });
  });
};

export const deleteRequestApi = (url, data, headers) => {
  return new Promise((resolve, reject) => {
    Axios.delete(url, {data, headers})
      .then(response => {
        resolve(response?.data);
      })
      .catch(async error => {
        reject(await getApiError(error));
      });
  });
};

export const putRequestApi = (url, data, headers) => {
  return new Promise((resolve, reject) => {
    Axios.put(url, data, {
      headers,
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(async error => {
        reject(await getApiError(error));
      });
  });
};

export const patchRequestApi = (url, data, headers) => {
  return new Promise((resolve, reject) => {
    Axios.patch(url, data, {
      headers,
    })
      .then(response => {
        resolve(response?.data);
      })
      .catch(async error => {
        reject(await getApiError(error));
      });
  });
};

export const getRequestApi = (url, params = undefined, isLoader = true) => {
  return new Promise((resolve, reject) => {
    Axios.get(params ? `${url}?${new URLSearchParams(params).toString()}` : url)
      .then(response => {
        resolve(response?.data);
      })
      .catch(async error => {
        reject(await getApiError(error));
      })
      .then(() => {
        if (isLoader === true) {
        }
      });
  });
};

export const getApiError = async error => {
  if (!error?.response || error?.response?.status === 502) {
    return {message: 'Unknown Error', status: null, error: true};
  }
  if (error?.response?.status === 500) {
    return {message: 'Something Went Wrong.', status: 500, error: true};
  }
  if (error?.response?.status === 401) {
    return {
      message: error?.response?.data?.message || 'Something Went Wrong.',
      status: 500,
      error: true,
    };
  }
  return {
    message: Array.isArray(error?.response?.data?.error)
      ? error.response.data.error[0]
      : error?.response?.data?.error,
    status: error?.response?.status,
    error: true,
  };
};
