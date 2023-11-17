import { Diagnose, Entry } from "../types";
import { useState, useEffect } from "react";
import diagnoseService from "../services/diagnoses";

interface PropsEntry{
    entry: Entry
}

const EntryDetails =(props:PropsEntry)=>{
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

    useEffect (() =>{
        const fetchDiagnoses = async () => {
          const diagnoses_ = await diagnoseService.getAll();
          setDiagnoses(diagnoses_);
        };
        void fetchDiagnoses();
      }, []);

    
    return(
      <div>
            {props.entry.type === "HealthCheck" &&
                <div className="entry_container">
                <h3>{props.entry.date} {props.entry.description}</h3>
                <p> diagnose by {props.entry.specialist}</p>
                <p> health rating {props.entry.healthCheckRating}</p>
                {props.entry.diagnosisCodes?.map(e=>(
                    <div key={e} className="code_diagnose">
                        <ul>{e}</ul>
                        {diagnoses.map(diagnose =>( diagnose.code === e && <p key={diagnose.code}>{diagnose.name}</p>))}
                    </div>))}
                </div>}
                {props.entry.type === "Hospital" && 
                 <div className="entry_container">
                    <h3>{props.entry.date} {props.entry.description}</h3>
                    <p> diagnose by {props.entry.specialist}</p>
                    <p> {props.entry.discharge.date} {props.entry.discharge.criteria}</p>
                    {props.entry.diagnosisCodes?.map(e=>(
                        <div key={e} className="code_diagnose">
                            <ul>{e}</ul>
                            {diagnoses.map(diagnose =>( diagnose.code === e && <p key={diagnose.code}>{diagnose.name}</p>))}
                        </div>))}
                 </div>}  

                {props.entry.type === "OccupationalHealthcare" &&
                  <div className="entry_container">
                    <h3>{props.entry.date} {props.entry.description}</h3>
                      <p> diagnose by {props.entry.specialist}</p>
                      <p>Employer {props.entry.employerName}</p>
                      {props.entry.sickLeave && <p> sick leave starts:{props.entry.sickLeave.startDate} ends:{props.entry.sickLeave.endDate}</p>}
                      {props.entry.diagnosisCodes?.map(e=>(
                          <div key={e} className="code_diagnose">
                              <ul>{e}</ul>
                              {diagnoses.map(diagnose =>( diagnose.code === e && <p key={diagnose.code}>{diagnose.name}</p>))}
                          </div>))}
                  </div>
                }
      </div>
    );
};

export default EntryDetails;