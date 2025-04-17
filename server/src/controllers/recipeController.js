const axios = require('axios');
const Recipe= require('../models/Recipe');
require('dotenv').config();

//gets a random recipe
exports.getRandom = async (req, res) => {
    try {
        const url = "https://www.themealdb.com/api/json/v1/1/random.php"

        try {
            const response = await axios.get(url);
            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error fetching recipe data:", error);
            res.status(500).json({ message: "Failed to fetch recipe data", error: error.message });
        }

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

//gets a list of recipes containing an ingredient
exports.getByIngredient = async (req, res) => {
    const { ingredient } = req.params;
    try{
        const url = "https://www.themealdb.com/api/json/v1/1/filter.php?i="+ingredient

        try {
            const response = await axios.get(url);
            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error fetching recipe data:", error);
            res.status(500).json({ message: "Failed to fetch recipe data", error: error.message });
        }



    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

//gets a recipe by id
exports.getById = async (req, res) => {
    const { id } = req.params;
    try{
        const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id

        try {
            const response = await axios.get(url);
            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error fetching recipe data:", error);
            res.status(500).json({ message: "Failed to fetch recipe data", error: error.message });
        }



    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }

};

exports.getByName = async(req, res) => {
    const {name}  = req.params;
    try{
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s="+name);
        res.status(200).json(response.data);
    }
    catch(err){
        res.status(500).json({message:"Server error", error:err.message});
    }
}

exports.createRecipe = async(req, res) => {
    const { id, difficulty_lvl, point_value } = req.params;
    try{

        const newRecipe = new Recipe({
            id, 
            difficulty_lvl, 
            point_value,
        });
        
        await newRecipe.save();

        res.status(201).json({ message: "Recipe created successfully", Recipe: newRecipe });


    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
