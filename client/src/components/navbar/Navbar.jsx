import React from 'react';
import SearchBar from '../searchBar/SearchBar';
import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar({setCurrentPage}) {
    return (
       
            <div className='container_navBar'>
            
            <div className='btn1'>
                <Link to='/'>
                    <button>LandingPage</button>
                </Link>
            </div>  
            
            <SearchBar setCurrentPage={setCurrentPage} />
            
            <div className='btn2'>
                <Link to='/create_recipe'>
                    <button>Create Recipe</button>  
                </Link>
            </div>
            </div>
        
        
    )
}
