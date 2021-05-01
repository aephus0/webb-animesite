const express = require("express");
const router = express.Router();
const Anime = require("../moodles/anime.js");
const { ErrorRes, SuccessRes, FailRes } = require("../responses.js");

router.use((req, res, next) => {
  console.log("Time: ", Date.now(), "request-type: ", req.method);
  next();
});

router.get("/", async (req, res) => {
  const docs = await Anime.find({});
  res.send(docs);
  console.log(docs);
});

router.get("/:id", async (req, res) => {
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
});

router.post("/newanime", async (req, res) => {
  if (req.body.title.trim() === "") {
    return res.json(
      new ErrorRes({
        title: "title cannot be emtpy",
      })
    );
  }
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
});

module.exports = router;
