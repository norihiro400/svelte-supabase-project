<script lang="ts">
    import { addTodo, fetchTodo } from "../lib/api";
    import { todos } from "../lib/store";
    export let todo:string = "";
    export let detail:string = "";
    async function handleSubmit(event:Event) {
        event.preventDefault();
        if (todo.trim() === "" || detail.trim() === "") return;

        await addTodo(todo,detail);
        todo = "";
        detail = "";
        todos.set(await fetchTodo());
    }
</script>
<div>
    <form class="text-center" on:submit={handleSubmit}>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>Todoを入力</label>
        <input type="text" bind:value={todo} class=" shadow-md">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>詳細を入力</label>
        <input type="text" bind:value={detail}>
        <button type="submit" class=" shadow-md bg-blue-500">追加</button>
    </form>
</div>
