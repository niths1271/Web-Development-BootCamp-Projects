import "./topbar.css";
import {Search,Person,Chat,Notifications} from '@material-ui/icons';
import {Link} from "react-router-dom";
export default function Topbar() {
     return (
          <div className="topbarContainer">
               <div className="topbarLeft">
                    <Link to="/" style={{textDecoration:"none"}}><span className="logo">SocialApp</span></Link>
               </div>
               <div className="topbarCenter">              
              <div className="searchbar">
                 <Search className="searchIcon" />
                 <input placeholder="Search for friend,post or video" className="searchInput" />
              </div>                
                </div>
               <div className="topbarRight">
                     <div className="topbarLinks">
                          <span className="topbarLink">Homepage</span>
                          <span className="topbarLink">Timeline</span>
                     </div>
                    <div className="topbarIcons">
                          <div className="topbariconItem">
                               <Person />
                               <span className="topbarIconBadge">1</span>
                          </div>
                          <div className="topbariconItem">
                               <Chat />
                               <span className="topbarIconBadge">3</span>
                          </div>
                          <div className="topbariconItem">
                               <Notifications />
                               <span className="topbarIconBadge">1</span>
                          </div>
                     </div>
                     <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
                </div>            
          </div>
     )
}
