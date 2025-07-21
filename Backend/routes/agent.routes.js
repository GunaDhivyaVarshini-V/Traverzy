const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agent.controller");
const multer = require('multer');
const path = require('path');
const { uploadPackage } = require('../controllers/agent.controller');

// checking admin
const authMiddleware = require("../middleware/authMiddleware");
// const{isAgent} =require("../middleware/agentCheckMiddleware")
router.use(authMiddleware); 
// router.use(isAgent);
router.get('/add-packages', agentController.renderAddPackage)


// Multer config for image upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,'public/images');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
router.post('/upload', upload.array('images', 10), uploadPackage);


module.exports=router;