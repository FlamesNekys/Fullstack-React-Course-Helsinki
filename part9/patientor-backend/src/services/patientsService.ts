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

const getUniquePatient = (id: string): IPatient | undefined => {
    return patients.find((p) => p.id === id);
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getUniquePatient,
};
