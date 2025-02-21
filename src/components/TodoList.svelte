<script lang="ts">
    import { onMount } from "svelte";
    import { fetchTodo } from "../lib/api";
    import TodoItem from "./TodoItem.svelte";
    import { todos } from "../lib/store";
    
    onMount(async () => {
        todos.set(await fetchTodo()); // ✅ store にデータをセット
    });
</script>

<table class=" w-3/4 mx-auto mt-10 border border-gray-300 shadow-lg">
    <thead class=" bg-blue-500 text-white">
        <tr>
            <th class="px-4 py-2">タイトル</th>
            <th class="px-4 py-2">詳細</th>
            <th class="px-4 py-2">操作</th>
        </tr>
    </thead>
    <tbody class=" bg-white">
        {#each $todos as todo(todo.id)}
        <TodoItem {todo}/>
        {/each}
    </tbody>       
</table>



