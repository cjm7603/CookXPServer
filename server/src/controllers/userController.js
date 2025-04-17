const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Friend = require('../models/Friend');
const RecipeCompletion = require('../models/Recipe_Completion')
require('dotenv').config();

const secret = process.env.SECRET_KEY; 

exports.signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json("Username already taken, please choose a different one");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, email, password: hashedPassword, chef_level: 0});
    await newUser.save();

    res.status(201).json({ newUser, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    const userList = await User.find();
    if (!userDoc) {
      return res.status(404).json({ message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        console.error("JWT Signing Error:", err);
        return res.status(500).json({ message: "Error generating token" });
      }

      res.cookie('token', token, { httpOnly: true }).json({
        id: userDoc._id,
        username,
        token, 
        message: "Login successful"
      });
    });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
      res.clearCookie('token').json({ message: "Logout successful" });
  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getUserInfo = async(req, res) =>{
  const {username} = req.params;
  try{
    const userDetails = await User.findOne({username}, 'username chef_level');


    if (!userDetails) {
      return res.status(404).json({ message: "User" + username+ " not found" });
    }

    res.status(200).json({ userDetails, message: "Account information found"});

  }catch(err){
    res.status(500).json({ message: "Server error", error: err.message });
  }

}

exports.updateUserInfo = async(req, res) => {
  const {username, chef_level} = req.body;
  try {
    const userInfo = await User.findOneAndUpdate(
      {username: username},
      {chef_level: chef_level},
      {new:true}
    );

    res.status(200).json({ message: "User Info Updates Successfully", UserInfo: userInfo });

  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
  }

}


exports.addFriend = async (req, res) => {
  const {username, friend_username } = req.body;
  try {
      const newFriend= new Friend({
          username,
          friend_username,
      });
      await newFriend.save();
      res.status(201).json({ message: "Friend created successfully", friend: newFriend });

  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getFriendByUser = async (req, res) => {
  const { username } = req.params;

  try {
      const userFriends = await Friend.find({ username }, 'friend_username friendship_date -_id');

      if (userFriends.length === 0) {
          return res.status(404).json({ message: "User has no friends" });
      }

      res.status(200).json({userFriends, message: "User friends found"});

  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.removeFriendByUser = async(req, res) => {
  const {username, friend_username} = req.body;
  try {
    const result = await Friend.deleteMany({username:username, friend_username:friend_username});
    res.status(200).json({message: "Friend deleted "});

  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
  }
}

exports.getAllUsers = async(req, res) => {
  try {
    const users = await Friend.find({}, 'username');

    if (users.length === 0) {
        return res.status(404).json({ message: "No users available" });
    }

    res.status(200).json(users);

  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
}
};

exports.createRecipeCompletion = async(req, res) => {
  const {recipe_id, username, is_completed} = req.body;
  try {
    const newRecipeCompletion = new RecipeCompletion({
      recipe_id,
      username,
      is_completed
    })

    await newRecipeCompletion.save();
    res.status(201).json({ message: "Recipe Completion created successfully", RecipeCompletion: newRecipeCompletion });

  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
}
}


exports.completeRecipe = async(req, res) => {
  const {recipe_id,username} = req.body;
  try {
    const recipeCompletion = await RecipeCompletion.findOneAndUpdate(
      {recipe_id: recipe_id, username: username},
      {is_completed: true,
      completion_date: Date.now()},
      {new:true, upsert:true}
    );

    res.status(200).json({ message: "Recipe Marked Complete successfully", RecipeCompletion: recipeCompletion });

  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getRecipeInProgress = async(req, res) => {
  const {username} = req.params;
  const data = {
    username:username,
    is_completed:false,
  }
  try{
    const recipeDetails = await RecipeCompletion.findOne(data, "recipe_id -_id");
    if (!recipeDetails) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ recipeDetails, message: "Recipe information found"});

  }catch(err){
    res.status(500).json({ message: "Server error", error: err.message });
  }

}

exports.getRecipesCompletedByUser = async(req, res) => {
  const {username} = req.params;
  const data = {
    username: username,
    is_completed: true,
  }
  try{
    const recipeCompletionList = await RecipeCompletion.find(data, "recipe_id -_id");
    if(!recipeCompletionList){
      return res.status(404).json({message: "No completed recipes found"});
    }
    res.status(200).json({data:recipeCompletionList, message:"Recipe List Found"});
  }
  catch(err){
    res.status(500).json({message: "Server error", error:err.message});
  }
}