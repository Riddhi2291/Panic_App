import {URLS} from '../constants/urls';
import {getRequestApi, postRequestApi} from '../helper/AxiosHelper';

const checkValidOTP = async data => {
  try {
    const response = await postRequestApi(URLS?.VERIFY_OTP, data);
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  checkValidOTP,
};
