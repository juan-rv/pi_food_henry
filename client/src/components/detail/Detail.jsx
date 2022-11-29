import React from "react";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getClean} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import empty from '../../assets/empty.jpg'
import NavBar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import './Detail.css'

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  const [cambio, setCambio] = useState(false)
 
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    setCambio(true);
    return() => { dispatch(getClean())} 

  }, [props.match.params.id, dispatch]);
  console.log(detail);

  // useEffect(() => {
  //   setCambio(true);
  //   return () => {dispatch(getClean)}
  // })

  return (
    <div className="detail">
      <div><NavBar/></div>
    <div className="content_detail">
      
      {detail.length ? (
        <div>
          <h1>Name: "{detail[0].title}"</h1>
          <img
            src={
              detail[0].image ? (
                detail[0].image
              ) : (
                <img
                  src={empty}
                  alt="img plate"
                />
              )
            }
            alt="img recipe"
          />
          <div >
            {detail[0].createdDb ? (
              <h2>
                Type of Diets: {detail[0].diets.map((d) => d.name).join(", ")}
              </h2>
            ) : (
              <h2>
                Type of Diets:
                {detail[0].vegetarian === true
                  ? " " + detail[0].diets.join(", ") + ", vegetarian"
                  : " " + detail[0].diets.join(", ")}
              </h2>
            )}
            <h3>
              {detail[0].createdDb
                ? null
                : "Dish types: " + detail[0].dishTypes.join(", ")}
            </h3>
          </div>
          <div >
            {detail[0].aggregateLikes !== 0 ? (
              <h3>Score: {detail[0].aggregateLikes}</h3>
            ) : (
              <h3>Score: - </h3>
            )}
            {detail[0].healthScore !== 0 ? (
              <h3>Health Score: {detail[0].healthScore}</h3>
            ) : (
              <h3>Health Score: - </h3>
              )}
              
            <h3>Summary:</h3>
            <p>{detail[0].summary.replace(/<[^>]*>?/g, "")}</p>
            {detail[0].analyzedInstructions ? (
              <h3>Step by step instructions: </h3>
            ) : (
              <h3>Step by step instructions: - </h3>
            )}
            {detail[0].analyzedInstructions.length > 0 ? (
              <ul>
                {detail[0].createdDb ? (
                  <li>{detail[0].analyzedInstructions}</li>
                ) : (
                  detail[0].analyzedInstructions[0].steps.map((p) => (
                    <li key={p.number}>{p.step}</li>
                  ))
                )}
              </ul>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        ) : <div className='containerSpinner'><span className='spinner'></span></div>
      }
      </div>
      <div className="button_to_home">
        <Link to='/home'>
          <button>To Home</button>
        </Link>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}
