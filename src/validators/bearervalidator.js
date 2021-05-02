const jwt = require("jsonwebtoken");
const User = require("../moodles/user.js");

require("dotenv").config();
const { ErrorRes, SuccessRes, FailRes } = require("../responses.js");
const validateBearer = async (req, res, next) => {
  const bearHeader = req.headers["authorization"];

  try {
    if (bearHeader) {
      const token = bearHeader.split(" ")[1];
      console.log(token);
      try {
        const legittoken = jwt.verify(token, process.env.SECRET);

        const user = await User.findOne({
          _id: legittoken.id,
        });

        if (user === null) return res.json(new ErrorRes("Illegal user"));
      } catch (err) {
        console.log("error verifying JWT", err);
        return res.json(new ErrorRes("Invalid token: ", token));
      }

      req.token = token;
      next();
      return;
    }
    res.json(
      new FailRes({
        authorization: "No bearer was provided",
      })
    );
  } catch (err) {
    console.log("error during authorization", err);
    return res.json(
      new ErrorRes("Something went horribly wrong, please try again later")
    );
  }
};

module.exports = validateBearer;
