const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: Number,
    status: {
      type: String,
      enum: ['Running', 'Will Expire', 'expired'],
      default: 'Running',
    },
    createdAt: Date,
    action: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('domain', domainSchema);
