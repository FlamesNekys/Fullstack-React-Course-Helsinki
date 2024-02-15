import patients from '../data/patients';
import { IPatient, TNewPatient, TNonSensitivePatient } from '../types/types';
import { v1 as uuid } from 'uuid';

const getPatients = (): IPatient[] => {
    return patients;
};

const getNonSensitivePatients = (): TNonSensitivePatient[] => {
    return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (patient: TNewPatient): IPatient => {
    const id = uuid();
    const newPatient = {
        id,
        ...patient,
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
};
