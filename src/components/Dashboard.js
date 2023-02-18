import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { signInWithGoogle, signOutGoogle } from "../service/firebase";
import dig from 'object-dig';

const Dashboard = () => {
    const currentUser = useContext(AuthContext);
    console.log(currentUser);
    let formDiv = () => {
        let formElements
        if (dig(currentUser, 'currentUser')) {
            formElements = <form>
                <input placeholder="ToDoName" />
                <button>追加</button>
            </form>
        } else {
            formElements = <button onClick={signInWithGoogle}>ログイン</button>
        }
        return formElements
    }
    return (
        <div>
            ダッシュボードコンポーネント
            {formDiv()}
        </div>
    )
};

export default Dashboard;