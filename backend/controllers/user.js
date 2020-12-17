const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const createUser = async (req,res,next) => {
   try{
      const{username, password} = req.body
      const file = req.file;
      cloudinary.uploader.upload(file.path, async (error,result) => {
         if (error) throw error;
         console.log(result);
         console.log('------------');
         console.log(error);

         const user = await db.User.create({
            username,
            password,
            photo: result.secure_url
         })

         fs.unlinkSync(file.path);
         res.status(201).json({user});
      })
     
   } catch  (err) {
      res.status(500).send({message:err.message});
   }
};

//Register
const register = async (req, res) => {
   try {
      const { username, password, name, lastname, email, role } = req.body;
      const targetUser = await db.User.findOne({ where: { username } });

      if (targetUser) {
         res.status(400).send({ message: "Username already taken." });
      } else {
         const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
         const hashedPwd = bcryptjs.hashSync(password, salt);

         await db.User.create({
            username,
            name,
            lastname,
            email,
            role,
            password: hashedPwd
         });
         res.status(201).send({ message: "User created." });
      }
   } catch (err) {
      res.status(500).send({ message: err.message }); ''
   }
};


//Login
const login = async (req, res) => {
   try {
      const { username, password } = req.body;
      const targetUser = await db.User.findOne({ where: { username } });

      if (!targetUser) {
         res.status(400).send({ message: "username or password incorrect" });
      } else {
         const isCorrect = bcryptjs.compareSync(password, targetUser.password);
         if (isCorrect) {
            const payLoad = {
               id: targetUser.id,
               username: targetUser.username,
               name: targetUser.name,
               lastname: targetUser.lastname,
               email: targetUser.email,
               role: targetUser.role
            };
            const token = jwt.sign(payLoad, process.env.SECRET, { expiresIn: 3600 });
            res.status(200).send({ token });
         } else {
            res.status(400).send({ message: "username or password incorrect" });
         }
      }
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};


module.exports = {
   register,
   login,
   createUser,
};