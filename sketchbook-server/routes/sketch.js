// routes/sketch.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// 그림 저장 API
router.post("/upload", upload.single("sketch"), (req, res) => {
  res.json({
    message: "Sketch uploaded successfully",
    filePath: req.file.path,
  });
});

module.exports = router;
