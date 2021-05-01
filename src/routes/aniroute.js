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

router.post("/newanime", async (req, res) => {
  const anime = await Anime.findOne({
    title: req.body.title,
  });

  if (anime !== null) {
    return res.json(new FailRes({ title: "The title already exists" }));
  }
  /*const newAnime = new Anime({
    title: req.body.title,
    description: req.body.description,
  });
  const result = await newAnime.save();
  console.log(new SuccessRes(result));*/
  const result = await Anime.create({
    title: req.body.title,
    description: req.body.description,
  });
  return res.json(new SuccessRes(result));
});

module.exports = router;
