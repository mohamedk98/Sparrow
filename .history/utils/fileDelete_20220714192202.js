const filesystem = require("fs");

const fileDeleteHandler = (filepath) => {
  filesystem.unlink(filepath, (error) => {
    if (error) {
      throw error;
    }
  });
};

module.exports = fileDeleteHandler