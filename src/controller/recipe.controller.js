const Recipe = require('../model/recipe.model')

exports.getRecipesPage = (req,res,next) => {
    // res.render('recipes', { recipes })
    Recipe.fetchAllRecipes((recipeData) => {
        if(recipeData.message){
            res.render('400', { title: "Something went wrong", message: recipeData.message })
        }

        res.render('recipes', { recipes: recipeData })
    })
}

exports.getAddRecipePage = (req, res, next) => {
    res.render('create')
}

exports.postAddRecipe = (req, res, next) => {
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

    const newRecipe = new Recipe(name, ingredients, instruction)
    newRecipe.save(({ message, status}) => {
        if(status === 200){
            return res.redirect('/recipes')
        }

        res.status(status).json({message})
    })
}

exports.getRecipeById = (req,res,next) => {
    const fetchRecipe = Recipe.findById(req.params.id)

    if(fetchRecipe.message){
        res.render('400', { title: "Something went wrong", message: fetchRecipe.message })
    }

    res.render("eachRecipe", {fetchRecipe})
}

exports.getUpdateRecipePage = (req, res, next) => {
    const fetchRecipe = Recipe.findById(req.params.id)


    res.render('updateRecipe', {fetchRecipe})
}

exports.putUpdateRecipe = (req, res, next) => {
    let { name, ingredient, quantity, instruction } = req.body
    const fetchRecipe = Recipe.findById(req.params.id)

    if(!Array.isArray(ingredient)){
        ingredient = [ingredient]
        quantity = [quantity]
    }

    if(!Array.isArray(instruction)){
        instruction = [instruction]
    }

    const ingredients = ingredient.map((ing, i) => {
        return { name: ing, quantity: quantity[i] }
    })

    const newRecipe = new Recipe(name, ingredients, instruction)

    // console.log(newRecipe);
    newRecipe.update(({ message, status}) => {
        console.log("Update");
        if(status === 200){
            return res.redirect('/recipes')
        }

        res.status(status).json({message})
    }, fetchRecipe.id)
}

exports.deleteRecipe = (req, res, next) => {
    const fetchRecipe = Recipe.findById(req.params.id)
    Recipe.deleteRecipe(({ message, status }) => {
        if(status === 200){
            return res.redirect('/recipes')
        }
    }, fetchRecipe.id)
    
}
