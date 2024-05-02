import {URLS} from '../constants/urls';
import {getRequestApi} from '../helper/AxiosHelper';
import PublicModel from '../models/PublicModel';

const getPopulation = async data => {
  try {
    const response = await getRequestApi(
      `${URLS.BASE_URL}${URLS.GET_POPULATION}`,
    );
    new PublicModel({
      id: 'population',
      population: response?.data,
    }).$save();
    return response?.data;
  } catch (error) {
    return error;
  }
};

export default {
  getPopulation,
};
