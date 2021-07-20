import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar(props) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
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
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoKey">New York</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoKey">Bengaluru</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoKey">Single</span>
            </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
              <div className="rightbarFollowing">
                  <img src={PF+"person/1.jpeg"} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName">John Carter</span>
              </div>
              <div className="rightbarFollowing">
                  <img src={PF+"person/2.jpeg"} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName">John Carter</span>
              </div>
              <div className="rightbarFollowing">
                  <img src={PF+"person/3.jpeg"} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName">John Carter</span>
              </div>
              <div className="rightbarFollowing">
                  <img src={PF+"person/4.jpeg"} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName">John Carter</span>
              </div>
              <div className="rightbarFollowing">
                  <img src={PF+"person/5.jpeg"} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName">John Carter</span>
              </div>
              <div className="rightbarFollowing">
                  <img src={PF+"person/6.jpeg"} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName">John Carter</span>
              </div>
          </div>
        </>
    )
}

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {props.profile?<ProfileRightBar/>:<HomeRightBar/>}
            </div>
        </div>
    )
}
