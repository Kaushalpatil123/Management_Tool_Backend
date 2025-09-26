// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const leadRoutes = require("./routes/leadRoutes")
const quoteRoutes = require("./routes/quoteRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - Body:`, req.body);
  next();
});


app.use("/api/quotes", quoteRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/orders", orderRoutes);


// Start server after DB connects
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
