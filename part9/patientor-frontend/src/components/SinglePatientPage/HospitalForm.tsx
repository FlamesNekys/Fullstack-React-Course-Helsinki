import { useState } from 'react';
import { IAddEntryForm } from '../../types';
import { InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';

const HospitalForm = (props: IAddEntryForm) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');

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
            type: 'Hospital' as const,
            discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };

        props.addEntry(entry);
        setDescription('');
        setDate('');
        setSpecialist('');
        setDiagnosisCodes([]);
        setDischargeDate('');
        setDischargeCriteria('');
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
                    Discharge date:{' '}
                    <input
                        type="date"
                        value={dischargeDate}
                        onChange={({ target }) => setDischargeDate(target.value)}
                    />
                </div>
                <div>
                    Discharge criteria:{' '}
                    <input
                        type="text"
                        value={dischargeCriteria}
                        onChange={({ target }) => setDischargeCriteria(target.value)}
                    />
                </div>
                <button type="submit">add</button>
            </form>
            <button onClick={() => props.setShow(null)}>cancel</button>
        </div>
    );
};

export default HospitalForm;
