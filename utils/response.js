const ok = (res, data, message = "Success") => {
  res.status(200).json({ success: true, message, data });
};

const created = (res, data, message = "Resource Created") => {
  res.status(201).json({ success: true, message, data });
};
const fail = (res, message = "Operation Failed", statusCode = 400) => {
  res.status(statusCode).json({ success: false, message });
};

module.exports = {
  ok,
  created,
  fail,
};
