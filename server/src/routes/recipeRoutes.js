const express = require('express');
const router = express.Router();
const { getRandom, getByIngredient, getByName, getById, createRecipe } = require('../controllers/recipeController'); 

router.get('/random', getRandom);
router.get('/ingredient/:ingredient', getByIngredient);
router.get('/:id', getById);
router.get('/name/:name', getByName)
router.post('/:id', createRecipe);

module.exports = router;