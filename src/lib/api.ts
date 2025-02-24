import { supabase } from "./supabaseClient";

//結果を入力
export async function addResult(contest_name:string,contest_date:string,score:(number|null)[],user_id:string) {
    const {data,error} = await supabase.from("score").insert([{contest_name,contest_date,score,user_id}]).select();
    if (error){
        console.log("追加エラー");
    }
    return data;
}

//ユーザー情報を登録
export async function registerUserInfo(username:string,user_id:string) {
    const {data,error} = await supabase.from("user_info").insert([{username,num_contest:0,max_score:0,user_id}])
    if (error){
        console.log("エラー");
        return {error:error.message};
    }
    return {data};
}

//参加回数更新
export async function updateNumContest(user_id:string) {
    const {data, error } = await supabase.rpc('increment_num_contest', { user_id_param: user_id });
    if (error){
        console.log("インクリメントエラー",error);
    }
    console.log("成功",{data,error});
    return {data};
}
//最高点数更新
export async function updateMaxscore(new_score:number,user_id:string) {
    const {data,error} = await supabase.rpc('update_max_score',{new_score:new_score,user_id_param:user_id});
    if (error){
        console.log("更新エラー");
    }
    console.log("成功");
    return {data};
}

//ユーザー情報テーブルの情報を取得(ユーザーidごとに)
export async function getUserInfo(user_id:string) {
    const {data,error} = await supabase.from("user_info").select('*').eq('user_id',user_id).single();
    if (error){
        console.log("取得エラー");
        return {error:error.message};
    }
    console.log("ユーザー情報を取得成功");
    return {data};
}

//ユーザーの履歴を取得
export async function getRecordById(user_id:string) {
    const {data,error} = (await supabase.from('score').select('*').eq('user_id',user_id));
    if (error){
        console.log('取得エラー');
        return {error:error.message};
    }
    console.log('成功');
    return {data};
}