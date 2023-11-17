import { useState } from "react";
import { Discharge, Entry, EntryWithoutId, SickLeave } from "../types";
import {Button } from '@mui/material';
import { createNewEntry } from "../services/patients";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface Props {
    onCancel: () => void;
    onNewEntry:(data: Entry) => void;
    id: string;
}

const AddEntryForm = ({onCancel, onNewEntry, id}: Props)=> {
    const [notification, setNotification] = useState('');
    const [type, setType] = useState('OccupationalHealthcare');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setCodes] = useState<string[]>([]);
    const [employerName, setEmployerName] = useState('');
    const [sickLeave, setSickLeave] = useState<SickLeave>({startDate:'', endDate:''});
    const [discharge, setDischarge] = useState<Discharge>({date:'', criteria:''});
    const [healthCheckRating, setRating] = useState( "CriticalRisk");

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const codes = [
        "M24.2",
        "M51.2",
        "S03.5",
        "J10.1",
        "J06.9",
        "Z57.1",
        "N30.0",
        "H54.7",
        "J03.0",
        "L60.1",
        "Z74.3",
        "L20",
        "F43.2",
        "S62.5",
        "H35.29",
    ];

    const newEntryCreation = async(event: React.SyntheticEvent) =>{
        event.preventDefault();
        try {
            let newEntry;
            if (type === 'OccupationalHealthcare'){
                newEntry = {
                    date, 
                    specialist,
                    type, 
                    employerName,
                    description,
                    diagnosisCodes, 
                    sickLeave,
                };
            } else if (type === "Hospital") {
                newEntry = {
                    date, 
                    specialist,
                    type, 
                    discharge,
                    description,
                    diagnosisCodes, 
                };
            } else if (type === "HealthCheck") {
                console.log(diagnosisCodes);
                newEntry = {
                    date, 
                    specialist,
                    type, 
                    healthCheckRating,
                    description,
                    diagnosisCodes, 
                };
                console.log(newEntry);
            }

                const data = await createNewEntry(newEntry as EntryWithoutId, id);
                console.log(data);
                onNewEntry(data);
                setDate('');
                setSpecialist('');
                setType('OccupationalHealthcare');
                setEmployerName('');
                setDescription('');
                setCodes([]);
                setSickLeave({startDate:'', endDate:''});
                setRating('');
                setDischarge({date:'', criteria:''});
            
          } catch (error) {
            setNotification(error.message || 'An error occurred.');
            setTimeout(() => {
                setNotification('');
              }, 5000);
          }


    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRating(event.target.value);
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setSickLeave({
            ...sickLeave,
            startDate: event.target.value,
          });
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setSickLeave({
            ...sickLeave,
            endDate: event.target.value,
          });
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setDischarge({
            ...discharge,
            date: event.target.value,
          });
    };

    const handleCriteriaChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setDischarge({
            ...discharge,
            criteria: event.target.value,
          });
    };

   

    const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
        target: { value },
    } = event;
    setCodes(
        typeof value === 'string' ? value.split(',') : value,
    );
    };

    console.log(diagnosisCodes);

    return(
        <div className="entry_container">
         <h3>Add new entry</h3>
         {notification && <h2 className="notification">{notification}</h2>}
         <form onSubmit={newEntryCreation}>
          
            <div className="type">
                <h4>type</h4>
               
                <input type="radio" id="Hospital" name="type" value="Hospital"  checked={type === "Hospital"} onChange={handleTypeChange} />
                <label htmlFor="Hospital">Hospital</label>

                <input type="radio" id="HealthCheck" name="type" value="HealthCheck"  checked={type === "HealthCheck"} onChange={handleTypeChange} />
                <label htmlFor="HealthCheck">HealthCheck</label>

                <input type="radio" id= 'OccupationalHealthcare' name="type" value= 'OccupationalHealthcare'  checked={type ===  'OccupationalHealthcare'} onChange={handleTypeChange} />
                <label htmlFor= 'OccupationalHealthcare'>OccupationalHealthcare</label>
                
            </div>
            <div className="input_container">
                description
                <input className= "input" value={description} onChange={(event) => setDescription(event.target.value)} />
            </div> 
             <div className="input_container">
                date
                <input  className= "input" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </div> 
            
            <div className="input_container">
                specialist
                <input  className= "input" value={specialist} onChange={(event) => setSpecialist(event.target.value)} />
            </div>

            {/* <div className="input_container">
                diagnosis codes
                <input value={diagnosisCodes}  className= "input" onChange={(event) => setCodes(event.target.value.split(',').map(word => word.trim()))} />
            </div> */}
 
            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label"> diagnosis codes</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={diagnosisCodes}
                    onChange={handleChange}
                    input={<OutlinedInput label="diagnosis codes" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {codes.map((el) => (
                    <MenuItem key={el} value={el}>
                        <Checkbox checked={diagnosisCodes.indexOf(el) > -1} />
                        <ListItemText primary={el} />
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </div>

            { type=== 'OccupationalHealthcare' && <div className="input_container">
                employer name
                <input  className= "input" value={employerName} onChange={(event) => setEmployerName(event.target.value)} />
            </div>}

            { type=== 'OccupationalHealthcare' && <div className="input_container">
               <h4> sick leave</h4>
                start date
                <input  className= "input" type="date" value={sickLeave.startDate} onChange={handleStartDateChange} />
                end date
                <input  className= "input" type="date" value={sickLeave.endDate} onChange={handleEndDateChange} />
            </div>}

            { type=== 'Hospital' && <div className="input_container">
               <h4> discharge </h4>
                date
                <input  className= "input" type="date" value={discharge.date} onChange={handleDateChange} />
                criteria
                <input  className= "input"  value={discharge.criteria} onChange={handleCriteriaChange} />
            </div>}

            {type=== "HealthCheck" && <div className="type">
                <h4>health check rating</h4>
               
                <input type="radio" id="Healthy" name="rating" value="Healthy" checked={healthCheckRating === "Healthy"} onChange={handleRatingChange} />
                <label htmlFor="Healthy">Healthy</label>

                <input type="radio" id="LowRisk" name="rating" value="LowRisk" checked={healthCheckRating ==="LowRisk"} onChange={handleRatingChange} />
                <label htmlFor="LowRisk">LowRisk</label>

                <input type="radio" id="HighRisk" name="rating" value="HighRisk" checked={healthCheckRating ==="HighRisk"} onChange={handleRatingChange} />
                <label htmlFor="HighRisk">HighRisk</label>

                <input type="radio" id= "CriticalRisk" name="rating" value="CriticalRisk" checked={healthCheckRating === "CriticalRisk"} onChange={handleRatingChange} />
                <label htmlFor= "CriticalRisk">CriticalRisk</label>
                
            </div>}


            <div className="button_container">
                <Button variant="contained" color="primary" type='submit'>
                ADD 
                </Button>

                <Button variant="contained" color="secondary"  type="button" onClick={onCancel}>
                CANCEL
                </Button>
            </div>
        </form>

        </div>
    );
};

export default AddEntryForm;