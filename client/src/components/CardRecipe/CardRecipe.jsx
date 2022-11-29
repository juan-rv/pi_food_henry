import React from 'react'
import './CardRecipe.css'

import empty from '../../assets/empty.jpg'


export default function CardRecipe ({ title, image, diets}) {
  return (
    <div className='card_content'>
     
    
      
      <div className='card_image'>
        { image ?
          <img className='image'
          src={image}
            alt="Recipe image" />:
          <img src= {empty} alt="empty image"/>      
      }

      </div>
     

      <div className='card_info'>

        <div className='tittle_content'>
      <h3 >{title}</h3>
        </div>
    
        <div className='info_types'>
          <h4 className='type_diets'>Type of Diets:</h4>
          <p className='sub'>
            {diets?.slice(0, 1)}
            {diets?.slice(2, 3)}
            {diets?.slice(4, 5)}
            {diets?.slice(6, 7)}
          </p>
          
        </div>
    </div>
      </div>    
  );
}
