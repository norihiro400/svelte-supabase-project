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
        return {error:error.message};
    }
    console.log("ログアウト");
    return {error:null};
}

//ログイン中のユーザーの情報を取得
export async function getCurrentUser() {
    const {data} = await supabase.auth.getSession();
    return data.session?.user ?? null;
    
}

//ユーザー作成
export async function registerUser(email:string,password:string) {
    const {data,error} = await supabase.auth.signUp({email,password});
    if (error){
        console.log("サインアップエラー");
        return {error:error.message};
    }    
    console.log("サインアップ成功");
    return {data};
}
