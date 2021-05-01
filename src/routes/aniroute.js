const express = require("express");
const router = express.Router();
const Anime = require("../moodles/anime.js");
const { ErrorRes, SuccessRes, FailRes } = require("../responses.js");
const newanimeitem = require("../validators/anivalidator.js");
const updateanime = require("../validators/updatevalidator.js");
const { validationResult } = require("express-validator");

router.use((req, res, next) => {
  console.log("Time: ", Date.now(), "request-type: ", req.method);
  next();
});

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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

router.post("/newanime", newanimeitem, async (req, res) => {
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

router.put("/updateanime", updateanime, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(new FailRes(errors));
  }
  try {
    const aniput = Anime.findOne({
      aniId: req.body.aniId,
    });
    if (aniput === null) {
      return res.json(new ErrorRes("the id was not found"));
    }
    const result = await Anime.updateOne(
      { aniId: req.body.aniId },
      { title: req.body.title, description: req.body.description }
    );
    return res.json(new SuccessRes(result));
  } catch (err) {
    console.log("error updating item", err);
    res.json(new ErrorRes("Something went horribly wrong, try again later"));
  }
});

module.exports = router;
