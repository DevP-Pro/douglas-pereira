import mongoose, { Schema, Document } from 'mongoose';

export interface IMachine extends Document {
  name: string;
  status: string;
  createdAt: Date;
}

const machineSchema: Schema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const MachineModel = mongoose.model<IMachine>('Machine', machineSchema);

export default MachineModel;
