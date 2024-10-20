import "./share.css";
import {AuthContext} from "../../context/AuthContext";
import {useContext, useState,useRef} from "react";
import {PermMedia, Label, Room, EmojiEmotions} from "@material-ui/icons";
import axios from "axios";

export default function Share() {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file,setFile] = useState(null);


    const SubmitHandler = async(event) => {
        event.preventDefault();
const newPost={
    userId:user._id,
    desc:desc.current.value
}

if(file){
    console.log(file);
    const formData=new FormData();
    const fileName=Date.now()+file.name;
    formData.append("name",fileName);
    formData.append("file",file);   
    for(var pair of formData.entries()) {
   console.log(pair[0]+ ', '+ pair[1]);
}
    newPost.img=fileName;
    try{
await axios.post("http://localhost:8000/api/upload",formData);
    }catch(err){
        console.log(err.response.data);
    }
}

try{
await axios.post("http://localhost:8000/api/posts",newPost);
window.location.reload();
}catch(err){
console.log(err.response.data);
}
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src={user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/noAvatar.png"}
                        alt=""
                        className="shareProfileImg"/>
                    <input
                        placeholder={"What's in your mind " + user.username + "?"}
                        className="shareInput"
                        ref={desc}/>
                </div>
                <hr className="shareHr"></hr>
                <form
                    className="shareBottom"
                    onSubmit={
                    SubmitHandler
                }>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                style={{display:"none"}}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(event) => setFile(event.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
