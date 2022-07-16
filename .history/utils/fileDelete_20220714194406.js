const filesystem = require("fs");

const fileDeleteHandler = (files) => {
  filesystem.unlink(filepath, (error) => {
    if (error) {
      throw error;
    }
  });
};

module.exports = fileDeleteHandler