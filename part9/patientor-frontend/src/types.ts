export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface IBaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum EHealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

interface IHealthCheckEntry extends IBaseEntry {
    type: 'HealthCheck';
    healthCheckRating: EHealthCheckRating;
}

interface IHospitalEntry extends IBaseEntry {
    type: 'Hospital';
    discharge: { date: string; criteria: string };
}

interface IOccupationalHealthcare extends IBaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: { startDate: string; endDate: string };
}

export type TEntry = IHealthCheckEntry | IHospitalEntry | IOccupationalHealthcare;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type TEntryWithoutId = UnionOmit<TEntry, 'id'>;

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries?: TEntry[];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

export interface IAddEntry {
    addEntry: (entry: TEntryWithoutId) => Promise<void>;
    diagnoses: Array<Diagnosis['code']>;
}

export interface IAddEntryForm extends IAddEntry {
    setShow: React.Dispatch<React.SetStateAction<string | null>>;
}
