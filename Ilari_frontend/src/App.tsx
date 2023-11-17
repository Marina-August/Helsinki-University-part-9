 import { useState, useEffect } from 'react'
import { NonSensitiveDiaryEntry, DiaryEntry } from './types'
import {getAllDiaries} from './services/diaryService'
import './App.css'
import Entries from './components/Entries'
import NewEntryForm from './components/NewEntryForm'

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(()=>{
     getAllDiaries().then(data => {
      setEntries(data)
    })
  }, [])

  const newEntryHandler = (newEntry: DiaryEntry) => {
     const entries_ = [...entries, newEntry];
     setEntries(entries_)
  }
 

  return (
    <>
     <NewEntryForm newEntryHandler={newEntryHandler}/>
     <h1>Diary entries</h1>
     <Entries entries={entries}/>
      
    </>
  )
}

export default App
