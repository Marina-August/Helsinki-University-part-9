import { NonSensitiveDiaryEntry } from "../types"

interface EntriesProps{
    entries: NonSensitiveDiaryEntry[];
}

const Entries = (props: EntriesProps)=>{
  return (
    <div>
       {props.entries.map(el=>(
        <div key={el.id}>
            <h2>{el.date}</h2>
            <p> visibility: {el.visibility}</p>
            <p> weather: {el.weather}</p>
        </div>
       ))}
    </div>
  )
}

export default Entries;