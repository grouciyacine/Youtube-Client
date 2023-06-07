import React from 'react'
import LeftBar from '../components/LeftBar'
import VideosSlides from '../components/VideosSlides'
import'../App.scss'
type props={
    type:String
}
function Home({type}:props) {

  return (
    <div className='content'>
    <LeftBar/>
    <VideosSlides type={type}/>
  </div>
  )
}

export default Home