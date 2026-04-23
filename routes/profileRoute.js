const express = require ( "express")
const {getProfiles,searchProfiles} = require ( "../controllers/profileController");

const router = express.Router();

router.get("/profiles", getProfiles);
router.get("/profiles/search", searchProfiles);

module.exports =router;