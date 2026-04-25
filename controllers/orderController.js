const Order = require('../models/Order');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
  try {
    const { customer, items, deliverySlot } = req.body;
    let totalAmount = 0;
    const enriched = [];

    for (const item of items) {
      const p = await Product.findById(item.product);
      if (!p || !p.isActive) return res.status(400).json({ msg: `Product ${item.product} unavailable` });
      if (p.stock.qty < item.qty) return res.status(400).json({ msg: `Insufficient stock for ${p.name}` });

      // Atomic stock deduction
      await Product.findByIdAndUpdate(item.product, { $inc: { 'stock.qty': -item.qty } });
      totalAmount += p.price.selling * item.qty;
      enriched.push({ product: p._id, name: p.name, qty: item.qty, price: p.price.selling });
    }

    const order = await Order.create({
      customer, items: enriched, totalAmount, deliverySlot,
      statusHistory: [{ status: 'pending', note: 'Order placed' }],
    });
    res.status(201).json(order);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getOrders = async (req, res) => {
  const { status } = req.query;
  const query = status ? { status } : {};
  const orders = await Order.find(query).populate('items.product', 'name sku').sort('-createdAt');
  res.json(orders);
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        $push: { statusHistory: { status, note } },
      },
      { new: true }
    );
    res.json(order);
  } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.getRevenue = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const data = await Order.aggregate([
      { $match: { status: 'delivered', createdAt: { $gte: thirtyDaysAgo } } },
      { $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        revenue: { $sum: '$totalAmount' },
        orders:  { $sum: 1 },
      }},
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};