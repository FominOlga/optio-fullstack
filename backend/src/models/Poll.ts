import { Schema, model, Types } from "mongoose";

export interface Poll {
    title: string;
    images: string[];
    user: Types.ObjectId;
    createdAt: Date;
}

const pollSchema = new Schema<Poll>(
    {
        title: {
            type: String,
            required: true,
        },

        images: {
            type: [String],
            required: true,
            validate: [(v: string[]) => v.length === 2],
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

export const Poll = model<Poll>("Poll", pollSchema);
