const Order = require("../models/Order");

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { productName, quantity, price, discount, status, phone, state, city, notes } = req.body;

    // calculate total
    const total = quantity * price - discount;

    const order = new Order({
      productName,
      quantity,
      price,
      discount,
      total,
      status,
      phone,
      state,
      city,
      notes,
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const { productName, quantity, price, discount, status, phone, state, city, notes } = req.body;
    const total = quantity * price - discount;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { productName, quantity, price, discount, total, status, phone, state, city, notes },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
