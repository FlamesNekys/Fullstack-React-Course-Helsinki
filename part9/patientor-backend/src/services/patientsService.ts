import patients from '../data/patients';
import { IPatient, TEntryWithoutId, TNewPatient, TNonSensitivePatient } from '../types/types';
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

const addEntry = (id: string, entry: TEntryWithoutId): IPatient => {
    const entryId = uuid();
    const newEntry = {
        id: entryId,
        ...entry,
    };

    const patient = patients.find((p) => p.id === id);

    if (!patient) throw new Error('Incorrect id');

    patient.entries.push(newEntry);

    patients.map((p) => (p.id === id ? patient : p));

    return patient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getUniquePatient,
    addEntry,
};
