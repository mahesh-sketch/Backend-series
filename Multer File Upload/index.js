import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
const app = express();

const uploadFolder = "./Multer File Upload/uploads";

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const upload = multer({ dest: uploadFolder });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadData = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./Multer File Upload/views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/upload", uploadData.single("avatar"), (req, res) => {
  if (req.file) {
    console.log("File uploaded successfully");
    console.log(req.body);
    console.log(req.file);
  } else {
    console.error("Error uploading file:", req.fileValidationError);
  }

  return res.redirect("/");
});

app.listen(8000, () => {
  console.log("Server is working..");
});
