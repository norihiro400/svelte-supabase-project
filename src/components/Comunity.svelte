<script lang="ts">
    import { onMount } from "svelte";
    import { getAllScore } from "../lib/api";

    type UserInfo = {
        username:string;
    }
    type allScore = {
        contest_name:string;
        contest_date:string;
        score:number[];
        sum:number;
        user_name:string;
    }
    let records:allScore[] = [];
    let problist:string[] = ["A","B","C","D","E","F","G"]
    let loading:boolean = true;
    let errorMessage:string = "";

    onMount(async () => {
    const allScore = await getAllScore();
    
    if (allScore?.data) {
        // 🔥 user_name を「user_info」から取り出して設定する！
        records = allScore.data.map((record) => ({
            ...record,
            // @ts-ignore
            user_name: record.user_info?.username || "不明"
        })) as allScore[];
        console.log(allScore.data,"konn");

    } else {
        console.log("取得エラー");
        errorMessage = "読み取りに失敗しました";
    }
    loading = false;
    
});

</script>
<div class=" flex justify-center p-6">
    <div class="w-3/4 p-6 bg-white/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
        <h2 class="text-center font-semibold text-slate-800 mb-4">コンテスト履歴</h2>

        {#if loading}
            <p class="text-center text-gray-500">読み込み中...</p>
        {:else if errorMessage}
            <p class="text-center text-red-500">{errorMessage}</p>
        {:else if records.length === 0}
            <p class="text-center text-gray-500">履歴がまだありません。</p>
        {:else}
            <table class="w-full border-collapse">
                <thead>
                    <tr class="bg-gray-100">
                        <th class=" p-2 border">ユーザー名</th>
                        <th class="p-2 border">コンテスト名</th>
                        <th class="p-2 border">日付</th>
                        <th class="p-2 border">スコア</th>
                        <th class=" p-2 border">合計</th>
                    </tr>
                </thead>
                <tbody>
                    {#each records as record}
                        <tr class="bg-white odd:bg-gray-50">
                            <td class=" p-2 border">{record.user_name}</td>
                            <td class="p-2 border">{record.contest_name}</td>
                            <td class="p-2 border">{record.contest_date}</td>
                            <td class="p-2 border">
                                {#each record.score as score, index}
                                    {#if score !== null}
                                        <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-md mr-1">
                                            {problist[index]}: {score}
                                        </span>
                                    {:else}
                                        <span class="inline-block bg-gray-100 text-gray-500 px-2 py-1 rounded-md mr-1">
                                            {index + 1}: N/A
                                        </span>
                                    {/if}
                                {/each}
                            </td>
                            <td class=" p-2 border">{record.sum}</td>
                            
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>