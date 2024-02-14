import diagnosesData from '../data/diagnoses';
import { IDiagnosis } from '../types/types';

const getDiagnoses = (): IDiagnosis[] => {
    return diagnosesData;
};

export default {
    getDiagnoses,
};
