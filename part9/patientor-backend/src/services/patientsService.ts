import patientsData from '../data/patients';
import { IPatient, TNonSensitivePatient } from '../types/types';

const getPatients = (): IPatient[] => {
    return patientsData;
};

const getNonSensitivePatients = (): TNonSensitivePatient[] => {
    return patientsData.map(({ dateOfBirth, gender, id, name, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

export default {
    getPatients,
    getNonSensitivePatients,
};
