const filesystem = require("fs");

const fileDeleteHandler = (files) => {
  files.forEach((file) => {
    filesystem.unlink(file, (error) => {
      if (error) {
        throw error;
      }
    });
  });
};

module.exports = fileDeleteHandler;
