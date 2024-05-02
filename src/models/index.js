import PublicModel from './PublicModel.ts';

export const initiateEmptyStore = () => {
  new PublicModel({
    id: 'population',
    population: [],
  }).$save();
};
