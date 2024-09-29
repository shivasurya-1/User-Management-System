let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let bcrypt = require("bcrypt");

let app = express();
app.use(express());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

let multer = require("multer");
const { status } = require("init");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.listen(4567, () => {
  console.log("Listening to the Port");
});

let userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  mobileNo: Number,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

app.post("/register", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    let userDetails = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age,
      gender: req.body.gender,
      mobileNo: req.body.mobileNo,
      profilePic: req.file.path,
    });
    await User.insertMany([userDetails]);
    res.json({ status: "success", msg: "user created succesfully" });
  } catch (err) {
    res.json({ status: "failure", msg: "user was not created", err: err });
  }
});
app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);

  let userDetailsArr = await User.find().and({ email: req.body.email });

  let loggedInUserDetails = {
    firstName: userDetailsArr[0].firstName,
    lastName: userDetailsArr[0].lastName,
    age: userDetailsArr[0].age,
    gender: userDetailsArr[0].gender,
    email: userDetailsArr[0].email,
    mobileNo: userDetailsArr[0].mobileNo,
    profilePic: userDetailsArr[0].profilePic,
  };

  if (userDetailsArr.length > 0) {
    console.log(req.body.password);
    console.log(userDetailsArr[0].password);
    let isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userDetailsArr[0].password
    );
    if (isPasswordCorrect == true) {
      res.json({ status: "success", data: loggedInUserDetails });
    } else {
      res.json({ status: "failure", msg: "wrong password" });
    }
  } else {
    res.json({ status: "failure", msg: "user doesnot exist" });
  }
});

app.put("/updateDetails", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    if (req.body.firstName.trim().length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { firstName: req.body.firstName }
      );
    }

    if (req.body.lastName.trim().length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { lastNameName: req.body.lastName }
      );
    }

    if (req.body.age.trim().length > 0) {
      await User.updateMany({ email: req.body.email }, { age: req.body.age });
    }

    if (req.body.gender.trim().length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { gender: req.body.gender }
      );
    }

    if (req.body.mobileNo.trim().length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { mobileNo: req.body.mobileNo }
      );
    }

    if (req.file) {
      await User.updateMany(
        { email: req.body.email },
        { profilePic: req.file.path }
      );
    }
    res.json({ status: "success", msg: "Successfully Updated profile" });
  } catch (error) {
    res.json({ status: "failure", msg: "Unable to update profile" });
  }
});

app.delete("/deleteUser", upload.none(), async (req, res) => {
  let result = await User.deleteMany({ email: req.body.email });
  if (result.acknowledged == true) {
    res.json({ status: "success", msg: "User Deleted Successfully " });
  } else {
  }
  res.json({ status: "failure", msg: "Unable to delete profile" });
});

let connectToDataBase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shiva:suryadec@cluster0.iamrm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Succesfully connected to database");
  } catch (err) {
    console.log("Connection failed");
  }
};
connectToDataBase();
