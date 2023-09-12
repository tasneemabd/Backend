const  User  = require('../model/Models');


const express = require("express");
//

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

const bodyParser = require('body-parser');


const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.json());

//

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};


    exports.signupUser = async (req, res) => {
        console.log(req.body);
        try {
          const newPassword =await bcrypt.hash(req.body.password,10)
          await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
         
            
            password: newPassword,
          });
          res.json({ status: 'ok' });
        } catch (err) {
          console.log(err);
          res.json({ status: 'error', error: 'Duplicate email' });
        }
      }
      
      exports.loginUser = async (req, res) => {
        const user = await User.findOne({
          email: req.body.email,
          // password: req.body.password,
        })
        if(!user) {return {stutas: 'error', error :'invalid token'}}
        const isPasswordValid= await bcrypt.compare(req.body.password, user.password)
    
        if (isPasswordValid) {
          const token= jwt.sign({
              name:user.name,
              email:user.email,
    
          },'secret123')
          return res.json({ status: 'ok', user: token });
        } else {
          return res.json({ status: 'error', user: false });
        }
      }
