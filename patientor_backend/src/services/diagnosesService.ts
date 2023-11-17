import diagnosesData from '../data/diagnoses';
import { Diagnoses } from '../types';

const getDiagnosess = ():Diagnoses[] => {
  return diagnosesData;
};

// const addDiary = () => {
//   return null;
// };

export default {
  getDiagnosess,
};