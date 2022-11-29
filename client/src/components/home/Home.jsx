import React from "react";
import CardRecipe from "../CardRecipe/CardRecipe"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"

import {
  getRecipes,
  orderByName,
  orderByScoreLikes,
  filterByDiet,
  getTypesOfDiet,
} from "../../redux/actions/actions";

import empty from '../../assets/empty.jpg'

import Paginate from "../paged/Paginate";
import NavBar from "../navbar/Navbar"
import Footer from "../footer/Footer"

import  "./Home.css"


export default function Home() {

  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  
    
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    };

  const [orderName, setOrderName] = useState("");
  const [orderLike, setOrderLike] = useState("");


  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypesOfDiet());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleSelectTypeOfDiet(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByDiet(e.target.value));
  }

  function handleSelectByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName("Order" + e.target.value);
  }

  function handleSelectByScore(e) {
    e.preventDefault();
    dispatch(orderByScoreLikes(e.target.value));
    setCurrentPage(1);
    setOrderLike("Order" + e.target.value);
  }

return (
  <div className='home' >
   
     
    <div>
      <NavBar setCurrentPage={setCurrentPage} />
    </div>
    

        <div >
        <button className= 'allRecipes'
          onClick={(e) => {
            handleClick(e);
          }}
        >
        All Recipes
        </button>
      </div>
    
      
      <div className= 'filters' >
        <select  className = 'select' onChange={(n) => handleSelectByName(n)}>
        <option value="default">Order by name</option>  
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        
        
      <select className= 'select' onChange={(s) => handleSelectByScore(s)} >
        <option value="default">Order by score</option> 
          <option value="Asc">Highest Score</option>
          <option value="Desc">Lowest Score</option>
        </select>
        
        <select className = 'select' onChange={(e) => handleSelectTypeOfDiet(e)}>
          <option value="default">All diets</option> 
          {diets.map((d) => (
            <option value={d.name} key={d.id}>
              {d.name}
            </option>
          ))}
      </select>
      

      
      </div>
      <div className="paginate_up">
        <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
    </div>
    
      <div className= 'cards' >
        {currentRecipes?.map((c) => (
          <div key={c.id}>
            <Link to={'/home/' + c.id} className='link_card' >
              <CardRecipe
                title={c.title}
                image={
                  c.image ? (
                    c.image
                  ) : (
                    <img
                      src= {empty}
                      alt="Img not provided"
                    />
                  )
                }
                diets={
                  c.createdDb
                    ? c.diets.map((d) => (
                        <p key={d.name} >
                          {d.name}
                        </p>
                      ))
                    : c.diets.map((d) => (
                        <p key={d} >
                          {d}
                        </p>
                      ))
                }
                vegetarian={
                  c.vegetarian === true ? (
                    <p >vegetarian</p>
                  ) : (
                    <p></p>
                  )
                }
                score={c.aggregateLikes}
              />
            </Link>
          </div> 
        ))}
      </div>
      <div className= 'paginate_down'>
        <Paginate 
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
    </div>
    <div>
      <Footer/>
    </div>
    </div>
  );
}
    
    
    





