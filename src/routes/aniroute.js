const express = require("express");
const router = express.Router();
const Anime = require("../moodles/anime.js");
const AniList = require("../moodles/anilist.js");
const { ErrorRes, SuccessRes, FailRes } = require("../responses.js");
const newanimeitem = require("../validators/anivalidator.js");
const updateanime = require("../validators/updatevalidator.js");
const deleteanime = require("../validators/deletevalidator.js");
const validateBearer = require("../validators/bearervalidator.js");
const { validationResult } = require("express-validator");

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
    res.send(docs);
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
    const specAnime = await Anime.findOne({
      aniId: req.params.id,
    });

    if (specAnime === null) {
      return res.json(
        new FailRes({
          aniId: "id not found",
        })
      );
    }
    res.send(specAnime);
  } catch (err) {
    console.log("error fetching item by id", err);
    res.json(new ErrorRes("Something went horribly wrong, try again later"));
  }
});

// Route to post new anime item
router.post("/", validateBearer, newanimeitem, async (req, res) => {
  if (req.header("content-type") !== "application/json")
    return res.json(new ErrorRes("Header must be application/json"));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(new FailRes(errors));
  }
  try {
    const anime = await Anime.findOne({
      title: req.body.title,
    });

    if (anime !== null) {
      return res.json(new FailRes({ title: "The title already exists" }));
    }
    var id = Math.floor(Math.random() * 90000) + 10000;
    const newID = await Anime.findOne({
      aniId: id,
    });

    if (newID !== null) {
      return res.json(new FailRes({ aniId: "ID already in use" }));
    }

    const result = await Anime.create({
      aniId: id,
      title: req.body.title,
      description: req.body.description,
    });
    return res.json(new SuccessRes(result));
  } catch (err) {
    console.log("error adding new item ", err);
    res.json(new ErrorRes("Something went horribly wrong, try again later"));
  }
});

// Route for updating anime
router.put("/", validateBearer, updateanime, async (req, res) => {
  if (req.header("content-type") !== "application/json")
    return res.json(new ErrorRes("Header must be application/json"));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(new FailRes(errors));
  }
  try {
    const aniput = await Anime.findOne({
      aniId: req.body.aniId,
    });
    if (aniput === null) {
      return res.json(new ErrorRes("the id was not found"));
    }
    var newani = {};
    newani.title = aniput.title;
    newani.description = aniput.description;

    if (typeof req.body.title !== "null" || "undefined") {
      newani.title = req.body.title;
    }
    if (typeof req.body.description !== "null" || "undefined") {
      newani.description = req.body.description;
    }

    const result = await Anime.updateOne(
      { aniId: req.body.aniId },
      { title: newani.title, description: newani.description }
    );
    return res.json(new SuccessRes(result));
  } catch (err) {
    console.log("error updating item", err);
    res.json(new ErrorRes("Something went horribly wrong, try again later"));
  }
});

// Route for deleting anime item
router.delete("/", validateBearer, deleteanime, async (req, res) => {
  const errors = validationResult(deleteanime);
  if (!errors.isEmpty) {
    return res.json(new FailRes(errors));
  }
  try {
    const aniput = await Anime.findOne({
      aniId: req.body.aniId,
    });
    if (aniput === null) {
      return res.json(new ErrorRes("the id was not found"));
    }
    const result = await Anime.deleteOne({ aniId: req.body.aniId });
    res.json(new SuccessRes(result));
  } catch (err) {
    console.log("error deleting item", err);
    res.json(new ErrorRes("Something went horribly wrong, try again later"));
  }
});

module.exports = router;
