import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
// import diagnoseService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  // const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients_ = await patientService.getAll();
      setPatients(patients_);
    };
    void fetchPatientList();
  }, []);

  // useEffect (() =>{
  //   const fetchDiagnoses = async () => {
  //     const diagnoses_ = await diagnoseService.getAll();
  //     setDiagnoses(diagnoses_);
  //   };
  //   void fetchDiagnoses();
  // }, []);


  const matchPatient = useMatch('/:id');
  
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/:id" element= {<PatientPage id={matchPatient?.params.id  as string}/>}/>
          </Routes>
        </Container>
    </div>
  );
};

export default App;
