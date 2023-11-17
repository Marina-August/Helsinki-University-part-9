import axios, { AxiosError } from "axios";
import { EntryWithoutId, Patient, PatientFormValues, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatientByID = async (id:string) =>{
  if (!id) return null;
  const {data} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export const createNewEntry = async (newEntry: EntryWithoutId, id: string) => {
  console.log(newEntry);
  try {
      const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, newEntry);
      console.log(data);
      return data;
  } catch (e){
      const error = e as AxiosError;
      let errorMessage = 'An error occurred';
      if (error.response && error.response.data) errorMessage = error.response.data as string;
      throw new Error(errorMessage);
  }
};

const getPing = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/ping`);
    return response.data; // Ожидаем "pong"
  } catch (error) {
    console.error("Ошибка при запросе ping:", error);
    return null;
  }
};


export default {
  getAll, create, getPing, getPatientByID, createNewEntry
};

