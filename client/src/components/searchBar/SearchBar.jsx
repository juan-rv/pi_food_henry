
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNameRecipe } from "../../redux/actions/actions";
import { HiSearch } from 'react-icons/hi';
import './SearchBar.css'


export default function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameRecipe(name));
    setCurrentPage(1);
    setName("");
    history.push("/home")
  }

  return (
    <form className="searchBar">
      <input
        className="input"
        type="text"
        value={name}
        placeholder="Recipes..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)} className="btn">
        <HiSearch />
      </button>
    </form>
  );
}