const Order = require('../models/Order');

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res, next) => {
  try {
    const { items, totalPrice, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      res.status(400);
      throw new Error('No order items provided');
    }

    if (!shippingAddress) {
      res.status(400);
      throw new Error('Shipping address is required');
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
      shippingAddress,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders/mine
 * @access  Private
 */
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private (owner or admin)
 */
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    // Only the order owner or an admin can view the order
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      res.status(403);
      throw new Error('Not authorized to view this order');
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders, getOrderById };
