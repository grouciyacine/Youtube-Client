import { useQuery} from '@tanstack/react-query'
import React from 'react'
import { makeRequest } from '../makeReq'
import './comment.scss'
type Props = {
    comment:any
}

function CommentSection({comment}: Props) {
    const {data}=useQuery(['user',comment.user_id],()=>
    makeRequest.get(`/users/getUser/${comment?.user_id}`).then((res)=>{return res.data}))
  return (
    
    <div className='comment'>
      <div>
              <img src={`${data?.img}`} alt=''/>
      <h6>{data?.email}</h6>
      <h6>16min ago</h6>
      </div>
<h5>{comment.desc}</h5>
    </div>
  )
}

export default CommentSection