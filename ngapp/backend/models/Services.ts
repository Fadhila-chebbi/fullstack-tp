
import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  nom: string;
  description: string;
}

const serviceSchema = new Schema<IService>(
  {
    nom: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Service = mongoose.model<IService>('Service', serviceSchema);

export default Service;
