import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import {useState,useEffect,useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

export default function Feed(props) {
    const[posts,setPosts]=useState([]);
    const {user}= useContext(AuthContext);
    useEffect(()=>{
        const fetchPosts= async()=>{
      const res=props.username?await axios.get(`http://localhost:8000/api/posts/profile/${props.username}`)
                              :await axios.get(`http://localhost:8000/api/posts/timeline/${user._id}`);
      console.log(res);
      setPosts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
        }
        fetchPosts();
    },[props.username,user._id]);//[] is the dependency list

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!props.username || props.username===user.username) && <Share/>}
                {posts.map((post)=>
                {return <Post key={post._id} post={post} /> })};
            </div>
        </div>
    )
}
