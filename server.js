const express = require("express");
const app = express();
const cors = require("cors");
const { errorHandler } = require("./src/middleware/errorHandler.js");
require("dotenv").config();
// const connectDB = require("./config/db.js");

// connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Finance Data Processing and Access Control APIs",
  });
});

app.use("/api/auth", require("./src/routes/auth.js"));
app.use("/api/dashboard", require("./src/routes/dashboard.js"));
app.use("/api/users", require("./src/routes/users.js"));
app.use("/api/records", require("./src/routes/records.js"));

app.use(errorHandler);
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
