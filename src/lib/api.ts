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

export async function addTodo(title:string,detail:string){
    const {data,error} = await supabase.from("todo").insert([{title,detail}]).select();
    if(error){
        console.log("追加エラー",error);
    }
    return data;
}

export async function deleteTodo(id:number){
    const {data,error} = await supabase.from("todo").delete().eq('id',id);
    if(error){
        console.log("削除エラー");
    }
    return data;
}