import { User, IUser } from "../moodles/user.js";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";

dotenv.config();
import { ErrorRes, SuccessRes, FailRes } from "../responses.js";
const validateBearer = async (req: Request, res: any, next: any) => {
  const bearHeader = req.headers.get("authorization");
  console.log(bearHeader);
  try {
    if (bearHeader) {
      console.log("wowow");
      const token = bearHeader.split(" ")[1];
      console.log(token);
      try {
        const legittoken: any = jwt.verify(token, process.env.SECRET);

        const user: IUser = await User.findOne({
          _id: legittoken.id,
        });

        if (user === null)
          return res.json(new ErrorRes("Error", "Illegal user"));
      } catch (err) {
        console.log("error verifying JWT", err);
        return res.json(new ErrorRes("Invalid token: ", token));
      }

      next();
      return;
    }
    res.json(
      new FailRes("Fail", {
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

export default validateBearer;
