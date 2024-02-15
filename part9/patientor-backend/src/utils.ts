import { EGender, TNewPatient } from './types/types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }

    return name;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }

    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }

    return occupation;
};

const isGender = (gender: string): gender is EGender => {
    return Object.values(EGender)
        .map((v) => v.toString())
        .includes(gender);
};

const parseGender = (gender: unknown): EGender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

const toNewPatient = (obj: unknown): TNewPatient => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data: ' + obj);
    }

    if ('name' in obj && 'dateOfBirth' in obj && 'ssn' in obj && 'occupation' in obj && 'gender' in obj) {
        const newPatient: TNewPatient = {
            name: parseName(obj.name),
            dateOfBirth: parseDate(obj.dateOfBirth),
            ssn: parseSsn(obj.ssn),
            occupation: parseOccupation(obj.occupation),
            gender: parseGender(obj.gender),
        };

        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
