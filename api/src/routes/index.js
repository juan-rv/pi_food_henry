
const { Router } = require("express");
const axios = require("axios");
const router = Router();

//const API_KEY = '2683e1d5579947d1aaf62eb69d292a0b'
//const API_KEY = 'e0a7aa5701224ab5a9dfade12f382189'
//const API_KEY ='6b2ed0c7bd3f46738c315025fcf272ec'
//const API_KEY = '70a5089606a144a9ac90ed42c63034fb'
//const API_KEY = '4ef9f37e0e2b400887d7f0facf691771'
//const API_KEY = 'f0185a15d29f445ab2d152f07b6db93d'
//const API_KEY = 'a508230fefd84bb7abede24318c8189b'
const API_KEY = '6db5f5689ab74fdaa2df7e4a65cc751c'



const { Recipe, Diet } = require("../db");
require("dotenv").config();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => { // función para llamar la información de la api externa 
  const apiInfo = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  return apiInfo.data.results;
};

const getDbInfo = async () => { // función que trae la info de la db
  return await Recipe.findAll({ 
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => { // funcón que concatena los datos de la api y los de la db
  const apiInfo = await getApiInfo(); // trae la info de la api
  const dbInfo = await getDbInfo(); // trae la info de la bd
  const totalInfo = dbInfo.concat(apiInfo); // concatena la info de api y la info de la bd
  return totalInfo;
};

router.get("/recipes", async (req, res) => {
  const { name } = req.query; // se pide por query
  const recipesTotal = await getAllRecipes(); // trae todas las recetas
  if (name) { //primera condición para saber si hay un name por query
    let recipeTitle = await recipesTotal.filter((r) => 
      r.title.toLowerCase().includes(name.toLowerCase()) //métodod toLowerCase para que no haya problema entre mayusculas y minúsculas
    );
    recipeTitle.length //si encuentra el nombre?
      ? res.status(200).json(recipeTitle) //si lo encontró muestrame recipesTitle
      : res.status(400).send("This recipe doesn't exist"); // si no lo encontró muestrame un mensaje
  } else {
    res.status(200).json(recipesTotal);
  }
});

router.get("/types", async (req, res) => {
  const recipesApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const types = await recipesApi.data.results.map((t) => t.diets);
  const diets = types.flat();
  const typeDiets = [...new Set(diets), "vegetarian"];
  typeDiets.forEach((d) => {
    Diet.findOrCreate({
      where: { name: d },
    });
  });
  const allDiets = await Diet.findAll();
  res.json(allDiets);
});

router.post("/recipe", async (req, res) => { //lo que requiere el body
  let {
    title,
    summary,
    aggregateLikes,
    healthScore,
    analyzedInstructions,
    image,
    diets,
  } = req.body;
  if (!title || !summary) {
    return res.json("You must enter a title and a summary to create a recipe"); //si no hay un titulo o sumuary muestrame un mensaje
  }
  let recipeCreated = await Recipe.create({
    title,
    summary,
    aggregateLikes,
    healthScore,
    analyzedInstructions,
    image : image ||  'https://img.freepik.com/fotos-premium/manos-femeninas-sostienen-cubiertos-sobre-plato-vacio-naranja_185193-33404.jpg'
  });
  let dietDb = await Diet.findAll({ where: { name: diets } });
  recipeCreated.addDiet(dietDb);
  res.send("Recipe created successfully"); 
});


router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const recipesTotal = await getAllRecipes();
  if (id) {
    let recipeId = await recipesTotal.filter((r) => r.id == id);
    recipeId.length
      ? res.status(200).json(recipeId)
      : res.status(404).send("Recipe not found");
  }
});

module.exports = router;
