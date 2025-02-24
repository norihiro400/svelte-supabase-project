import { writable } from "svelte/store";

export const todos = writable<{ id: number; title: string; detail: string }[]>([]);
export const num_contest = writable<number>(0);