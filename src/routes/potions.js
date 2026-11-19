const express = require("express");
const { eq } = require("drizzle-orm");

const db = require("../db/db");

const { potions } = require("../db/schema");
const { route } = require("./users");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allPotions = await db.select().from(potions);
    return res.status(200).json(allPotions);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR!",
    });
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
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR!",
    });
  }
});

module.exports = router;
