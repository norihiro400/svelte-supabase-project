<script lang="ts">
    import { addResult, updateNumContest } from "../lib/api";
    import { getCurrentUser } from "../lib/auth";
    let scores: (number | null)[] = Array(7).fill(null);
    let contest_name: string = "";
    let contest_date: string = "";
    
    async function handleSubmit(event:Event) {
        event.preventDefault();
        console.log("呼ばれました");
        console.log(
            contest_name,contest_date,scores
        );
        if (contest_name.trim()==="" || contest_date.trim()==="") return;
        if (scores.some(score => score === null)) return;
        const user = await getCurrentUser();
        if (!user){
            console.log("取得できるユーザーがないです");
        }else{
            await addResult(contest_name,contest_date,scores,user.id)
            await updateNumContest(user.id);
            contest_name = "";
            contest_date = "";
            scores = Array(7).fill(null);
        }
    }
</script>

<div class="flex justify-center p-6">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-center mb-4">結果を入力</h1>


        <form class="space-y-4" on:submit={handleSubmit}>
            <div>
                <label for="contest_name" class="block font-semibold mb-1">コンテスト名</label>
                <input 
                    type="text" 
                    id="contest_name" 
                    bind:value={contest_name} 
                    placeholder="コンテスト名を入力" 
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
            </div>

            <!-- 日程 -->
            <div>
                <label for="date" class="block font-semibold mb-1">日程</label>
                <input 
                    type="date" 
                    id="date" 
                    bind:value={contest_date} 
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
            </div>

            <!-- 各問題のスコア入力 -->
            {#each ['A', 'B', 'C', 'D', 'E', 'F','G'] as problem, i}
                <div>
                    <label for={"score-" + i} class="block font-semibold mb-1">
                        {problem}問題
                    </label>
                    <input 
                        type="number" 
                        id={"score-" + i} 
                        bind:value={scores[i]} 
                        placeholder="点数を入力" 
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                </div>
            {/each}

            <!-- 送信ボタン -->
            <div class="flex justify-center">
                <button 
                    type="submit" 
                    class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md 
                           shadow hover:bg-blue-500 transition-all"
                >
                    保存する
                </button>
            </div>
        </form>
    </div>
</div>
