import axios from 'axios';
import { Patient, PatientFormValues, TEntryWithoutId } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

    return data;
};

const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

    return data;
};

const getUnique = async (id: string) => {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

    return data;
};

const addEntry = async (id: string, entry: TEntryWithoutId) => {
    const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, entry);

    return data;
};

export default {
    getAll,
    create,
    getUnique,
    addEntry,
};
