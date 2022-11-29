import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'
//import img from './chef.webp'
import video from '../../assets/landing.mp4'
//import { BsLinkedin, BsGithub, BsGoogle } from 'react-icons/bs'
import Footer from '../footer/Footer'





export default function Landing() {
  return (
    <div className='content'>
      
      <video className='video' autoPlay="autoplay" loop src= {video}>
      </video>

      <div className='capa'></div>

      <div className='title_contain'>
      <h1 className= 'title' > Are you ready to cook? </h1>
      </div>
      <div className='subtitle_containt' >
      <h2 className='subtitle'>
       Let your imagination run wild on our website and become the cook of your dreams from the comfort of your own home. 
      </h2>
      </div>
  
      <Link to='/home'>
        <button className='landingButton'>to cook!
        </button>
      </Link>

     

    </div>
  )
}

