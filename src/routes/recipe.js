const express = require('express');
const path = require('path');
const fs = require('fs');

const rootDir = require('../utils/path-helper');
const recipes = require('../data/recipes.json');

const router = express.Router();


/**
 * @route GET //localhost:8000/recipes/
 * @desc Get all recipes
 */
router.get('/', (req,res,next) => {
    res.render('recipes', { recipes })
}) 

/**
 * @route POST //localhost:8000/recipes/save
 * @desc Save a recipe
 */
router.post('/save', (req, res, next) => {
    let { name, ingredient, quantity, instruction } = req.body

    if(!Array.isArray(ingredient)){
        ingredient = [ingredient]
        quantity = [quantity]
    }

    if(!Array.isArray(instruction)){
        instruction = [instruction]
    }

    const ingredients = ingredient.map((ing, i) => {
        //ingredient --> [ 'flour', 'sugar', 'butter' ]
        //quantity -->   [ '1 cup', '4 cups', '2 cups' ]
        return { name: ing, quantity: quantity[i] }
    })

    const newRecipe = {
        id: recipes.length + 1,
        name,
        ingredient: ingredients,
        instruction
    }

    const recipePath = path.join(rootDir, 'data', 'recipes.json')
    fs.readFile(recipePath, "utf8", (err, data) => {
        if(err){
            res.status(500).json({ error: "Could not read recipe.json" })
        }

        //Parse the JSON file
        const recipes = JSON.parse(data)
        recipes.push(newRecipe)

        //Write the new data to JSON file
        fs.writeFile(recipePath, JSON.stringify(recipes, null, 2),"utf8", (err) => {
            if(err){
                res.status(500).json({ error: "Could not write to recipe.json" })
            }
            res.redirect('/recipes')
        })
    })
})

/**
 * @route GET //localhost:8000/recipes/create
 * @desc Get the create recipe form
 */
router.get('/create', (req, res, next) => {
    res.render('create')
})

/**
 * @route GET //localhost:8000/recipes/:id
 * @desc Get a single recipe by id
**/
router.get('/:id', (req,res,next) => {
    const { id } = req.params
    const recipe = recipes.find(recipe => recipe.id === parseInt(id))

    if(!recipe){
        return res.status(400).send("NOT FOUND")
    }

    res.json(recipe)
})

module.exports = router;