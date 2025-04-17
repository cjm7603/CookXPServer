const Achievement = require('../models/Achievement');
require('dotenv').config();

exports.create = async (req, res) => {
    const {username, name, description } = req.body;

    try {
        const params = {
            username:username,
            name:name,
            description:description,
            earned_date:Date.now(),
        }
        const newAchievement = new Achievement(params);

        await newAchievement.save();
        res.status(201).json({ message: "Achievement created successfully", achievement: newAchievement });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getByUser = async (req, res) => {
    const { username } = req.params;

    try {
        const userAchievements = await Achievement.find({ username });

        if (userAchievements.length === 0) {
            return res.status(200).json({ data:[], message: "No achievements found for this user" });
        }

        res.status(200).json({data: userAchievements, message: "Achievement List Found"});

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
