import firebase from "firebase";
import { db } from "./firebase"

// 本Classは、firebaseとデータの送受信を定義するためのClassである。

// 本メソッドはfirestoreからデータを取得するためのメソッドである
// ログインしているユーザーのデータのみ取得
export const getData = async (uid) => {
    // 取得するデータの条件を指定する
    // firestoreのカラム名と完全一致すること
    // indexの新規作成が必要。ConsoleからURLで遷移で作成可能
    const data = await db.collection("myreactDB").orderBy('createdDateTime', 'desc').where('userId', '==', uid);

    return data.get().then((querySnapshot) => {
        let datas = [];
        querySnapshot.forEach((doc) => {
            datas.push({
                // key名はカラム名と一致しなくても良い
                userId: doc.id,
                content: doc.data().content,
                completeFlg: doc.data().completeFlg
            });
        });
        return datas;
    });
}

// 本メソッドはfirestoreへデータを追加するためのメソッドである
export const postData = (content, uid) => {
    // Add a new document with a generated id.
    db.collection("myreactDB").add({
        conpleteFlg: false,
        content: content,
        // firebase側でTimestampを自動登録（端末側で設定するとデバイスごとに時間設定が違う可能性があるため）
        createdDateTime: firebase.firestore.FieldValue.serverTimestamp(),
        userId: uid
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

export const deleteData = (id) => {
    db.collection('myreactDB').doc(id).delete();
}