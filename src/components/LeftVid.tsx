import React, { useState } from 'react'
import './leftvid.scss'
import {NotificationsActiveOutlined,ThumbUpOutlined,ThumbDownOutlined,Share,Star,InsertLinkOutlined,SendOutlined, ThumbUp, ThumbDown} from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { Avatar, IconButton } from '@material-ui/core'
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import { makeRequest } from '../makeReq'
import { useParams } from 'react-router-dom'
import CommentSection from './CommentSection'
//type Props = {}

function LeftVid(/*{}: Props*/) {
  const user=useSelector((state:any)=>state.user)
  const {id}= useParams()
  const [desc,setDesc]=useState('')

  const {data,error,isLoading}=useQuery(['Vid',id],()=>
  makeRequest.get(`/videos/getVideo/${id}`).then(response=>{return response.data}))

  const {data:da}=useQuery(["user",data?.user_id],()=>
  makeRequest.get(`/users/getUser/${data?data.user_id:"6445462bed9aa2210a95d4b2"}`).then((res)=>{return res.data}))
  
  const {data:comment,isLoading:load}=useQuery(['comment'],()=>
  makeRequest.get(`/comment/getAll/${id}`).then((res)=>{return res.data}))
  
  const queryClient=useQueryClient()
  const mutation=useMutation((subscribe:String)=>{
    console.log(subscribe)
      if(subscribe) return  makeRequest.post(`/users/unsubscribe/${data.user_id}`)
      return makeRequest.post(`/users/subcribe/${data.user_id}`)
  },
  {
    onSuccess:()=>{
      queryClient.invalidateQueries(['user'])
    }
  })
  const likeMutation=useMutation((like:any)=>{
    if(like) return makeRequest.post(`/videos/unlikeVid/${data._id}`)
    return makeRequest.post(`/videos/likeVid/${data._id}`)
    
  },
  {
    onSuccess:()=>{
      queryClient.invalidateQueries(['Vid'])
    }
  }
    )
    const client=useQueryClient()
    const mutation2=useMutation((description:string)=>{
      console.log(description)
      return makeRequest.post(`/comment/addCom/${id}`,{desc:description})
    },
    {
      onSuccess:()=>{
        client.invalidateQueries(['comment'])
      }
    })
const  handleInput=async(e:any)=>{
  e.preventDefault()
  if(desc){
      await mutation2.mutate(desc)
  }
  setDesc(" ")
}
const handleClick=()=>{
  mutation.mutate(da?.subscriberUser.includes(user._id))
}
const handleLike=()=>{
  likeMutation.mutate(data.like.includes(user._id))
  console.log('ok')
}
return (
    <div className='left-vid'>
      {error?"error":(
        isLoading?"loading":
        <>
     <video controls className='vid'>
        <source src={`${data.url}`} type="video/mp4" />
      </video>
                
        <h3>{data.title}</h3>
        <div className='vid-info'>
                    <img src={`${da?.img}`} alt=''/>
        <div className='ns'>
        <h5>{da?.userName}</h5>
        <h6>{da?.subscriber} subscriber</h6>            
        </div>
        <button>Join</button>
        {da?.subscriberUser.includes(user._id)?
        <button onClick={handleClick}><NotificationsActiveOutlined/> Subscribed</button>:
        <button onClick={handleClick}>Subscribe</button>
      }
        
        </div>
        <div className='fun'>
            <div className='dl'>
                
                  {data.like.includes(user._id)?
                  <div className='like' >     
                  <button onClick={handleLike}><ThumbUp /></button>
                  <h6>{data.like.length}</h6>
                  </div>:<div className='like'>     
                  <button onClick={handleLike}><ThumbUpOutlined /></button>
                  <h6>{data.like.length}</h6>
                  </div>
                  }
                    <div>
                      {data.like.includes(user._id)?
                      <button onClick={handleLike}><ThumbDownOutlined/></button>:
                      <button onClick={handleLike}><ThumbDown/></button>
                    }
                        
                    </div>
            </div>
            <div className='but'>
            <button><Share/></button>
            <h4>Share</h4>                
            </div>
            <div className='but'>
            <button><InsertLinkOutlined/></button>
            <h4>Clip</h4>                
            </div>
            <div className='but'>
            <button><Star/></button>  
            <h4>Star</h4>              
            </div>
        </div>
        <div className='inter'>
          <h4>{data.views} views    | {new Date(data.createdAt).toDateString()}</h4>
          {data.description?
          <h5>{data.description}.</h5>:
          <span></span>
          }
          
          </div>
          <h4>{comment?.length} Comments</h4>
          <div className='com'>
          <IconButton >
            <Avatar src={`${user.img}`}/>
          </IconButton>
          <input className='addCom'   type='text' value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='Add A Comment ...'/>
          <IconButton style={{color:'white'}} onClick={handleInput}>
            <SendOutlined />
          </IconButton>
          </div>
        </>
      )}
          <div>
            {load?"Loading":comment?.map((comment:any,key:number)=>(
              <CommentSection key={key} comment={comment}/>
            ))}
            
          </div>
    </div>
  )
}

export default LeftVid