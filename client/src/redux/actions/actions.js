import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES' // todas las posibles "diccionario" // acciones usadas en el reducer
export const GET_DETAIL = 'GET_DETAIL'
export const GET_NAME_RECIPE = 'GET_NAME_RECIPE'
export const GET_DIETS = 'GET_DIETS'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_SCORE_LIKES = 'ORDER_BY_SCORE_LIKES'
export const FILTER_BY_DIET = 'FILTER_BY_DIET'
export const GET_TYPES_OF_DIET = 'GET_TYPES_OF_DIET'
export const POST_RECIPE = 'POST_RECIPE'
export const REMOVE_DETAIL = 'REMOVE_DETAIL'
export const GET_CLEAN = "GET_CLEAN"



//action para obtener datos desde el back el cual está corriendo en el puerto 3001
//* 1
export function getRecipes() { //obtener las recetas mediante un get
    return async function (dispatch) {
        let datosJson = await axios.get(`http://localhost:3001/recipes`) //nos trae todas las recetas
        return dispatch({
            type: GET_RECIPES,
            payload: datosJson.data
        })
    }
}

//* 2
export function getDetail(id) {
  return async function (dispatch) {
    let idJson = await axios.get('http://localhost:3001/recipes/' + id);
    return dispatch({
      type: GET_DETAIL,
      payload: idJson.data
    })
  }
}
 


export function removeDetail() {
    return { 
        type: REMOVE_DETAIL
    }
}

//* 3

export function getNameRecipe(name) {
    return async function (dispatch) {
        try {
            const nameJson = await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
                type: GET_NAME_RECIPE,
                payload: nameJson.data
            })
        } catch (error) {
            alert("This recipe doesn't exist"); 
        }
    }
}

//* 4

export function getDiets() {
    return async function (dispatch) {
        var dietsJson = await axios.get('http://localhost:3001/diets');
        return dispatch({
            type: GET_DIETS,
            payload: dietsJson.data
        })
    }
}

//* 5

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}


//* 6

export function orderByScoreLikes(payload) {
    return {
        type: ORDER_BY_SCORE_LIKES,
        payload
    }
}

//* 7

export function filterByDiet(payload) {
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

//* 8

export function getTypesOfDiet() {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/types")
            return dispatch({
                type: GET_TYPES_OF_DIET,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//* 9

export function postRecipe(payload) {
    return async function () {
        const postJson = await axios.post("http://localhost:3001/recipe", payload);
        return {
            type: POST_RECIPE,
            payload: postJson.data
        }
    }
}


export function getClean() {
    return {
        type: GET_CLEAN,
        payload: []
    }
}

