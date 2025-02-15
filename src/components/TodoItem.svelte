<script lang="ts">
    import { deleteTodo, fetchTodo } from "../lib/api";
    import { todos } from "../lib/store";
    export let todo: {id:number;title:string;detail:string};
    async function deletebutton(event:Event,id:number){
        event.preventDefault();
        await deleteTodo(id);
        todos.set(await fetchTodo());
    }
</script>

<tr>
    <td class="border px-4 py-2">{todo.title}</td>
    <td class="border px-4 py-2">{todo.detail}</td>
    <td>
        <form on:submit={(event) => {deletebutton(event,todo.id)}}>
            <button type="submit" class=" bg-red-700">完了</button>
        </form>
    </td>
</tr>
