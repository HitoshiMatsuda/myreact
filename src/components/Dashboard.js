import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { signInWithGoogle } from '../service/firebase';
import dig from 'object-dig';
// api.jsでexportされている全てのメソッドをimportする
import * as Api from '../service/api';
import List from './List';

// materialUI
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'center',
        marginTop: 40,
        justifyContent: 'space-between'
    },
    form: {
        width: '100%',
        maxWidth: 360,
        margin: 'auto',
        marginBottom: 40,
        display: 'flex',
        alignItems: 'baseLine',
        justifyContent: 'center'
    },
    margining: {
        marginRight: 10
    }
}));

// 本Classはアプリ内で使用するDashBoardのコンポーネントを定義するものである。
const Dashboard = () => {
    const currentUser = useContext(AuthContext);
    const [inputName, setInputName] = useState('');
    const [getData, getDatas] = useState([]);
    console.log(currentUser);
    console.log(inputName);
    console.log(getData);

    // materialUI
    const classes = useStyles();

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
            formElements = <form className={classes.form}>
                {/* event:何かイベントが発生した際の情報を保持するObject */}
                < TextField className={classes.margining} placeholder='ToDoName' value={inputName} onChange={(event) => setInputName(event.currentTarget.value)} />
                <Button type='button' color='primary' disabled={inputName.length > 0 ? false : true} onClick={() => apiPost()}>追加</Button>
            </form>
        } else {
            formElements = <button onClick={signInWithGoogle}>ログイン</button>
        }
        return formElements
    }

    const apiPost = async () => {
        await Api.postData(inputName, currentUser.currentUser.uid);
        // 入力欄をデータ送信後に空にする
        await setInputName('');
        // 最新のデータを取得
        fetch();
    }

    return (
        <div className={classes.root}>
            ダッシュボードコンポーネント
            {formDiv()}
            <List getData={getData} fetch={fetch} />
        </div>
    )
};

export default Dashboard;