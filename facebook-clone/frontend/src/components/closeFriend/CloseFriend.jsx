
import "./closeFriend.css"

export default function CloseFriend(props) {
     const PF=process.env.REACT_APP_PUBLIC_FOLDER;
     return (
          <li className="sidebarFriend">
                    <img src={PF+props.user.profilePicture} alt="" className="sidebarFriendImg" />
                    <span className="sidebarFriendName">{props.user.username}</span>
               </li>
     )
}
