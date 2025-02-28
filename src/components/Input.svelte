<script lang="ts">
    import { addResult, getUserInfo, updateNumContest } from "../lib/api";
    import { getCurrentUser } from "../lib/auth";
    import { max_score, num_contest } from "../lib/store";
    import { updateMaxscore } from "../lib/api";
    let scores: (number)[] = Array(7).fill(null);
    let contest_name: string = "";
    let contest_date: string = "";
    let sum:number = 0;
    let errorMessage:string = "";
    
    async function handleSubmit(event:Event) {
        event.preventDefault();
        console.log("呼ばれました");
        console.log(
            contest_name,contest_date,scores
        );
        if (contest_name.trim()==="" || contest_date.trim()===""){
            errorMessage = "空欄は許可されていません";
            return errorMessage;
        }
        if (scores.some(score => score === null)){
            errorMessage = "空欄は許可されていません";
            return errorMessage;
        }
        
        const user = await getCurrentUser();
        if (!user){
            console.log("取得できるユーザーがないです");
        }else{
            for (let i = 0; i < scores.length;i++){
                sum+=scores[i];
            }
            await addResult(contest_name,contest_date,scores,user.id,sum)
            await updateNumContest(user.id);
            await updateMaxscore(sum,user.id);
            contest_name = "";
            contest_date = "";
            scores = Array(7).fill(null);
            const userInfo = await getUserInfo(user.id);
            if (userInfo){
                max_score.set(userInfo.data.max_score);
                num_contest.set(userInfo.data.num_contest);
            }
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
            <div class="flex justify-center flex-col space-y-2">
                <p class=" text-red-600 font-bold">{errorMessage}</p>
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
