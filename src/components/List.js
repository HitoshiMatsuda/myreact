import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { signInWithGoogle } from '../service/firebase';
import dig from 'object-dig';
// api.jsでexportされている全てのメソッドをimportする
import * as Api from '../service/api';



// props:Dashboardのローカルデータ（getDatas）を受け取ることができる
const List = (props) => {
    const deleteHandler = async (id) => {
        await Api.deleteData(id);
        props.fetch();
    }

    // liタグの作成
    const lists = props.getData.map((data) => {
        return (
            <li key={data.userId}>{data.content}<button type='button' onClick={() => { deleteHandler(data.userId) }}>削除</button></li>
        );
    });

    return (
        <div>
            <h2>リスト（propsを元に表示）</h2>
            <ul>{lists}</ul>
        </div>
    )
}
export default List;