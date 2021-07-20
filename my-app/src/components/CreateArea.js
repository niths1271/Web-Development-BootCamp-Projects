import React,{useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
function CreateArea(props) {
     var [note,setNote]=useState({title:"",content:""});
     var [state,setstate]=useState(false);
     function onClickHandler(){
          setstate(true);
     }
     function onChangeHandler(event) {
          const{name,value}=event.target;
          setNote(prevNote=>{
               return{
                    ...prevNote,
                    [name]:value,
               }
          });
       }
  return (
    <div>
      <form className="create-note">
        <input name="title" placeholder="Title" onChange={onChangeHandler} onClick={onClickHandler} value= {note.title} autoComplete="off"/>
        {state?<textarea name="content" placeholder="Take a note..." rows="3" onChange={onChangeHandler} value= {note.content}/>:null}
        {state?<Zoom in={state}>
        <Fab  aria-label="add" onClick={(event)=>{props.addNote(note,setNote);event.preventDefault();}} >
        <AddIcon />
      </Fab>
      </Zoom>:null}
      </form>
    </div>
  );
}

export default CreateArea;