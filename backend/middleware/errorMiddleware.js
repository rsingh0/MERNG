const notFound = (req, res, next) => {
  console.log(`Handaling Not Found ${req.originalUrl}`.red);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log(`Handaling General Error ${req.originalUrl} ${JSON.stringify(req.body)}`.red);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
