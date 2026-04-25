const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    name:    String,
    phone:   String,
    address: String,
  },
  items: [{
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name:     String,
    qty:      Number,
    price:    Number,
  }],
  totalAmount:   { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'],
    default: 'pending',
  },
  statusHistory: [{
    status:    String,
    updatedAt: { type: Date, default: Date.now },
    note:      String,
  }],
  deliverySlot:  String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);