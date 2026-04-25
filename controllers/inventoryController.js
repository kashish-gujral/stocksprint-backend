const Product = require('../models/Product');

exports.getLowStock = async (req, res) => {
  const products = await Product.find({
    isActive: true,
    $expr: { $lte: ['$stock.qty', '$stock.threshold'] },
  });
  res.json(products);
};

exports.getSummary = async (req, res) => {
  const summary = await Product.aggregate([
    { $match: { isActive: true } },
    { $group: {
      _id: null,
      totalProducts:  { $sum: 1 },
      totalStockValue: { $sum: { $multiply: ['$stock.qty', '$price.selling'] } },
      outOfStockCount: { $sum: { $cond: [{ $eq: ['$stock.qty', 0] }, 1, 0] } },
    }},
  ]);
  res.json(summary[0]);
};

exports.restock = async (req, res) => {
  try {
    const { qty } = req.body;
    const p = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { 'stock.qty': qty } },
      { new: true }
    );
    res.json(p);
  } catch (err) { res.status(400).json({ msg: err.message }); }
};