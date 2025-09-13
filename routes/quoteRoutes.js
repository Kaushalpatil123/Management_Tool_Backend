const express = require("express");
const router = express.Router();
const {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
} = require("../controller/quoteController");

router.post("/", createQuote);         // Create new quote
router.get("/", getQuotes);            // Get all quotes
router.get("/:id", getQuoteById);      // Get single quote
router.put("/:id", updateQuote);       // Update quote
router.delete("/:id", deleteQuote);    // Delete quote

module.exports = router;
