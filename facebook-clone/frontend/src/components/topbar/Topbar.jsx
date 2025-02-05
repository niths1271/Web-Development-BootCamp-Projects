import "./topbar.css";
import {Search, Person, Chat, Notifications} from '@material-ui/icons';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";
export default function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link
                    to="/"
                    style={{
                    textDecoration: "none"
                }}>
                    <span className="logo">SocialApp</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friend,post or video" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbariconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbariconItem">
                        <Chat/>
                        <span className="topbarIconBadge">3</span>
                    </div>
                    <div className="topbariconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`} ><img
                    src={user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"}
                    alt=""
                    className="topbarImg"/></Link>
            </div>
        </div>
    )
}
