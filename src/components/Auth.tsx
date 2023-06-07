import React, { useState } from 'react'
import './auth.scss'
import { makeRequest } from '../makeReq'
import {useDispatch} from 'react-redux'
import {  loginSuccess } from '../redux/user'
import { useNavigate } from 'react-router-dom'
import { app } from '../firebase/firebase'
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
function Auth() {
    const auth=getAuth(app)
    const Google=new GoogleAuthProvider()
    const [open,setOpen]=useState(false)
    const dispatch=useDispatch()
    const [user,setUser]=useState({
      name:"",
      email:"",
      password:"",
      userName:""
    }) 
    const navigation=useNavigate()
    const InputHandler=(e:any)=>{
          setUser((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const googleHandler=async()=>{
          await signInWithPopup(auth, Google).then((res) => {
makeRequest.post('/auth/google',{name:res.user.displayName,email:res.user.email,img:res.user.photoURL})
navigation('/')
      }).catch((err)=>console.log(err))
    }
    const SubmitHandler=async(e:any)=>{
    e.preventDefault()
    if(open){
      await makeRequest.post('auth/register',user).then((data)=>dispatch(loginSuccess(data.data))).catch((err)=>console.log(err))
      navigation('/')
      }else{
        const log=await makeRequest.post('auth/login',{email:user.email,password:user.password}).then((data)=>dispatch(loginSuccess(data.data))).catch(()=>alert('wrong email or password'))
        console.log(log)
        if(log){
          navigation('/')
        }
        
      }
    }
  return (
    <div className='auth'>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/YouTube_social_red_circle_%282017%29.svg/2048px-YouTube_social_red_circle_%282017%29.svg.png' alt='' style={{width:80,height:80,borderRadius:360,position:'absolute',top:-60}}/>
        {open?
        <div className='register'>
            <div>
<h5> Name:</h5>
<input type='text' className='inp' placeholder='enter your name' name='name' onChange={InputHandler}/>
            </div>
            <div>
<h5>Email:</h5>
<input className='inp' type='text' placeholder='enter your email' name='email' onChange={InputHandler}/>
            </div>
            <div>
<h5>UserName:</h5>
<input  type='text' placeholder='enter your UserName' name='userName' onChange={InputHandler}/>
            </div>
            <div>
<h5>Password:</h5>
<input type='password' placeholder='enter your password' name='password' onChange={InputHandler}/>
            </div>
        </div>:<div className='register'>
        <div>
<h5>Email:</h5>
<input  type='text' className='inp' placeholder='enter your email' name='email' onChange={InputHandler}/>
            </div>
            <div>
<h5>Password:</h5>
<input type='password' placeholder='enter your password' name='password' onChange={InputHandler}/>
            </div>
            </div>}
        <button onClick={SubmitHandler}>{open?"Register":"Login"}</button>
        <div className='google' onClick={googleHandler}>
          <h5>Sign with </h5>
          <img src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' alt='' />
        </div>
        <div className='login'>
              <h6 onClick={()=>setOpen(!open)}>{open?"Login":"Register"}</h6>
        </div>
    </div>
  )
}

export default Auth