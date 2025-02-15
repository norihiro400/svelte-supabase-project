<script lang="ts">
    import { onMount } from "svelte";
    import { fetchTodo } from "../lib/api";
    import TodoItem from "./TodoItem.svelte";
    import { todos } from "../lib/store";
    
    onMount(async () => {
        todos.set(await fetchTodo()); // ✅ store にデータをセット
    });
</script>

<table class=" mx-40">
    <thead>
        <tr>
            <th>タイトル</th>
            <th>詳細</th>
        </tr>
    </thead>
    <tbody>
        {#each $todos as todo(todo.id)}
        <TodoItem {todo}/>
        {/each}
    </tbody>       
</table>



