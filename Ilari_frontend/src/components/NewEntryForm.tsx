import { useState } from "react";
import { Weather, Visibility, DiaryEntry } from "../types";
import { createNewEntry } from "../services/diaryService";


const NewEntryForm: React.FC<{newEntryHandler:(data: DiaryEntry)=>void}> = (props)=>{
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState<Weather>(Weather.Sunny);
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
    const [comment, setComment] = useState('');
    const [notification, setNotification] = useState('');

    const newEntryCreation=async(event: React.SyntheticEvent)=>{
        event.preventDefault();
        try {
            const data = await createNewEntry({ date, weather, visibility, comment });
            props.newEntryHandler(data);
            setDate('');
            setWeather(Weather.Sunny);
            setVisibility(Visibility.Good);
            setComment('');
          } catch (error) {
            setNotification(error.message || 'An error occurred.');
          }
    
    }

    const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeather(event.target.value as Weather);
      };

    const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVisibility(event.target.value as Visibility);
      };  

    return(
        <div>
         <h1>Add new entry</h1>
         {notification && <h2 className="notification">{notification}</h2>}
         <form onSubmit={newEntryCreation}>
            <div>
                date
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </div>
            <div>
                weather
               
                <input type="radio" id="sunny" name="weather" value="sunny"  checked={weather === "sunny"} onChange={handleWeatherChange} />
                <label htmlFor="sunny">Sunny</label>

                <input type="radio" id="rainy" name="weather" value="rainy"  checked={weather === "rainy"} onChange={handleWeatherChange}/>
                <label htmlFor="rainy">Rainy</label>

                <input type="radio" id="cloudy" name="weather" value="cloudy"  checked={weather === "cloudy"} onChange={handleWeatherChange} />
                <label htmlFor="cloudy">Cloudy</label>

                <input type="radio" id="stormy" name="weather" value="stormy"  checked={weather === "stormy"} onChange={handleWeatherChange} />
                <label htmlFor="stormy">Stormy</label>

                <input type="radio" id="windy" name="weather" value="windy"  checked={weather === "windy"} onChange={handleWeatherChange} />
                <label htmlFor="windy">Windy</label>
                
            </div>
            <div>
                visibility
              
                <input type="radio" id="great" name="visibility" value="great"  checked={visibility === "great"} onChange={handleVisibilityChange} />
                <label htmlFor="great">Great</label>

                <input type="radio" id="good" name="visibility" value="good"  checked={visibility === "good"} onChange={handleVisibilityChange}/>
                <label htmlFor="good">Good</label>

                <input type="radio" id="ok" name="visibility" value="ok"  checked={visibility === "ok"} onChange={handleVisibilityChange} />
                <label htmlFor="ok">Ok</label>

                <input type="radio" id="poor" name="visibility" value="poor"  checked={visibility === "poor"} onChange={handleVisibilityChange}/>
                <label htmlFor="poor">Poor</label>
            </div>
            <div>
                comment
                <input value={comment} onChange={(event) => setComment(event.target.value)} />
            </div>
            
            <button type='submit'>add</button>
        </form>

        </div>
    )
}

export default NewEntryForm;