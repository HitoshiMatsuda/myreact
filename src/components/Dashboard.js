import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { signInWithGoogle } from '../service/firebase';
import dig from 'object-dig';
// api.jsでexportされている全てのメソッドをimportする
import * as Api from '../service/api';

// 本Classはアプリ内で使用するDashBoardのコンポーネントを定義するものである。
const Dashboard = () => {
    const currentUser = useContext(AuthContext);
    const [inputName, setInputName] = useState('');
    const [getData, getDatas] = useState([]);
    console.log(currentUser);
    console.log(inputName);
    console.log(getData);

    // データ取得
    useEffect(() => { fetch(); }, [currentUser]);

    // getDatasした値を取得するメソッドである（非同期処理）
    const fetch = async () => {
        if (dig(currentUser, 'currentUser', 'uid')) {
            const datas = await Api.getData(currentUser.currentUser.uid);
            await getDatas(datas);
        }
    }

    const formDiv = () => {
        let formElements
        if (dig(currentUser, 'currentUser')) {
            formElements = <form>
                {/* event:何かイベントが発生した際の情報を保持するObject */}
                < input placeholder='ToDoName' value={inputName} onChange={(event) => setInputName(event.currentTarget.value)} />
                <button type='button' onClick={() => apiPost()}>追加</button>
            </form>
        } else {
            formElements = <button onClick={signInWithGoogle}>ログイン</button>
        }
        return formElements
    }

    const apiPost = () => {
        Api.postData(inputName, currentUser.currentUser.uid);
        // 入力欄をデータ送信後に空にする
        setInputName('');
    }

    return (
        <div>
            ダッシュボードコンポーネント
            {formDiv()}
        </div>
    )
};

export default Dashboard;