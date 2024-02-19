import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Diagnosis } from '../types';

export const getAll = async () => {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

    return data;
};
