const fs = require("fs");

const writeJson = (data) => {
  fs.writeFile("data.json", JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("File has been written successfully");
    }
  });
};

module.exports = { writeJson };
