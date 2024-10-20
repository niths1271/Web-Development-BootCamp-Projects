import "./profile.css";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import {useState,useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router";


export default function Profile() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState({});
const params = useParams();
// console.log(params);
    useEffect(()=>{
        const fetchUser= async()=>{
      const res=await axios.get(`http://localhost:8000/api/users?username=${params.username}`);
    //   console.log(res);
      setUser(res.data);
        }
        fetchUser();
    },[params]);

    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                    <div className="profileCover">
                    {/* {PF+user.profilePicture || PF+"person/noAvatar.png"} */}
                    <img src={user.coverPicture?PF+user.coverPicture:PF+"person/noCover.png"} alt="" className="profileCoverImg" />
                    <img src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.png"} alt="" className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                         <h4 className="profileInfoName">{user.username}</h4>
                         <span className="profileInfoDesc">{user.desc}</span>
                    </div>               
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={user.username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}
