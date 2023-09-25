const express = require("express");
const userController = require("../controller/userController");
const authMiddleware = require('../controller/Authentication ')

const router = express.Router();


router.route("/signup").post(userController.signupUser);
router.route("/login").post(userController.loginUser);








// router.route("/signup").post(userController.signupAdmin);
// router.route("/login").post(userController.loginAdmin);
router.route("/addpatients").post(userController.AddPatient);
// router.route('/patientProfile').get(authMiddleware, userController.getPatientProfile);
router.route('/patientProfile/:IDNumber').get(userController.getPatientProfileById);
router.route('/allPatients').get (userController.getallPatients);
// router.route('/getpatientprofile').get( userController.getpatientprofile);
router.route("/labresult/:IDNumber").post(userController.labResult);
router.route('/alllabresult/:IDNumber').get (userController.getalllabresult);
router.route("/Surgery/:IDNumber").post(userController.SurgeryPost);
router.route('/getallSurgery/:IDNumber').get(userController.getallSurgery);
router.route('/getallSurgery').get(userController.getallSurgery);
router.route('/getpatientprofile').get (userController.patientProfileinfo);



router.route("/Medication/:IDNumber").post(userController.Medication);
router.route('/getallMedication/:IDNumber').get (userController.getallMedication);
router.route("/XRay/:IDNumber").post(userController.XRay);
router.route('/getallXRay/:IDNumber').get (userController.getallXRay);


router.route("/MyVisit/:IDNumber").post(userController.MyVisit);
router.route('/allMyVisit/:IDNumber').get (userController.getallMyVisit);


router.route("/Allergic/:IDNumber").post(userController.Allergic);
router.route('/getAllergic/:IDNumber').get (userController.getAllergic);







module.exports = router;