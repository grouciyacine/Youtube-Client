import React from 'react'
import './left.scss'
import {HomeOutlined,VideoCallOutlined,SubscriptionsOutlined,VideoLibraryOutlined,  AccountCircleOutlined} from '@material-ui/icons'
import {Link} from 'react-router-dom'
function LeftBar() {

return (
    <div className='leftBar'>
        <div>
            <Link to="/"  style={{textDecoration:"none",color:"inherit"}}>
            <HomeOutlined/>
            </Link>
<h5>Home</h5>
        </div>
        <div>
            <Link to='/Update'  style={{textDecoration:"none",color:"inherit"}}>
            <VideoCallOutlined/>
            </Link>
            
            <h5>Add </h5>
        </div>
            <div>
            <Link to="/subscriptions"   style={{textDecoration:"none",color:"inherit"}}>
            <SubscriptionsOutlined/>
            </Link>
            <h5>Subs</h5>
            </div>
            <div>
            <Link to="/trends"  style={{textDecoration:"none",color:"inherit"}}>
            <VideoLibraryOutlined/>
            </Link>
            <h5>Trends</h5>
            </div>
            <div>
            <Link to="/Auth" style={{textDecoration:"none",color:"inherit"}}>
            <AccountCircleOutlined/>
            </Link>
            <h5>SignIn</h5>
            </div>
            
    </div>
)
}

export default LeftBar