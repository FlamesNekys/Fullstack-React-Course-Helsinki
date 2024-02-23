import { useState } from 'react';
import { IAddEntry } from '../../types';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';

const EntryForm = (props: IAddEntry) => {
    const [show, setShow] = useState<null | string>(null);

    return (
        <div style={{ marginTop: 20 }}>
            <div>
                <button onClick={() => setShow('HealthCheck')}>New health check entry</button>
                <button onClick={() => setShow('Hospital')}>New hospital entry</button>
                <button onClick={() => setShow('OccupationalHealthcare')}>New occupational healthcare entry</button>
            </div>
            <div>
                {show === 'HealthCheck' ? (
                    <HealthCheckForm diagnoses={props.diagnoses} setShow={setShow} addEntry={props.addEntry} />
                ) : show === 'Hospital' ? (
                    <HospitalForm diagnoses={props.diagnoses} setShow={setShow} addEntry={props.addEntry} />
                ) : show === 'OccupationalHealthcare' ? (
                    <OccupationalHealthcareForm
                        diagnoses={props.diagnoses}
                        setShow={setShow}
                        addEntry={props.addEntry}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default EntryForm;
