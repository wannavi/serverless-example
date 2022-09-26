const express = require("express");
const _ = require("lodash");

const Comment = require("../models/comment");

const router = express.Router();

router.get("/", async (req, res) => {
  const { lastKey, limit } = req.query;
  try {
    const comments = await Comment.findAll(lastKey, +limit);

    return res.status(200).json({
      success: true,
      data: {
        comments,
        lastKey: comments.lastKey?.id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      throw new Error("comment not found");
    }

    return res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { content } = req.body;
  try {
    const comment = await Comment.new(content);

    return res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: error.message,
    });
  }
});

module.exports = router;
