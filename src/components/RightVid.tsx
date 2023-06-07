import React from 'react'
import './rightvid.scss'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../makeReq'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
//type Props = {}

function RightVid(/*{}: Props*/) {
  const {data,error,isLoading}=useQuery(['rand'],()=>
  makeRequest.get('/videos/random').then((res)=>{return res.data}))
  const navigate=useNavigate()
  return (
    <div className='right-vid'>
        <div className='rn'>
            <button>All</button>
            <button>FreeCodeCamp</button>
            <button>Python</button>
            </div>
            <div>
              {error?"error":(
                isLoading?"loading":<div>
                  {data.map((vid:any,key:number)=>(
    <div className='one-vid' key={key}>
    <img className='cover' src={`${vid?.img}`} alt='' onClick={()=>{navigate(`/Video/${vid._id}`)}}/>
    <div className='vid-info'>
      <div className='e1' style={{paddingLeft:55}}>
      <h4>-</h4>
      <h4 className='title' >{vid?.title}</h4>          
      </div>
      <div className='e2'>
      <h5 className='channel' >-</h5>
      <h5 className='va' style={{paddingLeft:30,paddingTop:10}}>{vid?.views} views. {moment(vid?.createdAt).fromNow()}</h5>
      </div>
    </div>
  </div>
                  ))}
                </div>              )}
            </div>
    </div>
  )
}

export default RightVid