import { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { postRecipe } from "../../redux/actions/actions"
import { getTypesOfDiet } from "../../redux/actions/actions"
import { useDispatch, useSelector } from "react-redux"

import './Create.css'

function validate(input) {
    let errors = {};
    input.title 
        ? (errors.title = "")
        : (errors.title = "You must name the recipe")
    
    input.summary
        ? (errors.summary = "")
        : (errors.summary = "");
    
  input.diets.length < 1
        ? (errors.diets = "Choose at least one diet")
        : (errors.diets = "");
    
    
    if (!input.image.includes("https://" || "http://") && !input.image.includes("http://" || "http://")) {
        errors.image = ""
    } else {
        errors.image = "";   
    }
    return errors;
}

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        dispatch(getTypesOfDiet());
    }, [dispatch]);

    const [input, setInput] = useState({
        title: "",
        summary: "",
        aggregateLikes: 0,
        healthScore: 0,
        analyzedInstructions: "",
        image: "",
        diets: [],
    });
    
    function handleChange(e) {
        setInput((input) => ({
            ...input,
            [e.target.name]: e.target.value,
        }));
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }
    

    function handleSelectDiet(e) {
        setInput((input) => ({
            ...input,
            diets: [...input.diets, e.target.value],
        }));
        setErrors(
            validate({
                ...input,
                diets: [...input.diets, e.target.value],
            })
        );
    }
    

    function handleSubmit(e) {

        if (input.title && input.summary && input.diets.length > 0) {
            e.preventDefault();
            dispatch(postRecipe(input));
            alert("Recipe succesfully Created!!");
            setInput({
                title: "",
                summary: "",
                aggregateLikes: 0,
                healthScore: 0,
                analyzedInstructions: "",
                image: "",
                diets: [],
            });
            history.push("/home");
        } else {
            e.preventDefault();
            alert("You must complete every field!!");
        }
    }
    
    function handleDelete(e, d) {
        e.preventDefault();
        setInput({
            ...input,
            diets: input.diets.filter((diet) => diet !== d),
        });
    }

    return (
        <div className="content_create">
            <div className="cont">
            <h1 className="title_create">Create your recipe</h1>
                <Link to="/home">
                                <button className="button_home"> Back to Home</button>
                            </Link> 
                
                <div >
            

            <div className="content_form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="plate_create">
                              {/* <label>Plate Name:</label>         */}
                        <input                            
                            placeholder="Plate Name"
                            type="text"
                            value={input.title}
                            name="title"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.title && <h6>{errors.title}</h6>}
                            </div>
                            


                            <div className="score_create">
                                <label>Score:</label>
                                <input                              
                                    type="text"                               
                                    value={input.aggregateLikes}                                
                                    name="aggregateLikes"                                
                                    onChange={(e) => handleChange(e)}                                   
                                />                          
                            </div>
                            

                            <div className="score_create">
                                <label>Health Level:</label>
                                <input
                                    type="text"
                                    value={input.healthScore}
                                    name="healthScore"
                                    onChange={(e) => handleChange(e)}  
                                />                               
                            </div>
                            

                    <div className="summary_create">
                        <input
                            placeholder="Summary"                  
                            type="text"   
                            value={input.summary}
                            name="summary"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.summary && <p>{errors.summary}</p>}
                    </div>
                    
                    

                    <div className="instructions_create">
                        <textarea
                            type="text"
                            placeholder="Instructions"
                            rows="5"
                            value={input.analyzedInstructions}
                            name="analyzedInstructions"
                            onChange={(e) => handleChange(e)}  
                        />    
                    </div>

                    <div className="image_create">
                        <input
                            type="text"
                            placeholder=" Image...Example: https://"
                            value={input.image}
                            name="image"
                            onChange={(e) => handleChange(e)}  
                        />
                        {errors.image && <p>{errors.image}</p>}       
                    </div>
                    
                    <button className="button_create" type="submit">
                        Create Recipe
                            </button>
                        </form>

                    <div className="diets_create">                        
                        <span>Type of Diet:</span>                       
                        <select onChange={(e) => handleSelectDiet(e)}>                           
                            {diets.map((d) => (
                                <option value={d.name} key={d.name}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                        {input.diets.map((d, i) => (
                            <ul className="d" key={i}>
                                <li >{d}</li>
                                <button classname='delette_button'onClick={(e) => handleDelete(e, d)}>x</button>
                            </ul>
                        ))}
                        {errors.diets && <p>{errors.diets}</p>}
                    </div>
                        
                    </div>


                
                
                
                </div>

            </div>     
            {/* <div>
                <Footer />    
            </div>     */}
        </div>
    )
    
}