import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import {useState,useEffect} from "react";
import axios from "axios";

export default function Feed() {
    const[posts,setPosts]=useState([]);

    useEffect(()=>{
        const fetchPosts= async()=>{
      const res=await axios.get("http://localhost:8000/api/posts/timeline/60f2820442171ea0f44773fd");
      console.log(res);
        }
        fetchPosts();
    },[]);//[] is the dependency list

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {/* {Posts.map(post=>
                {return <Post key={post.id} post={post} /> })}; */}
            </div>
        </div>
    )
}
