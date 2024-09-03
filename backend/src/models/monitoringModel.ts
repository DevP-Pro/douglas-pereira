import mongoose from 'mongoose';

const monitoringSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Machine',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Monitoring = mongoose.model('Monitoring', monitoringSchema);

export default Monitoring;
