import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import { useEffect, useState } from 'react';
import patientsService from '../../services/patients';
import { getAll } from '../../services/diagnoses';
import EntryDetails from './EntryDetails';

const SinglePatientPage = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
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

    if (!patient) return null;

    return (
        <div>
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
