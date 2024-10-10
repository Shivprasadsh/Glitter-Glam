const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const userModel = require('./usermodel')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verifytoken')


//Register

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, phonenumber } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
      const passwordhash = await bcryptjs.hash(password, 10);
        const user = new userModel({
            username,
            email,
            password: passwordhash,
            phonenumber
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
//login

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Create JWT token with user id and role
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRETKEY,
            { expiresIn: '1h' }
        );

        // Set the JWT token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Use secure cookies in production
            sameSite: 'Strict',  // Allows cross-site cookies
        });
        // Respond with user details and the token
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession
            },
            token  
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});



// all users
router.get('/user',verifyToken ,async(req,res)=>{
    res.send({message:"protected user"})
} )

//logout

router.post('/logout', (req,res)=>{
    res.clearCookie('token')
    res.status(200).send({message:"Logout Sucesfull"})

})

//delect a user

router.delete('/users/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await userModel.findByIdAndDelete(id)
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
        res.status(200).send({message:"User delected Sucessfully"})
    } catch (error) {
        console.error("delecting user:", error);
        res.status(500).json({ message: "delecting error", error });
    }
})

//get all users

router.get('/users',async (req,res)=>{
    try {
        const user = await userModel.find({},'id email role').sort({createdAt:-1})
        res.status(200).send(user)
    } catch (error) {
        console.error(" user getting:", error);
        res.status(500).json({ message: "user getting error", error });
    }
})

//update user role

router.put('/users/:id', async(req,res)=>{
    try {
        const {id} =req.params
        const {role} = req.body;
        const user = await userModel.findByIdAndUpdate(id,{role},{new:true})

        if(!user){
            res.status(404).send({message:"User not found"})
        }
        res.status(200).send({message:"User role has been updated"})

    } catch (error) {
        console.error("Updating user:", error);
        res.status(500).json({ message: "updating error", error });
    }
})

//edit profile

router.patch('/edit-pro',async (req,res)=>{
    try {
        const {userId,username,profileImage,bio,profession} = req.body;
        if(!userId){
             return res.status(404).send({message:"User ID is required"})
        }
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

       
        if (username) user.username = username;
        if (profileImage) user.profileImage = profileImage;
        if (bio) user.bio = bio;
        if (profession) user.profession = profession;

       
        await user.save();
        res.status(200).send({message:"profile updated sucessfully",user: {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession
        }})


    } catch (error) {
        console.error("Updating user profile:", error);
        res.status(500).json({ message: "updating  profile error", error });
    }
})





module.exports = router