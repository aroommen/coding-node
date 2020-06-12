const express = require("express");
const Joi = require("@hapi/joi");

const Pet = require("../models/pets");
const { validateBody } = require("../middlewares/route");

const router = express.Router();

// Getting a pet by name
router.get("/:petName", async (req, res, next) => {
  try {
    const petFound = await Pet.findOne({ name: req.params.petName });
    if (petFound) {
      res.status(200).json({ petFound });
    } else {
      res.status(404).json("Pet not found");
    }
  } catch (e) {
    next(e);
  }
});

// Deleting a pet by name
router.delete("/:petName", async (req, res, next) => {
  try {
    const petFound = await Pet.findOneAndDelete({ name: req.params.petName });
    if (petFound) {
      res.status(200).json({ petFound });
    } else {
      res.status(404).json("Pet not found");
    }
  } catch (e) {
    next(e);
  }
});

// Creating a new pet
router.post(
  "/",
  validateBody(
    Joi.object().keys({
      name: Joi.string().required().description("Name of pet"),
      age: Joi.number().integer().required().description("Age of pet"),
      color: Joi.string().required().description("Color of pet"),
    }),
    {
      stripUnknown: true,
    }
  ),
  async (req, res, next) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
