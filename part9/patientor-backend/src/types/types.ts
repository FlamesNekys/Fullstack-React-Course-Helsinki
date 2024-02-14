export interface IDiagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface IPatient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: 'male' | 'female' | 'other';
    occupation: string;
}

export type TNonSensitivePatient = Omit<IPatient, 'ssn'>;
