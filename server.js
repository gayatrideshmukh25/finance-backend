const express = require("express");
const app = express();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();
// const { connectDB } = require("./config/database.js");

// connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Finance Data Processing and Access Control APIs",
  });
});

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/dashboard", require("./routes/dashboard.js"));
app.use("/api/users", require("./routes/users.js"));
app.use("/api/records", require("./routes/records.js"));

app.use(errorHandler);
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
