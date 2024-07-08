const express = require("express");
const router = express.Router();

const{
    allPostMain,
}= require("../controllers/postCtr.js");

router.get("/", allPostMain)

module.exports = router;