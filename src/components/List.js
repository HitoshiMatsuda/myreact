import React from 'react';
// import { AuthContext } from '../providers/AuthProvider';
// import { signInWithGoogle } from '../service/firebase';
// import dig from 'object-dig';
// api.jsでexportされている全てのメソッドをimportする
import * as Api from '../service/api';
import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from "@material-ui/core/styles"
import Checkbox from '@material-ui/core/Checkbox';




const useStyles = makeStyles(() => ({
    list: {
        justifyContent: 'space-between'
    },
    root: {
        maxWidth: 360,
        margin: 'auto'
    },
    ul: {
        paddingLeft: 0,
        listStyle: 'none'
    }
}));


// props:Dashboardのローカルデータ（getDatas）を受け取ることができる
const List = (props) => {
    const deleteHandler = async (id) => {
        await Api.deleteData(id);
        props.fetch();
    }

    const onChangeHandler = async (id) => {
        await Api.updateData(id);
        props.fetch();
    }

    const classes = useStyles();

    // liタグの作成
    // dataはfirestoreDBのjson形式ファイルのため、カラム名に忠実に指定すること
    const lists = props.getData.map((data) => {
        console.log(data.userId);
        console.log(data.conpleteFlg);
        return (
            <ListItem key={data.userId}>
                <ListItemIcon>
                    <Checkbox
                        checked={data.conpleteFlg}
                        onChange={() => onChangeHandler(data.userId)}
                        color="primary"
                    />
                </ListItemIcon>
                <ListItemText
                    primary={data.content}
                />
                <ListItemSecondaryAction>
                    <IconButton type='button' onClick={() => { deleteHandler(data.userId) }}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    });

    return (
        <div className={classes.root}>
            <h2>リスト（propsを元に表示）</h2>
            <ul className={classes.ul}>{lists}</ul>
        </div>
    )
}
export default List;