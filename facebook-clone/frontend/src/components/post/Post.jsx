import {useState} from "react";

import "./post.css";
import {MoreVert} from "@material-ui/icons";
import {Users} from "../../dummyData";

export default function Post(props) {
    const[like,setLike]=useState(props.post.like);
    const[isLiked,setIsLiked]=useState(false);
const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const likeHandler =()=>{
        setLike(isLiked?like-1:like+1);
        setIsLiked(!isLiked);
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="posttopLeft">
                        <img src={PF+Users.filter(user=>user.id===props.post.userId)[0].profilePicture} alt="" className="postProfileImg"/>
                        <span className="postUsername">{Users.filter(user=>user.id===props.post.userId)[0].username}</span>
                        <span className="postDate">{props.post.date}</span>
                    </div>
                    <div className="posttopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{props.post.desc}</span>
                    <img src={PF+props.post.photo} alt="" className="postImg"/>
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
