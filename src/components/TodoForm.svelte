<script lang="ts">
    import { addTodo, fetchTodo } from "../lib/api";
    import { todos } from "../lib/store";
    import { getCurrentUser, signOut } from "../lib/auth";
    import { navigate } from "svelte-routing";
    export let todo:string = "";
    export let detail:string = "";

    async function handleSubmit(event:Event) {
        event.preventDefault();
        if (todo.trim() === "" || detail.trim() === "") return;
        const user = await getCurrentUser();
        if (!user){
            console.log("ユーザーを取得できなかったです");
        }else{
            await addTodo(todo,detail,user.id);
            todo = "";
            detail = "";
            todos.set(await fetchTodo());
        }

    }
    async function handlesignOut(event:Event) {
        event.preventDefault();
        const { error } = await signOut();
        if (!error){
            navigate("/login");
        }else{
            console.log("ログアウトエラー",error)
        }
        
    }
</script>
<div class=" container flex items-center justify-center relative">
    <div class="">
        <form class="text-center justify-center" on:submit={handleSubmit}>
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label>Todoを入力</label>
            <input type="text" bind:value={todo} class=" shadow-md rounded mx-3">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label>詳細を入力</label>
            <input type="text" bind:value={detail} class=" shadow-sd rounded mx-3">
            <button type="submit" class=" shadow-md bg-blue-500 rounded px-3 py-1">追加</button>
        </form>
        <button on:click={handlesignOut} class="absolute top-0 right-10 px-4 py-2 bg-red-500 text-white rounded shadow-md">ログアウト</button>
    </div>

</div>
