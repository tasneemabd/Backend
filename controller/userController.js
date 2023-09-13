const { User,labResult } = require('../model/Models');
const  {Patient}  = require('../model/Models');
const  {Surgerydata}  = require('../model/Models');

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


    // exports.signupUser = async (req, res) => {
    //     console.log(req.body);
    //     try {
    //       const newPassword =await bcrypt.hash(req.body.password,10)
    //       await User.create({
    //         name: req.body.name,
    //         email: req.body.email,
    //         phone: req.body.phone,
         
            
    //         password: newPassword,
    //       });
    //       res.json({ status: 'ok' });
    //     } catch (err) {
    //       console.log(err);
    //       res.json({ status: 'error', error: 'Duplicate email' });
    //     }
    //   }
    exports.signupUser = async (req, res) => {
      console.log(req.body);
      try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
          name: req.body.name,
          id: req.body.id, // Use the provided ID from the request body
          phone: req.body.phone,
          password: newPassword,
        });
        res.json({ status: 'ok' });
      } catch (err) {
        console.log(err);
        res.json({ status: 'error', error: 'Duplicate ID' });
      }
    };
    
      
      exports.loginUser = async (req, res) => {
        const user = await User.findOne({
          id: req.body.id,
          // password: req.body.password,
        })
        if(!user) {return {stutas: 'error', error :'invalid token'}}
        const isPasswordValid= await bcrypt.compare(req.body.password, user.password)
    
        if (isPasswordValid) {
          const token= jwt.sign({
              name:user.name,
              id:user.id,
    
          },'secret123')
          return res.json({ status: 'ok', user: token });
        } else {
          return res.json({ status: 'error', user: false });
        }
      }

      
          exports.signupAdmin = async (req, res) => {
              console.log(req.body);
              try {
                const newPassword =await bcrypt.hash(req.body.password,10)
                await User.create({
                  name: req.body.name,
                  email: req.body.email,
                  password: newPassword,
                });
                res.json({ status: 'ok' });
              } catch (err) {
                console.log(err);
                res.json({ status: 'error', error: 'Duplicate email' });
              }
            }
      
            exports.loginAdmin = async (req, res) => {
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
      
            exports.AddPatient=async (req, res) => {
              try {
      
              const { email, name, IDNumber, phoneNumber, about, Age, width, length, bloodType, coronaVaccinated, streetaddress, gender } = req.body;
      
              // Create a new patient document
              const newPatient = new Patient({
                email,
                name,
                IDNumber,
                phoneNumber,
                about,
                Age,
                width,
                length,
                bloodType,
                coronaVaccinated,
                streetaddress,
                gender,
              });
          
              // Save the patient to the database
              await newPatient.save();
          
              res.status(201).json({ message: 'Patient data saved successfully' });
            } catch (error) {
              console.error('Error saving patient data:', error);
              res.status(500).json({ message: 'An error occurred' });
            }
          }
          
            exports.getPatientProfile = async (req, res) => {
              try {
                // Fetch patient data from the database
                const patientData = await Patient.findOne({ email: req.loggedInUserEmail });
            
                // Log the patientData to check its format
                console.log(patientData);
            
                res.status(200).json(patientData); // Send the data as JSON response
              } catch (error) {
                console.error('Error fetching patient data:', error);
                res.status(500).json({ error: 'Internal server error' });
              }
            };
      
           // Modify your existing controller function
           exports.getPatientProfileById = async (req, res) => {
            const IDNumber = req.params.IDNumber;
            try {
              const patient = await Patient.findOne({ IDNumber });
              if (patient) {
                res.json(patient);
              } else {
                res.status(404).json({ message: 'Patient not found' });
              }
            } catch (error) {
              res.status(500).json({ message: 'Error retrieving patient' });
            }
          };
      // router.get('/allPatients', async (req, res) => {
        exports.getallPatients = async (req, res) => {
      
        try {
          // Fetch all patients from the database
          const patients = await Patient.find();
          console.log(patients)
      
          res.status(200).json(patients);
        } catch (error) {
          console.error('Error fetching patients:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };
      
      
      exports.labResult =async (req, res) => {
        try {
      
        const { TestType,TestName, about, NumericValues,QualitativeResults,Date,Laboratory } = req.body;
      
        const newlabResult = new labResult({
          TestType, 
          TestName,
          about,
          NumericValues,
          QualitativeResults,
          Date,
          Laboratory,
        });
        await newlabResult.save();
      
        res.status(201).json({ message: 'lab Result  saved successfully' });
      } catch (error) {
        console.error('Error saving patient data:', error);
        res.status(500).json({ message: 'An error occurred' });
      }
      }
      exports.getalllabresult = async (req, res) => {
      
        try {
          // Fetch all patients from the database
          const labResults = await labResult.find();
      
          res.status(200).json(labResults );
        } catch (error) {
          console.error('Error fetching patients:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };
      
      
      // exports.SurgeryPost =async (req, res) => {
      //   try {
      //     const { patientId, SurgeonName, AnesthesiaType, Description, AppointmentDetails, Procedurename, Date } = req.body;
      
      //     const newSurgery = new Surgerydata({
          
      //       SurgeonName,
      //       AnesthesiaType,
      //       Description,
      //       AppointmentDetails,
      //       Procedurename,
      //       Date,
      //     });
      //     await newSurgery.save();
      
      //     res.status(201).json({ message: 'Surgery saved successfully' });
      //   } catch (error) {
      //     console.error('Error saving surgery data:', error);
      //     res.status(500).json({ message: 'An error occurred' });
      //   }
      // };
      exports.SurgeryPost = async (req, res) => {
        try {
          // Destructure the surgery data from the request body
          const {
            Description,
            AnesthesiaType,
            Date,
            SurgeonName,
            AppointmentDetails,
            Procedurename,
            IDNumber,
          } = req.body;
      
          // Create a new surgery document
          const newSurgery = new Surgerydata({
            Description,
            AnesthesiaType,
            Date,
            SurgeonName,
            AppointmentDetails,
            Procedurename,
            IDNumber,
          });
      
          // Save the surgery record to the database
          await newSurgery.save();
      
          res.status(201).json({ message: 'Surgery record added successfully' });
        } catch (error) {
          console.error('Error adding surgery record:', error);
          res.status(500).json({ message: 'An error occurred' });
        }
      };
      
      
      // exports.getallSurgery = async (req, res) => {
      //   const IDNumber = req.params.IDNumber;
      
      //   try {
      //     const surgeries = await Surgerydata.find();
      //     res.status(200).json(surgeries);
      //   } catch (error) {
      //     console.error('Error fetching surgeries:', error);
      //     res.status(500).json({ message: 'Internal server error' });
      //   }
      // };
      exports.getallSurgery = async (req, res) => {
        try {
          const { IDNumber } = req.params;
          const surgeries = await Surgerydata.find({ IDNumber });
          res.json(surgeries);
        } catch (error) {
          console.error('Error fetching surgery records:', error);
          res.status(500).json({ message: 'An error occurred' });
        }
      };
       
      
      //   try {
      //     const surgeries = await Surgerydata.find({ IDNumber });
      
      //     if (!surgeries || surgeries.length === 0) {
      //       return res.status(404).json({ message: 'Surgeries not found for the patient' });
      //     }
      
      //     res.json(surgeries);
      //   } catch (error) {
      //     console.error(error);
      //     res.status(500).json({ message: 'Server Error' });
      //   }
      // };
      
      
      exports.patientProfileinfo = async (req, res) => {  try {
          const patientId = req.params.IDNumber;
      
          // Fetch patient information from the database based on the patientId
          const patient = await Patient.findById(patientId);
      
          if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });  
          }
      
          // Send the patient information to the client
          res.json(patient);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      }
      exports.getPatientProfile = async (req, res) => {
        try {
          // Fetch patient data from the database based on the user's email
          const patientData = await Patient.findOne({ email: req.user.email });
      
          // Log the patientData to check its format
          console.log(patientData);
      
          res.status(200).json(patientData); // Send the data as a JSON response
        } catch (error) {
          console.error('Error fetching patient data:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      