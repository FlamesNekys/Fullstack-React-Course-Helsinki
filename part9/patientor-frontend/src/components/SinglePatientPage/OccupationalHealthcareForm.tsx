import { useState } from 'react';
import { IAddEntryForm } from '../../types';
import { InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';

const OccupationalHealthcareForm = (props: IAddEntryForm) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');

    const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
        } = event;
        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
    };

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const entry = {
            description,
            date,
            specialist,
            diagnosisCodes,
            type: 'OccupationalHealthcare' as const,
            employerName,
            sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
        };

        props.addEntry(entry);
        setDescription('');
        setDate('');
        setSpecialist('');
        setDiagnosisCodes([]);
        setEmployerName('');
        setSickLeaveStart('');
        setSickLeaveEnd('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    Description:{' '}
                    <input type="text" value={description} onChange={({ target }) => setDescription(target.value)} />
                </div>
                <div>
                    Date: <input type="date" value={date} onChange={({ target }) => setDate(target.value)} />
                </div>
                <div>
                    Specialist:{' '}
                    <input type="text" value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
                </div>
                <div>
                    <InputLabel id="diagnoses">Diagnosis codes</InputLabel>
                    <Select
                        labelId="diagnoses"
                        id="diagnoses-codes"
                        multiple
                        value={diagnosisCodes}
                        onChange={handleChange}
                        input={<OutlinedInput label="Diagnosis" />}
                        style={{ minWidth: 200 }}
                    >
                        {props.diagnoses.map((d) => (
                            <MenuItem key={d} value={d}>
                                {d}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    Employer name:{' '}
                    <input type="text" value={employerName} onChange={({ target }) => setEmployerName(target.value)} />
                </div>
                <div>
                    Sick leave start:{' '}
                    <input
                        type="date"
                        value={sickLeaveStart}
                        onChange={({ target }) => setSickLeaveStart(target.value)}
                    />
                </div>
                <div>
                    Sick leave end:{' '}
                    <input type="date" value={sickLeaveEnd} onChange={({ target }) => setSickLeaveEnd(target.value)} />
                </div>
                <button type="submit">add</button>
            </form>
            <button onClick={() => props.setShow(null)}>cancel</button>
        </div>
    );
};

export default OccupationalHealthcareForm;
