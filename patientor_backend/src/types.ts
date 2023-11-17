export interface Diagnoses {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other' 
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

export interface SickLeave{
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave: SickLeave;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensitivePatientsEntry = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type HospitalEntryWithoutId = Omit<HospitalEntry, 'id'>;

export type OccupationalHealthcareEntryWithoutId = Omit<OccupationalHealthcareEntry, 'id'>;

export type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, 'id'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;