import React,{useState,useRef} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import axios from "axios";
function CreateArea(props) {

     var [note,setNote]=useState({title:"",content:""});
     var [state,setstate]=useState(false);
     var title=useRef();
     var content=useRef();
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

       async function SubmitHandler(event){
            props.addNote(note,setNote,setstate);
            event.preventDefault();
            var newNote={
                  title:title.current.value,
                  content:content.current.value
            };
            try{
                 const response=await axios.post("/api/createNote",newNote);
                 console.log(response);
            }catch(err){
                 console.log(err);
            }
       }

   
  return (
    <div>
      <form className="create-note" onSubmit={SubmitHandler}>
        <input name="title" placeholder="Title" onChange={onChangeHandler} ref={title} onClick={onClickHandler} value= {note.title} autoComplete="off"/>
        {state?<textarea name="content" placeholder="Take a note..." rows="3" ref={content} onChange={onChangeHandler} value= {note.content}/>:null}
        {state?<Zoom in={state}>
        <Fab  aria-label="add" type="submit">
        <AddIcon />
      </Fab>
      </Zoom>:null}
      </form>
    </div>
  );
  
}

export default CreateArea;

