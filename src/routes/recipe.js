const express = require('express');
const path = require('path');

const rootDir = require('../utils/path-helper');

const router = express.Router();


/**
 * @route GET //localhost:8000/recipes/
 * @desc Get all recipes
 */
router.get('/') 

/**
 * @route POST //localhost:8000/recipes/save
 * @desc Save a recipe
 */
router.post('/save')

/**
 * @route GET //localhost:8000/recipes/create
 * @desc Get the create recipe form
 */
router.get('/create')

/**
 * @route GET //localhost:8000/recipes/:id
 * @desc Get a single recipe by id
**/
router.get('/:id')

module.exports = router;