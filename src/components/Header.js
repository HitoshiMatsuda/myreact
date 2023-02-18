import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { signInWithGoogle, signOutGoogle } from "../service/firebase";
// currentUser内の値を確認するためのpackage
// "npm install object-dig"でインストール済み
import dig from 'object-dig';

const Header = () => {
    const currentUser = useContext(AuthContext);
    console.log(currentUser);
    let buttonFlag = () => {
        if (dig(currentUser, 'currentUser', 'uid')) {
            buttonFlag = <button onClick={signOutGoogle}>ログアウト</button>
        } else {
            buttonFlag = <button onClick={signInWithGoogle}>ログイン</button>
        }
        return buttonFlag
    }
    return (
        <header>
            ヘッダー（Googleログイン状態でボタン分岐）
            {buttonFlag()}
        </header>
    )
}

export default Header;