import express from "express";
const router = express.Router();
import { Anime, IAnime } from "../moodles/anime.js";
import AniList from "../moodles/anilist.js";
import { ErrorRes, SuccessRes, FailRes } from "../responses.js";
import newanimeitem from "../validators/anivalidator.js";
import updateanime from "../validators/updatevalidator.js";
import deleteanime from "../validators/deletevalidator.js";
import validateBearer from "../validators/bearervalidator.js";
import { validationResult } from "express-validator";
import generate from "../randomID.js";

// Log the date and request-type of each request
router.use((req, res, next) => {
  console.log("Time: ", Date.now(), "request-type: ", req.method);
  next();
});

// Get all current anime items from DB
router.get("/", async (req, res) => {
  if (req.header("content-type") !== "application/json")
    return res.json(new ErrorRes("Header must be application/json"));
  try {
    const docs = await Anime.find({});
    return res.send(docs);
  } catch (err) {
    console.log("error fetching items", err);
    return res.json(
      new ErrorRes("Something went horribly wrong, try again later")
    );
  }
});

// Get specific anime item for DB
router.get("/:id", async (req, res) => {
  if (req.header("content-type") !== "application/json")
    return res.json(new ErrorRes("Header must be application/json"));
  try {
    const specAnime: IAnime = await Anime.findOne({
      aniId: req.params.id,
    });

    if (specAnime === null) {
      return res.json(
        new FailRes("Fail", {
          aniId: "id not found",
        })
      );
    }
    return res.send(specAnime);
  } catch (err) {
    console.log("error fetching item by id", err);
    return res.json(
      new ErrorRes("Error", "Something went horribly wrong, try again later")
    );
  }
});

// Route to post new anime item
router.post("/", validateBearer, newanimeitem, async (req: any, res: any) => {
  try {
    if (req.header("content-type") !== "application/json")
      return res.json(new ErrorRes("Error", "Header must be application/json"));
  } catch (err) {
    console.log("There was an error parsing the JSON data", err);
    return res.json(
      new ErrorRes(
        "Error",
        'Something went horribly wrong while processing the JSON data, did you forget the ""?'
      )
    );
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(new FailRes("Fail", errors));
  }

  try {
    const anime = await Anime.findOne({
      title: req.body.title,
    });

    if (anime !== null) {
      return res.json(
        new FailRes("Fail", { title: "The title already exists" })
      );
    }
    var id = generate(5);
    const newID = await Anime.findOne({
      aniId: id,
    });

    if (newID !== null) {
      return res.json(new FailRes("Fail", { aniId: "ID already in use" }));
    }

    const result = await Anime.create({
      aniId: id,
      title: req.body.title,
      description: req.body.description,
    });
    return res.json(new SuccessRes("Success", result));
  } catch (err) {
    console.log("error adding new item ", err);
    res.json(
      new ErrorRes("Error", "Something went horribly wrong, try again later")
    );
  }
});

// Route for updating anime
router.put("/", validateBearer, updateanime, async (req: any, res: any) => {
  if (req.header("content-type") !== "application/json")
    return res.json(new ErrorRes("Error", "Header must be application/json"));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(new FailRes("Fail", errors));
  }
  try {
    const aniput: IAnime = await Anime.findOne({
      aniId: req.body.aniId,
    });
    if (aniput === null) {
      return res.json(new ErrorRes("Error", "the id was not found"));
    }
    let newani: { title: string; description: string };
    newani.title = aniput.title;
    newani.description = aniput.description;

    if (typeof req.body.title !== "undefined") {
      newani.title = req.body.title;
    }

    if (typeof req.body.description !== "undefined") {
      newani.description = req.body.description;
    }

    const result = await Anime.updateOne(
      { aniId: req.body.aniId },
      { title: newani.title, description: newani.description }
    );
    return res.json(new SuccessRes("Success", result));
  } catch (err) {
    console.log("error updating item", err);
    res.json(new ErrorRes("Something went horribly wrong, try again later"));
  }
});

// Route for deleting anime item
router.delete("/", validateBearer, deleteanime, async (req: any, res: any) => {
  const errors = validationResult(deleteanime);
  if (!errors.isEmpty) {
    return res.json(new FailRes("Fail", errors));
  }
  try {
    const aniput = await Anime.findOne({
      aniId: req.body.aniId,
    });
    if (aniput === null) {
      return res.json(new ErrorRes("the id was not found"));
    }
    const result = await Anime.deleteOne({ aniId: req.body.aniId });
    res.json(new SuccessRes("Success", result));
  } catch (err) {
    console.log("error deleting item", err);
    res.json(new ErrorRes("Something went horribly wrong, try again later"));
  }
});

export default router;
