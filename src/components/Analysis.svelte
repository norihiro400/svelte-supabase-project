<script lang="ts">
    import { Link } from "svelte-routing";
    import { getUserInfo } from "../lib/api";
    import { getCurrentUser } from "../lib/auth";
    import { onMount } from "svelte";
    import { num_contest } from "../lib/store";
    export let max_score:number = 0;
    let userName:string = "取得中...";

    onMount(async ()=>{
        const user = await getCurrentUser();
        if (user){
            const userinfo = await getUserInfo(user.id);
            if (userinfo){
                userName = userinfo.data.username;
                num_contest.set(userinfo.data.num_contest);
            }
        }
    })

</script>

<div class="flex justify-center p-6">
    <div class="w-1/2 p-6 bg-white/30 backdrop-blur-md border border-white/20 
                rounded-xl shadow-lg">
        
        <h2 class="text-center font-semibold text-slate-800 mb-4">分析</h2>
        
        <div class="bg-gradient-to-r from-purple-400 to-blue-400 p-3 rounded-lg text-white shadow-inner my-3">
            <p class="text-lg font-medium text-center">
                ユーザー名: <span class=" font-bold">{userName}</span> 
            </p>
        </div>
        <div class="bg-gradient-to-r from-purple-400 to-blue-400 p-3 rounded-lg text-white shadow-inner my-3">
            <p class="text-lg font-medium text-center">
                コンテスト参加回数: <span class="text-3xl font-bold">{$num_contest}</span> 回
            </p>
        </div>
        <div class="bg-gradient-to-r from-purple-400 to-blue-400 p-3 rounded-lg text-white shadow-inner my-3">
            <p class="text-lg font-medium text-center">
                最高点数: <span class="text-3xl font-bold">{max_score}</span> 点
            </p>
        </div>
        <div class=" flex justify-end">
            <Link to="/anadetail" class="hover:underline">詳細</Link>
        </div>
    </div>
</div>
