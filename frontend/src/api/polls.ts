import { api } from "./client";

export const createPoll = (payload: { title: string; images: string[] }) => api.post("/polls", payload);

export const getMyPolls = () => api.get("/polls/mine");

export const getPollById = (id: string) => api.get(`/polls/${id}`);
