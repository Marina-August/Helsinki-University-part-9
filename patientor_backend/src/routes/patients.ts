import express from 'express';
import patientsService from '../services/patientService';
import toNewPatientEntry from '../utils';
import { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
    
        const addedPatient = patientsService.addPatient(newPatientEntry);
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
        const newEntry = toNewEntry(req.body);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const addedEntry = patientsService.addEntry(newEntry, id);
        res.json(addedEntry);
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
  });



export default router;