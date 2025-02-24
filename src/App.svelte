<script lang="ts">
  import { Route,Router,Link, navigate } from "svelte-routing";
  import LoginForm from "./components/LoginForm.svelte";
  import { onMount } from "svelte";
  import { getCurrentUser } from "./lib/auth";
  import Register from "./components/Register.svelte";
  import Navbar from "./components/Navbar.svelte";
    import Analysis from "./components/Analysis.svelte";
    import Input from "./components/Input.svelte";
    import Detail from "./components/Detail.svelte";
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
    <h2 class="text-center my-7 text-amber-500 drop-shadow text-2xl font-bold">At Corder スコア管理</h2>
    <Navbar/>
    <Analysis/>
    <Input/>
  </Route>
  <Route path="/record">
    <h2 class="text-center my-7 text-amber-500 drop-shadow text-2xl font-bold">At Corder スコア管理</h2>
    <Navbar/>
    <Detail/>
  </Route>
  <Route path="login">
    <LoginForm/>
  </Route>
  <Route path="register">
    <Register/>
  </Route>

</Router>





