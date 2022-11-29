import React from "react";
import { BsLinkedin, BsGithub} from 'react-icons/bs'
import './Footer.css'

export default function Footer() {
    return (

       
            <footer className='container_footer'>
                
            <p>Developed by: Juan Rodríguez</p>
            <div>
                <a href='https://github.com/juan-rv' target='_blank' rel='noreferrer' ><BsLinkedin /></a>
                <a href='https://www.linkedin.com/in/juan-rv/' target='_blank' rel='noreferrer' ><BsGithub /></a>
                
            </div>
        </footer>
      
        


       
        
    )
}