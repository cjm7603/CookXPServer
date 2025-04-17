const express = require('express');
const router = express.Router();
const { login, signup, logout, 
    getUserInfo, updateUserInfo, 
    addFriend, getFriendByUser, removeFriendByUser, getAllUsers, 
    createRecipeCompletion, completeRecipe, getRecipeInProgress, getRecipesCompletedByUser } = require('../controllers/userController'); 

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/:username', getUserInfo);
router.put("/:username",updateUserInfo)
router.post("/friend/add", addFriend);
router.get("/friend/:username", getFriendByUser);
router.delete("/friend", removeFriendByUser);
router.get("/", getAllUsers);
router.post('/saveRecipe', createRecipeCompletion);
router.put('/recipe/completeRecipe', completeRecipe);
router.get('/recipe/:username', getRecipeInProgress);
router.get('/recipe/all/:username', getRecipesCompletedByUser);

module.exports = router;