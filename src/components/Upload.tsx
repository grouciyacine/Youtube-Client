import React, { useEffect, useState } from 'react'
import './upload.scss'
import { ImageOutlined, VideoCallOutlined } from '@material-ui/icons'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { app } from '../firebase/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../makeReq'
import { useNavigate } from 'react-router-dom'

function Upload() {
    const [data,setData]=useState({title:'',description:'',img:'',url:'',})
    const [img,setImage]=useState<File|null>(null)
    const [vid,setVid]=useState<File|null>(null)
    const [tags,setTags]=useState<String[]>()
    const [imgPers,setImagePers]=useState<Number>(0)
    const [vidPers,setVidPers]=useState<Number>(0)
    const zero:Number=0
    const client=useQueryClient()
    const navigate=useNavigate()
    const mutation=useMutation((data:any)=>{
        console.log(data)
        return makeRequest.post('/videos/putVideo',data)
    },
    {onSuccess:()=>{
        client.invalidateQueries(['videos'])
    }})
    
    
//handle title,description
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setData(prev=>{return{...prev,[e.target.name]:e.target.value}})
    }
//handle Image
    const handleFile=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const files=e.target.files
        if(files && files.length>0){
            const file=files[0]
            setImage(file)
        }
    }
//handleVid
    const handleVid=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const files=e.target.files
        if(files && files.length>0){
            const file=files[0]
            setVid(file)
        }
    }
//handle tags
    const handleTags=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
            setTags(e.target.value.split(","))
    }
//upload image,vid to firebase
    const uploadFiles=(file:any,urlType:any)=>{
        const storage=getStorage(app);
        const fileName=new Date().getTime()+file.name
        const storageRef=ref(storage,fileName);
        const uploadTask=uploadBytesResumable(storageRef,file)
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const  progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                urlType==="img"?setImagePers(Math.round(progress)):setVidPers(Math.round(progress))
                //console.log("Upload is"+progress+"% done")
                switch (snapshot.state){
                    case "paused":
                        console.log("Upload paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;    
                }
            },
            (error)=>{},
                ()=>{
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                            setData((prev)=>{
                                return {...prev,[urlType]:downloadURL}
                            })
                        })
                }
            
        )
    } 
    useEffect(()=>{
        img && uploadFiles(img,"img")
    },[img])
    useEffect(()=>{
        vid && uploadFiles(vid,"url")
    },[vid])
    const handleUpload=async(e:React.FormEvent)=>{
        if(img && vid ){
        e.preventDefault()
        await mutation.mutate({title:data.title,url:data.url,img:data.img,tags})
        navigate('/')
        }
    }
return (
            <form onSubmit={handleUpload}>
                <div>
                <div>
                    <h5>Title:</h5>
                    <input type='text' placeholder='enter title of video' onChange={handleChange} name='title'/>
                </div>
                <div>
                    <h5>
                        Description:
                    </h5>
                    <input type='text' placeholder='enter description of video' onChange={handleChange} name='description'/>
                </div>
                <div>
                    <h5>
                        Tags:
                    </h5>
                    <textarea  cols={42}  onChange={handleTags} />
                </div>
                <div>
                    <h5>Image Cover:</h5>
                    {imgPers>zero?("Image Pers"+imgPers):(
                        <input type='file' style={{display:'none'}} id='img' accept='image/*' onChange={handleFile}/>
                    )}
                    
                    <label htmlFor='img' >
                        <div className='select'>
                            <h4>Select Image</h4>
                            <ImageOutlined/>
                        </div>
                    </label>
                </div>
                <div>
                    <h5>Video:</h5>
                    {vidPers>zero?("video Pers"+vidPers):( 
                            <input type='file' id='vid'   style={{display:'none'}} accept='video/*' onChange={handleVid}/>
                    )}
                    <label htmlFor='vid'>
                        <div className='select'>
                        <h4>Select Video</h4>
                        <VideoCallOutlined/>                            
                        </div>
                    </label>
                </div>                    
                </div>
            <button className='button'>Submit</button>
                    
            </form>
)
}

export default Upload