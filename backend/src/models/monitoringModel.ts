import mongoose from 'mongoose';

const monitoringSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Machine',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Monitoring = mongoose.model('Monitoring', monitoringSchema);

export default Monitoring;
