<script lang="ts">
  import TodoList from "./components/TodoList.svelte";
  import TodoForm from "./components/TodoForm.svelte";
  import { Route,Router,Link, navigate } from "svelte-routing";
  import LoginForm from "./components/LoginForm.svelte";
  import { onMount } from "svelte";
    import { getCurrentUser } from "./lib/auth";
    import Register from "./components/Register.svelte";
  onMount(async() =>{
    const user = await getCurrentUser();
    if (!user){
      console.log("ログインしてないユーザーです");
      navigate("/login");
    }
  })
</script>

<Router>
  <Route path="">
    <div class=" container ">
      <h2 class="text-center my-10 text-gray-950 font-bold text-2xl ">Todo App</h2>
      <TodoForm/>
      <TodoList/> 
    </div> 
  </Route>
  <Route path="login">
    <LoginForm/>
  </Route>
  <Route path="register">
    <Register/>
  </Route>

</Router>





