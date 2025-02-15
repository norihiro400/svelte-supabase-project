import { writable } from "svelte/store";

export const todos = writable<{ id: number; title: string; detail: string }[]>([]);