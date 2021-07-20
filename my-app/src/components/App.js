import React,{useState} from 'react';

import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from "./CreateArea";

function App() {
var [notes,setNotes]=useState([]);

useEffect(() => {
  async function fetchMyAPI() {
    let response = await fetch('/api/notes')
    response = await response.json()
    setNotes(response)
  }
  fetchMyAPI()
}, [])

function addNote(note,setNote){
setNotes((prevValue)=>{
return([...prevValue,note]);
});
setNote({title:" ",content:" "});
}

function deleteNode(id){
  setNotes((prevValue)=>{
    return(prevValue.filter((note,index)=>{
      return index!==id;
    }));
    });
}

  return (
      <div>
        <Header />
        <Footer />
        <CreateArea addNote={addNote} />
        {notes.map((note,index)=>{return <Note key={index} id={index} title={note.title} content={note.content} onDelete={deleteNode} />})}
      </div>
  );
};

export default App;
