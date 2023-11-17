import { NewPatientEntry, Gender, Entry, EntryWithoutId, HospitalEntryWithoutId, Discharge, Diagnoses, OccupationalHealthcareEntryWithoutId, SickLeave, HealthCheckEntryWithoutId, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const parseName = (name: unknown): string => {
    if (!isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
  };

  const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth)) {
      throw new Error('Incorrect or missing date of birth');
    }
  
    return dateOfBirth;
  };

  const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
      throw new Error('Incorrect or missing social security number');
    }
  
    return ssn;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
    return occupation;
  };

  const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
  };

  const parseEntries = (entries:unknown): Entry[] =>{
    return entries as Entry[];
  };



const toNewPatientEntry = (object:unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object)  {
      
      const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
      };
    return newEntry;
 }
  throw new Error('Incorrect data: a field missing');
};

const parseDescription =(description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};
const parseSpecialist =(specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDate =(date: unknown): string => {
  if (!isString(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};



const parseDischarge =(discharge: unknown): Discharge => {
  return discharge as Discharge;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnoses['code']> =>  {

  return diagnosisCodes as Array<Diagnoses['code']>;
};

const parseEmployerName =(employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const parseSickLeave =(sickLeave: unknown): SickLeave => {
  return sickLeave as SickLeave;
};


const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
 
  return healthCheckRating as HealthCheckRating;
};



export const toNewEntry = (object:unknown):EntryWithoutId =>{
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  console.log('---------');
  console.log(object);
  if ('diagnosisCodes' in object){
    if ('type' in object && object.type === "Hospital"){
      if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object && 'discharge' in object){
            const newEntry: HospitalEntryWithoutId = {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
              type: "Hospital",
              discharge: parseDischarge(object.discharge),
          
            };
            return newEntry;
           }
          } else if ('type' in object && object.type === "OccupationalHealthcare"){
           if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object && 'employerName' in object
            && 'sickLeave' in object) {
            const entry:OccupationalHealthcareEntryWithoutId = {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
              type: "OccupationalHealthcare",
              employerName: parseEmployerName(object.employerName),
              sickLeave: parseSickLeave(object.sickLeave)
            };
            return entry;
          }
        } else {
          if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object && 'healthCheckRating' in object) {
            const entry:HealthCheckEntryWithoutId = {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
              type: "HealthCheck",
              healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
            console.log(entry);
            return entry;
          }
        }
     } else {
      if ('type' in object && object.type === "Hospital"){
        if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object && 'discharge' in object){
              const newEntry: HospitalEntryWithoutId = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
               
                type: "Hospital",
                discharge: parseDischarge(object.discharge),
            
              };
              return newEntry;
             }
            } else if ('type' in object && object.type === "OccupationalHealthcare"){
             if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object && 'employerName' in object
                && 'sickLeave' in object) {
              const entry:OccupationalHealthcareEntryWithoutId = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
               
                type: "OccupationalHealthcare",
                employerName: parseEmployerName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
              };
              return entry;
            }
          } else {
            if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object && 'healthCheckRating' in object
              ) {
              const entry:HealthCheckEntryWithoutId = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
               
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
              };
              return entry;
            }
          }
     }

     throw new Error('Incorrect data: a field missing');
  };
  



export default toNewPatientEntry;