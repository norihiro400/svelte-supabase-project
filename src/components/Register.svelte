<script lang="ts">
    import { navigate } from "svelte-routing";
    import { registerUser } from "../lib/auth";
    let email:string = "";
    let password:string = "";
    let errorMessage = "";

    async function handleSubmit(event:Event) {
        event.preventDefault();
        const { data,error } = await registerUser(email,password);
        if (error){
            console.log("サインアップエラー");
            errorMessage = error;
            return;
        }
        console.log("サインアップ成功");
        navigate("/login");

    }
</script>
<div class="flex items-center justify-center h-screen bg-gray-500">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs" on:submit={handleSubmit}>
      <div class=" mb-4">
        <p class=" text-center font-bold">新規登録</p>
      </div>
      {#if errorMessage}
        <p class=" text-red-500">{errorMessage}</p>
      {/if}
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email" bind:value={email}>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          パスワード
        </label>
        <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" bind:value={password}>
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          登録
        </button>
      </div>
    </form>
</div>

