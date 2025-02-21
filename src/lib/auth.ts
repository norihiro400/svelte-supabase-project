import { supabase } from "./supabaseClient";

// ログイン機能
export async function signInWithEmail(email:string,password:string) {
    const {data,error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if(error){
        console.log("ログインエラー");
        return {error:error.message};
    }

    console.log("ログイン成功");
    return {data};
}

//ログアウト機能
export async function signOut() {
    const { error } =await supabase.auth.signOut();
    if(error){
        console.log("ログアウト失敗");
    }
}
