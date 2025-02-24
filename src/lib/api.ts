import { supabase } from "./supabaseClient";

//Todo一覧を取得
export async function fetchTodo(){
    let {data,error} = await supabase.from("todo").select('*');
    if (error){
        console.log("データ取得エラー",error);
    }
    console.log("fetchしたやで",error);
    return data || [];
}
//指定したuser_idのタスクを取得
export async function fetchTodoByUserId(user_id:string) {
    let {data,error} = await supabase.from("todo").select("*").eq("user_id",user_id);
    if (error){
        console.log("取得エラー");
    }
    console.log("取得成功");
    return data || [];
    
}
//タスク作成
export async function addTodo(title:string,detail:string,user_id:string){
    const {data,error} = await supabase.from("todo").insert([{title,detail,user_id}]).select();
    if(error){
        console.log("追加エラー",error);
    }
    return data;
}
//タスク削除
export async function deleteTodo(id:number){
    const {data,error} = await supabase.from("todo").delete().eq('id',id);
    if(error){
        console.log("削除エラー");
    }
    return data;
}

//結果を入力
export async function addResult(contest_name:string,contest_date:string,score:(number|null)[],user_id:string) {
    const {data,error} = await supabase.from("score").insert([{contest_name,contest_date,score,user_id}]).select();
    if (error){
        console.log("追加エラー");
    }
    return data;
}