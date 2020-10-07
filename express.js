// express server

const express = require("express");
const posts = require("../data/db");
const { findById, remove, update } = require("./data/db");

const router = express.Router();

// api endpoints ... MVP

//Post - submit change state of data
router.post("/api/posts", (req, res) => {
  if (req.body.title || req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }
  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

router.post("/api/posts/:id/comments", (req, res) => {
  if (!req.body.text) {
    res.status(400).json({
      message: "Please provide text for the comment",
    });
  } else {
    posts
      .insertComment(req.body)
      .then((comment) => {
        if (comment) {
          res.status(201).json(comment);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: "There was an error while saving the comment to the database",
        });
      });
  }
});

// Get - retrieve data
router.get("/api/posts", (req, res) => {
  posts
    .find({
      limit: req.query.limit,
      sortBy: req.query.sort,
    })
    .then((post) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/api/posts/:id", (req, res) => {
  posts;
  findById(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/api/posts/:id/comments", (req, res) => {
  posts;
  findById(req.params.id)
    .then((posts) => {
      if (!posts) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

// Delete - delete data
router.delete("/api/posts/:id", (req, res) => {
  posts;
  remove(req.params.id)
    .then((posts) => {
      if (posts) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "The post could not be removed" });
    });
});

// Put - target specific data
router.put("/api/posts/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(200).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }
  posts;
  update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json({ post });
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

// standard convention after the route has been fully configured
module.exports = router;
