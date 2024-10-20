import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from "../online/Online";
import {useEffect,useState,useContext} from "react";
import axios from  "axios";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {Add,Remove} from "@material-ui/icons";

export default function Rightbar(props) {
    const{user:currentUser,dispatch} = useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

const [friends,setFriends]=useState([]);
const [followed,setFollowed]=useState();
    
useEffect(()=>{
    setFollowed(currentUser.followins.includes(props.user._id));
},[currentUser,props.user]);

useEffect(() =>{
const fetchFriends = async() => {
try{
const friendList= await axios.get(`http://localhost:8000/api/users/friends/${props.user._id}`);
console.log(friendList);
setFriends(friendList.data);
}catch(err){
    console.log(err.response.data);
}
};
fetchFriends();
},[props.user]
);

const ClickHandler = async()=>{
try{
    if(followed){
let res=await axios.put(`http://localhost:8000/api/users/${props.user._id}/unfollow`,{userId:currentUser._id});
console.log(res);
dispatch({type:"UNFOLLOW",payload:props.user._id});
    }
else{
let res=await axios.put(`http://localhost:8000/api/users/${props.user._id}/follow`,{userId:currentUser._id});
console.log(res);
dispatch({type:"FOLLOW",payload:props.user._id});
}
}catch(err){
    console.log(err.response.data);
}
setFollowed(!followed);
}

const HomeRightBar = ()=>{
    return (
        <>
                   <div className="birthdayContainer">
                    <img src={PF+"gift.png"} alt="" className="birthdayImg"/>
                    <span className="birthdayText">
                        <b>Nithin.c
                        </b> and
                        <b> 3 other friends </b>
                        have a birthday today</span>
                </div>
                <img src={PF+"ad.png"} alt="" className="rightbarAd"/>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(user=><Online key={user.id} user={user} />)}
                </ul>
        </>
    )
}

const ProfileRightBar =()=>{
    return (
        <>
        {currentUser.username!==props.user.username && (
            <button className="rightbarFollowButton" onClick={ClickHandler}>
            {followed?"Unfollow":"Follow"}
            {followed?<Remove />:<Add />}</button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoKey">{props.user.city}</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoKey">{props.user.from}</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoKey">{props.user.relationship===1?"Single":props.user.relationship===2?"Married":"-"}</span>
            </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
          {friends.map((friend)=>{
              return (<div key={friend.user_id} className="rightbarFollowing">
                  <Link to={"/profile/"+friend.username}><img src={friend.profilePicture?PF+friend.profilePicture:PF+"person/noAvatar.png"} alt="" className="rightbarFollowingImg" /></Link>
                  <span className="rightbarFollowingName">{friend.username}</span>
              </div>);         
          })
          }
          </div>
        </>
    )
}

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {props.user?<ProfileRightBar/>:<HomeRightBar/>}
            </div>
        </div>
    )
}
