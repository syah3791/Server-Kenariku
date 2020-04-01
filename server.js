// Required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require('cors')
const multer = require('multer');

const app = express();
var nameFile = null;
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
// Body Parser
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Routes
const user = require("./routes/api/User");
const burung = require("./routes/api/burung");
const gallery = require("./routes/api/gallery");
const report = require("./routes/api/report");
const finance = require("./routes/api/finance");
const breeding = require("./routes/api/breeding");
const batch = require("./routes/api/batch");
const batchlog = require("./routes/api/batchlog");
const image = require("./routes/api/image");
// const karyawan = require("./routes/api/employees");
// const profile = require("./routes/api/profile");

// DB Config
const db = require("./config/keys").mongoURI;

// // Connect to MongoDB
// mongoose.connect(db, { useNewUrlParser: false });

// mongoose.connection
//   .once("open", () => {
//     console.log("====================================");
//     console.log("mongoDB connected");
//     console.log("====================================");
//   })
//   .on("error", err => {
//     console.log("====================================");
//     console.log("error : ", err);
//     console.log("====================================");
//   });

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// use routes
app.use("/api/users", user);
app.use("/api/burung", burung);
app.use("/api/gallery", gallery);
app.use("/api/report", report);
app.use("/api/finance", finance);
app.use("/api/breeding", breeding);
app.use("/api/batch", batch);
app.use("/api/batchlog", batchlog);
app.use("/api/image", image);
app.use('/img', express.static('./client/src/components/img/uploads/'));
app.use('/audio', express.static('./client/src/components/audio/uploads/'));
// app.use("/api/employees", karyawan);
// app.use("/api/profile", profile);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// middlewares
// Set storage engine
const storage = multer.diskStorage({
    destination: './client/src/components/img/uploads/',
    filename: function (req, file, cb) {        
        // null as first argument means no error
        nameFile = Date.now() + '-' + file.originalname 
        cb(null, nameFile)
    }
})
const storageau = multer.diskStorage({
    destination: './client/src/components/audio/uploads/',
    filename: function (req, file, cb) {        
        // null as first argument means no error
        nameFile = Date.now() + '-' + file.originalname 
        cb(null, nameFile)
    }
})
// Init upload
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }
}).single('files')
const uploadau = multer({
    storage: storageau, 
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        sanitizeFileAudio(file, cb);
    }
}).single('files')

// Handle the upload route
app.post('/upload', (req, res) => {
    // res.send('done');
    upload(req, res, (err) => {
        if (err){ 
            return res.status(200).json({ success: false, data: err });
        }else{
            // If file is not selected
            if (req.file == undefined) {
              return res.status(200).json({ success: false, data: nameFile });
            }else{
              return res.status(200).json({ success: true, data: nameFile });
            }
        }
    
    })
})
app.post('/uploadau', (req, res) => {
    // res.send('done');
    uploadau(req, res, (err) => {
        if (err){ 
            return res.status(200).json({ success: false, data: err });
        }else{
            // If file is not selected
            if (req.file == undefined) {
              return res.status(200).json({ success: false, data: nameFile });
            }else{
              return res.status(200).json({ success: true, data: nameFile });
            }
        }
    
    })
})
function sanitizeFile(file, cb) {
    // Define the allowed extension
    let fileExts = ['png', 'jpg', 'jpeg', 'gif']
    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("image/")
    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true) // no errors
    }
    else {
        // pass error msg to callback, which can be displaye in frontend
        cb('Error: File type not allowed or to large (Max 1MB)!')
    }
}
function sanitizeFileAudio(file, cb) {
    // Define the allowed extension
    let fileExts = ['mp3', 'mpeg']
    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("audio/")
    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true) // no errors
    }
    else {
        // pass error msg to callback, which can be displaye in frontend
        cb('Error: File type not allowed or to large (Max 1MB)!')
    }
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
