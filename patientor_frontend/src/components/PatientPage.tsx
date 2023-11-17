
import { Patient, Entry } from "../types";
import { useState, useEffect } from "react";
import patientService from "../services/patients";
import '../index.css';
import EntryDetails from "./EntryDetails";
import {Button } from '@mui/material';
import AddEntryForm from "./AddEntryForm";

interface Props{
    id: string;
}

const PatientPage =(props:Props)=>{
    const [patientData, setPatientdata] = useState<Patient>();
    const [show, setShow] = useState(false);

    useEffect(()=>{
        const fetchPatient = async()=>{
            const patient = await patientService.getPatientByID(props.id as string);
            console.log(patient);
            setPatientdata(patient as Patient);
        };
        void fetchPatient();
    }, [props.id]);

    if (patientData?.entries){
        console.log(patientData.entries);
    }

    const showForm =()=>{
        setShow(true);
    };

    const cancelHandler =()=>{
        setShow(false);
    };

    const newEntryHandler = (entry: Entry) =>{
        console.log(entry);
        const patientData_ = {...patientData};
        if (patientData_){
            patientData_.entries?.push(entry);
        }
        setPatientdata(patientData_ as Patient);
    };

    return(
        <div>
            <h1>{patientData?.name}</h1>
            <p>gender: {patientData?.gender}</p>
            <p>ssn: {patientData?.ssn}</p>
            <p>occupation: {patientData?.occupation}</p>
            <h3>entries</h3>
            {show && <AddEntryForm onCancel= {cancelHandler} onNewEntry={newEntryHandler} id= {patientData?.id as string}/>}
            {patientData?.entries.map(el=>(
                <EntryDetails key={el.id} entry={el}/>
            ))}
          
            {!show && <Button variant="contained" color="primary" onClick={showForm}>
               ADD NEW ENTRY
            </Button>}
        </div>
    );
};

export default PatientPage;