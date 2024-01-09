const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /.+\@student.nitw.ac.in+/,
      unique: true,
    },
    password: { type: String, required: true },
    rollNo: {
      type: String,
      match: /^[0-9]{2}MCF1R[0-9]{2,}$/,
      unique: true,
    },
    role: {
      type: String,
      enum: ['student', 'placementCoordinator', 'admin'],
      default: 'student',
    },
    isVerified: { type: Boolean, default: false },
    pg: {
      cgpa: { type: Number },
      percentage: { type: Number },
    },
    ug: {
      cgpa: { type: Number },
      percentage: { type: Number },
    },
    twelth: {
      cgpa: { type: Number },
      percentage: { type: Number },
    },
    tenth: {
      cgpa: { type: Number },
      percentage: { type: Number },
    },
    placed: { type: Boolean, default: false },
    placedAt: {
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
      location: { type: String },
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
