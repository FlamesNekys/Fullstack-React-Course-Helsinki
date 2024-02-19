export interface IDiagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum EGender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

interface IBaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<IDiagnosis['code']>;
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

export interface IPatient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: EGender;
    occupation: string;
    entries: TEntry[];
}

export type TNonSensitivePatient = Omit<IPatient, 'ssn' | 'entries'>;

export type TNewPatient = Omit<IPatient, 'id'>;
