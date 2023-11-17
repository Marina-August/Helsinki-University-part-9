import axios, { AxiosError } from 'axios';
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createNewEntry = async (object: NewDiaryEntry) => {
    try {
        const { data } = await axios.post<DiaryEntry>(baseUrl, object)
        return data;
    } catch (e){
        const error = e as AxiosError;
        let errorMessage = 'An error occurred'
        if (error.response && error.response.data) errorMessage = error.response.data as string
        throw new Error(errorMessage);
    }
//   return axios
//     .post<DiaryEntry>(baseUrl, object)
//     .then(response => response.data)
}