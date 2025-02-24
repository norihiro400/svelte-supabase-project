<script lang="ts">
    import { Link, navigate } from "svelte-routing";
    import { signOut } from "../lib/auth";

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
<div>
    <nav class="backdrop-blur-md  bg-slate-400/15 border border-white/20 shadow-md w-11/12 max-w-6xl mx-auto p-3 rounded-lg flex items-center justify-between my-3">
        
        <!-- ロゴ部分 -->
        <div class=" text-orange-400 font-bold shadow-md">
            <p>スコア管理</p>
        </div>
        
        <!-- ナビゲーションメニュー -->
        <div class="flex space-x-8">
            <Link to="/" class="text-slate-700 hover:underline font-bold">
                ホーム
            </Link>
            <Link to="/record" class="text-slate-700 hover:underline font-bold">
                コンテスト履歴
            </Link>
            <Link to="/comunity" class="text-slate-700 hover:underline font-bold">
                コミュニティ
            </Link>
        </div>
        
        <!-- ボタンなどの追加要素 -->
        <div>
            <button on:click={handlesignOut} class="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-50 transition-all">
                ログアウト
            </button>
        </div>
    </nav>
</div>




