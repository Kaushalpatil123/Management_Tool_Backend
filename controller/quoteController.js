const Quote = require("../models/Quote");

// Create new Quote
exports.createQuote = async (req, res) => {
  try {
    const { client, year, status, date, expireDate, note, items } = req.body;

    // Calculate totals
    let subTotal = 0;
    items.forEach((i) => {
      subTotal += i.qty * i.price;
    });
    const tax = 0; // You can extend this
    const total = subTotal + tax;

    const newQuote = new Quote({
      client,
      year,
      status,
      date,
      expireDate,
      note,
      items,
      subTotal,
      tax,
      total,
    });

    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Quotes
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Quote
exports.getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Quote
exports.updateQuote = async (req, res) => {
  try {
    const { client, year, status, date, expireDate, note, items } = req.body;

    let subTotal = 0;
    items.forEach((i) => {
      subTotal += i.qty * i.price;
    });
    const tax = 0;
    const total = subTotal + tax;

    const updatedQuote = await Quote.findByIdAndUpdate(
      req.params.id,
      { client, year, status, date, expireDate, note, items, subTotal, tax, total },
      { new: true }
    );

    if (!updatedQuote) return res.status(404).json({ message: "Quote not found" });

    res.status(200).json(updatedQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Quote
exports.deleteQuote = async (req, res) => {
  try {
    const deleted = await Quote.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Quote not found" });
    res.status(200).json({ message: "Quote deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
