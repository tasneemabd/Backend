// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true },
  
// }, { collection: 'users' });



// const User = mongoose.model('User', UserSchema);


// module.exports =  User ;


const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
     name: { type: String, required: true },
     IDNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   phone: { type: String, required: true },
    
   }, { collection: 'users' });

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { collection: 'user-data' });

const PatientSchema = new mongoose.Schema({
  name: { type: String },
  IDNumber: { type: Number   },
  phoneNumber: { type: Number },
  about:{ type: String },
  email: { type: String },
  streetaddress:{ type: String },
  Age: { type: Number },
  width:{ type: Number },
  length: { type: Number },
  bloodType: {
    type: String,
    enum: ['A+', 'B+', 'AB+', 'O-', 'A-', 'B-'],
    default: 'A+',
  },
  coronaVaccinated: {
    type: Object,
    default: false,
  },
  gender: {
    type: Object,
    enum: ['Male', 'Female'],
  
  },
}, { collection: 'patient-data' });
const Patient = mongoose.model('Patient', PatientSchema);


const LabResultSchema = new mongoose.Schema({
  TestType: {
    type: String,
    enum: ['Blood Test', 'Urine Test'],
    default: 'Blood Test',
  },
  IDNumber: { type: Number   },

  about:{ type: String },
  TestName: {type: String,
    enum: ['Blood Glucose Levels', 'Cholesterol Levels', 'Hemoglobin','Serum Creatinine Levels','Testosterone Levels','Estrogen Levels','Cortisol Levels','Insulin Levels','Vitamin D Levels','Iron Levels','Serum Sodium Levels','Serum Potassium Levels','Serum Calcium Levels'],
    default: 'Blood Glucose Levels',
  },
  NumericValues: { type: Number },
  QualitativeResults:{   type: String,
    enum: ['Positive', 'Negative','Present','Absent','High','Low','Normal'],
    default: 'Positive', },
    Date: { type: Date },
    Laboratory:{ type: String },

}, { collection: 'labResult' });


const SurgerySchema = new mongoose.Schema({
  Description: { type: String },
  Date: { type: Date },
  IDNumber: { type: Number   },
  SurgeonName: { type: String },
  AppointmentDetails:{ type: Date },
  Procedurename: { type: String },

  AnesthesiaType: {
    type: String,
    enum: ['General', 'Local', 'Spinal'],
    default: 'General',
  },
 
}, { collection: 'Surgery-data' });

const MedicationSchema = new mongoose.Schema({
  MedicationName: { type: String },
  StartDate: { type: Date },
  IDNumber: { type: Number   },
  QuantityPrescribed: { type: String },
  Instructions :{ type: String },
  Procedurename: { type: String },

}, { collection: 'Medication-data' });
const XRaySchema = new mongoose.Schema({
  TypeXray: { type: String },
  Date: { type: Date },
  IDNumber: { type: Number   },
  Description: { type: String },
 

}, { collection: 'XRay-data' });

const MyVisitSchema = new mongoose.Schema({
  Clinics: { type: String },
  Date: { type: Date },
  IDNumber: { type: Number   },
  Description: { type: String },
  Status: { type: String },
 

}, { collection: 'MyVisit-data' });

const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', adminSchema);
const labResult = mongoose.model('labResult', LabResultSchema);
const Surgerydata = mongoose.model('Surgery', SurgerySchema);
const Medication = mongoose.model('Medication', MedicationSchema);
const XRay = mongoose.model('XRay', XRaySchema);
const MyVisit = mongoose.model('MyVisit', MyVisitSchema);


module.exports = { User,Patient , labResult,Surgerydata,Admin};
