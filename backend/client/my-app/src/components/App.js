import React,{useEffect,useState} from 'react';

import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
var [notes,setNotes]=useState([]);

useEffect(() => {
  console.log("csdsf");
  async function fetchMyAPI() {
    try{
    let response = await axios.get('/api');
    console.log(response);
    setNotes(response.data);
    }catch(err){
      console.error('err',err);
    }
  }
  fetchMyAPI();
}, []);

function addNote(note,setNote,setstate){
  setNotes((prevValue)=>{
  return([...prevValue,note]);
  });
  setNote({title:"",content:""});
  setstate(false);
  }
  
  function deleteNote(id){
    setNotes((prevValue)=>{
      return(prevValue.filter((note)=>{
        return note._id!==id;
      }));
      });
  }

  return (
      <div>
        <Header />
        <Footer />
        <CreateArea addNote={addNote}/>
        {notes.length>0 && notes.map((note,index)=>
        {return <Note key={index} id={note._id} title={note.title} content={note.content} onDelete={deleteNote}/>})}
      </div>
  );
};

export default App;
