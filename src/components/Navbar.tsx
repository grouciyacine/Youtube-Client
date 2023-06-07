import React from 'react'
import './navbar.scss'
import {Menu,SearchOutlined,CameraAltOutlined,NotificationsOutlined,MicNoneOutlined} from '@material-ui/icons'
import { Avatar,IconButton } from '@material-ui/core'
import {useSelector} from 'react-redux'


function Navbar() {
    const user=useSelector((state:any)=>state.user)


return (
    <div className='navbar'>
        <div className='logo'>
        <Menu/>
        <img src='https://cdn-icons-png.flaticon.com/512/1384/1384060.png' alt='logo'  />
        <h3>YouTube</h3>
        </div> 
        <div className='input'>
            <input type='text' placeholder='Search' />
            <SearchOutlined/>
        </div>
        <div className='micro'>
            <IconButton >
                <MicNoneOutlined/>
            </IconButton>
        </div>
        <div className='left'>
        <CameraAltOutlined/>
        <NotificationsOutlined/>
        <IconButton >
            {user.img?<Avatar src={`${user.img}`}/>:<Avatar/>}
        </IconButton>
        </div>
    </div>
)
}

export default Navbar