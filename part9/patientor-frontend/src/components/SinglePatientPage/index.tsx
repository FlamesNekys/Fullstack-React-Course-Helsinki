import { useParams } from 'react-router-dom';
import { Diagnosis, Patient, TEntryWithoutId } from '../../types';
import { useEffect, useState } from 'react';
import patientsService from '../../services/patients';
import { getAll } from '../../services/diagnoses';
import EntryDetails from './EntryDetails';
import EntryForm from './EntryForm';
import { isAxiosError } from 'axios';
import Notify from '../Notify';

const SinglePatientPage = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            const patient = await patientsService.getUnique(id as string);
            const diagnoses = await getAll();

            setDiagnoses(diagnoses);
            patient ? setPatient(patient) : false;
        };
        fetch();
    }, [id]);

    const addEntry = async (entry: TEntryWithoutId) => {
        try {
            const changedPatient = await patientsService.addEntry(id as string, entry);

            setPatient(changedPatient);
        } catch (error) {
            let errorMessage = 'Something bad happened.';
            if (isAxiosError(error)) {
                errorMessage = error.response?.data;
            }

            setError(errorMessage);
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    };

    if (!patient) return null;

    return (
        <div>
            <Notify note={error} />
            <EntryForm diagnoses={diagnoses.map((d) => d.code)} addEntry={addEntry} />
            <h2>{patient.name}</h2>
            <p>gender: {patient.gender}</p>
            <p>birth date: {patient.dateOfBirth}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h3>entries</h3>
            <div>
                {patient.entries?.map((e) => (
                    <div key={e.id}>
                        <p>
                            <strong>
                                {e.date} <i>{e.description}</i>
                            </strong>
                        </p>
                        <ul>
                            {e.diagnosisCodes?.map((c) => (
                                <li key={c}>
                                    {c} {diagnoses.find((d) => d.code === c)?.name}
                                </li>
                            ))}
                        </ul>
                        <EntryDetails entry={e} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SinglePatientPage;
