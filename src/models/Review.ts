import { Schema, Document, model } from 'mongoose';

type ReviewDTO = Document & {};

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
  }
);

const Review = model<ReviewDTO>('Review', ReviewSchema);

export default Review;
