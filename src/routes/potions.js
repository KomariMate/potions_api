const express = require("express");
const { eq } = require("drizzle-orm");

const db = require("../db/db");

const { potions } = require("../db/schema");
const { route } = require("./users");
const renderErrorHandler = require("../utilities/renderErrorHandler");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allPotions = await db.select().from(potions);
    return res.status(200).json(allPotions);
  } catch (err) {
    return renderErrorHandler(res, err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [entry] = await db
      .select()
      .from(potions)
      .where(eq(+req.params.id, potions.id));

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Potions Id Not Found!",
      });
    }

    return res.status(200).json(entry);
  } catch (err) {
    return renderErrorHandler(res, err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, effect, isDangerous } = req.body;
    if (!name)
      return res.status(404).json({ message: "'Name' field is required" });
    if (!effect)
      return res.status(404).json({ message: "'effect' field is required" });
    if (isDangerous === undefined)
      return res
        .status(404)
        .json({ message: "'isDangerous' field is required" });

    await db.insert(potions).values({
      name,
      effect,
      isDangerous,
    });
    return res.status(201).json({
      success: true,
      message: "Potion created successfully!",
    });
  } catch (err) {
    return renderErrorHandler(res, err);
  }
});

module.exports = router;
