const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// app.use(cors({
//   origin: "https://admin.collegeveda.com",
//   methods: ["GET","POST","PUT","DELETE","OPTIONS"],
//   allowedHeaders: ["Content-Type","Authorization"]
// }));

// app.options("*", cors());
app.use(cors());

app.use(bodyParser.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/states", require("./routes/stateRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/contact", require("./routes/contactFormDataRoutes"));
app.use("/api/colleges", require("./routes/collegeRoutes"));
app.use("/api/universities", require("./routes/universityRoutes"));
app.use("/api/showcase", require("./routes/showcaseRoutes"));
app.use("/api/rank-predictor", require("./routes/rankPredictorRoutes"));
app.use("/api/apply", require("./routes/applyFormRoutes"));

// Add other routes as needed

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
