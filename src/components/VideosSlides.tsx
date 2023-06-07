import React from 'react'
import './videoslides.scss'
import VideoShow from './VideoShow'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../makeReq'
type props={
  type:String
}
function VideosSlides({type}:props) {
  const {data,error,isLoading}=useQuery(["videos",type],()=>
    makeRequest.get(type?`/videos/${type}`:"").then((res)=>{return res.data}).catch((err)=>console.log(err))
  )
  console.log(type)
  return (
    <div className='slides'>
      {error?<h4 style={{color:'white'}}>Please Login OR Register</h4>:(
        isLoading?"loading":data?.map((data:any,key:number)=>(
          <>
          <VideoShow key={key} data={data}  />
          </>
          
        )
        )
      )}
      
    </div>
  )
}
export default VideosSlides