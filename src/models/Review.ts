import { Schema, model } from 'mongoose';
import { IReview } from '../interfaces/IReview';

const ReviewSchema = new Schema(
  {
    psychologist: {
      type: Schema.Types.ObjectId,
      ref: 'Psychologist',
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Review = model<IReview>('Review', ReviewSchema);

export default Review;
