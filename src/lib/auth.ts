import { supabase } from "./supabaseClient";
import { registerUserInfo } from "./api";
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

type RegisterUserResult = {
    data?: { user: { id: string }}| null;
    error?: string;
};

export async function registerUser(email: string, password: string, username: string): Promise<RegisterUserResult> {
    // 📦 Supabaseで新規ユーザーを作成 (サインアップ)
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        console.log("サインアップエラー:", error.message);
        return { error: error.message }; 
    }

    console.log("サインアップ成功:", data);
    
    const user_id = data.user?.id;
    if (!user_id) {
        console.log("ユーザーIDが取得できませんでした");
        return { error: "ユーザーIDが取得できませんでした" };
    }

    // 👤 ユーザー情報を登録 (user_info テーブルに挿入)
    const { data: data2, error: error2 } = await registerUserInfo(username, user_id);
    if (error2) {
        console.log("ユーザー情報登録エラー:", error2);
        return { error: error2 };
    }

    console.log("ユーザー情報登録成功:", data2);
    return { data: data2 };
}
