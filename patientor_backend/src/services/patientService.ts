import patientsData from '../data/patients';
import { NonSensitivePatientsEntry, Patient, NewPatientEntry, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = ():NonSensitivePatientsEntry[] => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation})=> ({
    id, 
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patientsData.find(d => d.id === id);
  return entry;
};

const addPatient = (entry:NewPatientEntry ):Patient =>{
    const newPatientEntry = {
        id: uuid(), 
        ...entry
    };
    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (entry: EntryWithoutId, id_: string): Entry =>{
   const newEntry = {
    id: uuid(),
    ...entry
   };
  
 const elToChange = patientsData.find(el => el.id === id_);
 elToChange?.entries.push(newEntry);
//  patientsData.filter(el => el.id !== id_);
//  patientsData.push(elToChange as Patient);
 
 return newEntry;
};


export default {
  getPatients,
  findById,
  addPatient,
  addEntry
};