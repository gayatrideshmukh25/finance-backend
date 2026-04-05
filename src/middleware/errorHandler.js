const errorHandler = (err, req, resp, next) => {
  console.error(err);
  resp.status(500).json({ message: "Internal Server Error" });
};

module.exports = { errorHandler };
