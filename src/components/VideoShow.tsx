import React from 'react'
import './videoshow.scss'
import {  useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../makeReq'
import moment from 'moment';
type props={
  data:any
}
function VideoShow({data}:props) {
  const navigate=useNavigate()
const {data:da}=useQuery(["user",data._id],()=>
makeRequest.get(`/users/getUser/${data?.user_id}`).then((res)=>{return res.data})
)
  const clickHandler=()=>{
navigate(`/Video/${data._id}`)
  }
  return (
    <div className='one-vid'>
      <img className='cover' src={`${data?.img}`} alt='' onClick={clickHandler}/>
      <div className='vid-info'>
        <div className='e1'>
          <img src={`${da?.img}`} alt='' />
        <h4 className='title' onClick={clickHandler}>{data?.title}</h4>          
        </div>
        <div className='e2'>
        <h5 className='channel'>{da?.userName}</h5>
        <h5 className='va'>{data?.views} views. {moment(data?.createdAt).fromNow()}</h5>
        </div>
      </div>
    </div>
  )
}

export default VideoShow