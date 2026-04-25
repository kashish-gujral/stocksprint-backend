const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const query = { isActive: true };
    if (search)   query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    const products = await Product.find(query)
      .skip((page - 1) * limit).limit(Number(limit));
    const total = await Product.countDocuments(query);
    res.json({ products, total, page: Number(page) });
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ msg: 'Not found' });
  res.json(p);
};

exports.createProduct = async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.status(201).json(p);
  } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.updateProduct = async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ msg: 'Product deactivated' });
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: {
        _id: '$category',
        totalProducts: { $sum: 1 },
        totalStock:    { $sum: '$stock.qty' },
        avgPrice:      { $avg: '$price.selling' },
      }},
    ]);
    res.json(stats);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};