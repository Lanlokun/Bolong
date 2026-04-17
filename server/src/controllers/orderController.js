const { Order, OrderItem, Product } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: "Order items are required" });
    }

    let totalPrice = 0;

    const productIds = items.map((item) => item.product_id);
    const products = await Product.findAll({ where: { id: productIds } });

    const productMap = {};
    products.forEach((product) => {
      productMap[product.id] = product;
    });

    for (const item of items) {
      const product = productMap[item.product_id];
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product_id} not found` });
      }
      totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({
      user_id: req.user.id,
      total_price: totalPrice,
      status: "pending",
    });

    for (const item of items) {
      const product = productMap[item.product_id];

      await OrderItem.create({
        order_id: order.id,
        product_id: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
};