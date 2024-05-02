import {BaseModel} from '../reduxStore';

interface DataSectionConfig {
  population: any[];
}

export default class PublicModel extends BaseModel<DataSectionConfig> {
  static resource = 'PublicModel';
}
