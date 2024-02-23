import express from 'express';
import patientsService from '../services/patientsService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientsService.getUniquePatient(id);

    if (patient) res.json(patient);
    else res.status(404).send("Error 404: Can't find patient with proper id");
});

router.post('/', (req, res) => {
    try {
        const newPatient = utils.toNewPatient(req.body);

        const addedPatient = patientsService.addPatient(newPatient);

        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;

    try {
        const newEntry = utils.toNewEntry(req.body);

        const changedPatient = patientsService.addEntry(id, newEntry);

        res.json(changedPatient);
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
