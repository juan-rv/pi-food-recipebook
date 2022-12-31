import React from 'react'
import './CardRecipe.css'



export default function CardRecipe ({ title, image, diets, score}) {
  return (
    <div className='card_content'>  
      <div className='card_image'>
        { <img className='image'
          src={image}
          alt="Recipe" />}
        <div className="score">
            {score} score
       </div>
          
      </div>
     
      <div className='card_info'>

        <div className='title_content'>
          <h3 >{title}</h3>
        </div>
        <hr/>
    
        <div className='info_types'>
          <h4 className='type_diets'>Type of Diets / Tipo de Dieta:</h4>
          <div className="sub_content">
            <>
              {diets}
            </>
          </div>    
        </div>
    </div>
      </div>    
  );
}
