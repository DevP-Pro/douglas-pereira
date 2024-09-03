import mongoose, { Document, Schema } from 'mongoose';

interface ISensor extends Document {
  name: string;
  type: string;
  value: number;
  monitoring: mongoose.Schema.Types.ObjectId;
  uniqueId: string; // Adiciona o campo uniqueId ao modelo
  createdAt: Date;
  updatedAt: Date;
}

const sensorSchema = new Schema<ISensor>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: Number, required: true },
    monitoring: { type: Schema.Types.ObjectId, ref: 'Monitoring', required: true },
    uniqueId: { type: String, unique: true }, // Garante que o campo seja único
  },
  { timestamps: true }
);

const Sensor = mongoose.model<ISensor>('Sensor', sensorSchema);

export default Sensor;
