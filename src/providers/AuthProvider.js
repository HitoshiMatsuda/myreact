import React, { useState, useEffect } from "react";
import { auth } from '../service/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    // currentUser : ログインしたユーザー情報
    const [currentUser, setCurrentUser] = useState(null);

    // ログインしているユーザー情報が変わった時に、setCurrentUserへ値を格納するメソッド
    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;