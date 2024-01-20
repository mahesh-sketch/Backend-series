import file from "fs";
import express from "express";

function logMiddleware(filename) {
  try {
    return (req, res, next) => {
      file.appendFile(
        filename,
        `\n ${Date.now()}:${req.ip}:${req.method}:${req.path}`,
        (err, data) => {
          next();
        }
      );
    };
  } catch (error) {
    console.log("Error happend: ", error);
  }
}

export default logMiddleware;
