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

interface IBaseEntry {
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
