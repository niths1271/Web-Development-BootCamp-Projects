import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";

function Note(props) {

async function SubmitHandler(event){
  props.onDelete(props.id);
  event.preventDefault();
  try{
       const response=await axios.delete(`/api/deleteNote/${props.id}`);
       console.log(response);
  }catch(err){
       console.log(err);
  }
}

  return (
    <form onSubmit={SubmitHandler}>
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button type="submit"><DeleteIcon /></button>
    </div>
    </form>
  );
}

export default Note;
