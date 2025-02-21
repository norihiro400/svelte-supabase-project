<script lang="ts">
  import TodoList from "./components/TodoList.svelte";
  import TodoForm from "./components/TodoForm.svelte";
  import { Route,Router,Link } from "svelte-routing";
    import LoginForm from "./components/LoginForm.svelte";
</script>

<Router>
  <Route path="">
    <div class=" container ">
      <h2 class="text-center my-1 text-gray-950 font-bold text-2xl">Todo App</h2>
      <TodoForm/>
      <TodoList/> 
    </div> 
  </Route>
  <Route path="login">
    <LoginForm/>
  </Route>
</Router>





