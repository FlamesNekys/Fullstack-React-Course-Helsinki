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

export interface IPatient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: EGender;
    occupation: string;
}

export type TNonSensitivePatient = Omit<IPatient, 'ssn'>;

export type TNewPatient = Omit<IPatient, 'id'>;
