const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  sku:        { type: String, required: true, unique: true },
  category:   { type: String, required: true },
  price: {
    mrp:     { type: Number, required: true },
    selling: { type: Number, required: true },
  },
  stock: {
    qty:       { type: Number, default: 0 },
    threshold: { type: Number, default: 10 },
  },
  tags:       [String],
  expiryDate: Date,
  images:     [String],
  isActive:   { type: Boolean, default: true },
}, { timestamps: true });

// Virtual fields
productSchema.virtual('isLowStock').get(function () {
  return this.stock.qty <= this.stock.threshold;
});
productSchema.virtual('discountPercent').get(function () {
  return Math.round(((this.price.mrp - this.price.selling) / this.price.mrp) * 100);
});

productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);