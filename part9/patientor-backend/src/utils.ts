import { EGender, IDiagnosis, TBaseEntryWithoutId, TEntryWithoutId, TNewPatient } from './types/types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
    return typeof number === 'number' || number instanceof Number;
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
            entries: [],
        };

        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseDescription = (description: unknown): string => {
    if (!isString(description) || description.length < 1) {
        throw new Error('Incorrect or missing description: ' + description);
    }

    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist) || specialist.length < 1) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }

    return specialist;
};

const parseType = (type: unknown) => {
    if (!isString(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }

    if (type === 'HealthCheck') return 'HealthCheck';
    if (type === 'Hospital') return 'Hospital';
    if (type === 'OccupationalHealthcare') return 'OccupationalHealthcare';

    throw new Error('Incorrect or missing type: ' + type);
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
    if (!isNumber(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }

    return healthCheckRating;
};

const parseDischarge = (discharge: unknown) => {
    if (
        !discharge ||
        typeof discharge !== 'object' ||
        !('date' in discharge) ||
        !isString(discharge.date) ||
        !isDate(discharge.date) ||
        !('criteria' in discharge) ||
        !isString(discharge.criteria)
    ) {
        throw new Error('Incorrect or missing discharge' + discharge);
    }

    return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!isString(employerName) || employerName.length < 1) {
        throw new Error('Incorrect or missing employer name' + employerName);
    }

    return employerName;
};

const parseDiagnosisCodes = (object: unknown): Array<IDiagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<IDiagnosis['code']>;
    }

    return object.diagnosisCodes as Array<IDiagnosis['code']>;
};

const parseSickLeave = (sickLeave: unknown): { startDate: string; endDate: string } => {
    if (
        !sickLeave ||
        typeof sickLeave !== 'object' ||
        !('startDate' in sickLeave) ||
        !isString(sickLeave.startDate) ||
        !('endDate' in sickLeave) ||
        !isString(sickLeave.endDate)
    ) {
        throw new Error('Incorrect or missing sick leave' + sickLeave);
    }

    return sickLeave as { startDate: string; endDate: string };
};

const toNewEntry = (obj: unknown): TEntryWithoutId => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data: ' + obj);
    }

    if ('description' in obj && 'date' in obj && 'specialist' in obj && 'type' in obj) {
        const baseEntry: TBaseEntryWithoutId = {
            description: parseDescription(obj.description),
            date: parseDate(obj.date),
            specialist: parseSpecialist(obj.specialist),
            diagnosisCodes: parseDiagnosisCodes(obj),
        };

        switch (obj.type) {
            case 'HealthCheck':
                if (!('healthCheckRating' in obj)) {
                    throw new Error('Missing health check rating');
                }

                const newHealthCheckEntry: TEntryWithoutId = {
                    ...baseEntry,
                    type: parseType(obj.type) as 'HealthCheck',
                    healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
                };

                return newHealthCheckEntry;
            case 'Hospital':
                if (!('discharge' in obj)) {
                    throw new Error('Missing discharge');
                }

                const newHospitalEntry: TEntryWithoutId = {
                    ...baseEntry,
                    type: parseType(obj.type) as 'Hospital',
                    discharge: parseDischarge(obj.discharge) as {
                        date: string;
                        criteria: string;
                    },
                };

                return newHospitalEntry;
            case 'OccupationalHealthcare':
                if (!('employerName' in obj)) {
                    throw new Error('Missing employer name');
                }

                const newOccupationalHealthcareEntry: TEntryWithoutId = {
                    ...baseEntry,
                    type: parseType(obj.type) as 'OccupationalHealthcare',
                    employerName: parseEmployerName(obj.employerName),
                };

                if ('sickLeave' in obj) {
                    newOccupationalHealthcareEntry.sickLeave = parseSickLeave(obj.sickLeave) as {
                        startDate: string;
                        endDate: string;
                    };
                }

                return newOccupationalHealthcareEntry;
            default:
                throw new Error('Incorrect data: incorrect type');
        }
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default { toNewPatient, toNewEntry };
