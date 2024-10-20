import {useState,useEffect,useContext} from "react";
import axios from "axios";
import "./post.css";
import {MoreVert} from "@material-ui/icons";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
// import {Users} from "../../dummyData";

export default function Post(props) {
    const [user,setUser]=useState({});
    const[like,setLike]=useState(props.post.likes.length);
    const[isLiked,setIsLiked]=useState(false);
    const {user:currentUser}=useContext(AuthContext);
const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const likeHandler =()=>{
        try{
       const res=axios.put(`http://localhost:8000/api/posts/${props.post._id}/like`,{userId:currentUser._id});
       console.log(res);
        }catch(err){
            console.log(err.response.data);
        }
        setLike(isLiked?like-1:like+1);
        setIsLiked(!isLiked);
    }

useEffect(()=>{
    setIsLiked(props.post.likes.includes(currentUser._id));
},[currentUser._id,props.post.likes]);

    useEffect(()=>{
        const fetchUser= async()=>{
      const res=await axios.get(`http://localhost:8000/api/users?userId=${props.post.userId}`);
      console.log(res);
      setUser(res.data);
        }
        fetchUser();
    },[props.post.userId]);

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="posttopLeft">
                        <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}><img src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.png"} alt="" className="postProfileImg"/></Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(props.post.createdAt)}</span>
                    </div>
                    <div className="posttopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{props.post.desc}</span>
                    <img src={PF+props.post.img} alt="" className="postImg"/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt=""/>
                        <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt=""/>
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="commentText">{props.post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
