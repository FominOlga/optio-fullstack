import { Request, Response } from "express";
import { Poll } from "../models/Poll";

export const createPoll = async (req: Request, res: Response) => {
    const { title, images } = req.body;

    if (!title || !Array.isArray(images) || images.length !== 2) {
        return res.status(400).json({
            message: "Title and two images are required",
        });
    }

    const poll = await Poll.create({
        title,
        images,
        user: req.user!.userId,
    });

    res.status(201).json({ data: poll });
};

export const getMyPolls = async (req: Request, res: Response) => {
    const polls = await Poll.find({
        user: req.user!.userId,
    }).sort({ createdAt: -1 });

    res.json({ data: polls });
};

export const getPollById = async (req: Request, res: Response) => {
    const poll = await Poll.findOne({
        _id: req.params.id,
        user: req.user!.userId,
    });

    if (!poll) {
        return res.status(404).json({
            message: "Poll not found",
        });
    }

    res.json({ data: poll });
};
