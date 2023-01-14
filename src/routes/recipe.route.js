const express = require('express')

const {
  getRecipesPage,
  getAddRecipePage,
  postAddRecipe,
  getRecipeById,
  getUpdateRecipePage,
  putUpdateRecipe,
  deleteRecipe,
} = require('../controller/recipe.controller')

const router = express.Router()

/**
 * @route GET //localhost:8000/recipes/
 * @desc Get all recipes
 */
router.get('/', getRecipesPage)

/**
 * @route POST //localhost:8000/recipes/save
 * @desc Save a recipe
 */
router.post('/save', postAddRecipe)

/**
 * @route GET //localhost:8000/recipes/create
 * @desc Get the create recipe form
 */
router.get('/create', getAddRecipePage)

/**
 * @route GET //localhost:8000/recipes/:id
 * @desc Get a single recipe by id
 **/
router.get('/:id', getRecipeById)

/**
 * @route GET //localhost:8000/recipes/:id/edit
 * @desc Get a single recipe's update page by id
 **/
router.get('/:id/edit', getUpdateRecipePage)

/**
 * @route PUT //localhost:8000/recipes/:id/update
 * @desc Update a single recipe
 **/
router.put('/:id/update', putUpdateRecipe)

/**
 * @route DELETE //localhost:8000/recipes/:id/update
 * @desc delete a single recipe
 **/

router.delete('/:id/delete', deleteRecipe)

module.exports = router


