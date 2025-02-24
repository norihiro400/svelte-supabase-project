import { writable } from "svelte/store";

export const todos = writable<{ id: number; title: string; detail: string }[]>([]);
export const num_contest = writable<number>(0);
export const max_score = writable<number>(0);
