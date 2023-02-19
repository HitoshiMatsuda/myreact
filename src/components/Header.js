import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { signInWithGoogle, signOutGoogle } from "../service/firebase";
// currentUser内の値を確認するためのpackage
// "npm install object-dig"でインストール済み
import dig from 'object-dig';

// material-ui関係
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core";



// 本Classはアプリ内で使用するHeaderのコンポーネントを定義するものである。

const useStyles = makeStyles(() => ({
    toolbar: {
        justifyContent: 'space-between'
    },
    button: {
        color: '#FFF'
    }
}));

const Header = () => {
    require('react-dom');
    window.React2 = require('react');
    console.log(window.React1 === window.React2);

    const currentUser = useContext(AuthContext);
    console.log(currentUser);

    const classes = useStyles();

    let buttonFlag = () => {
        if (dig(currentUser, 'currentUser', 'uid')) {
            buttonFlag = <Button className={classes.button} onClick={signOutGoogle}>ログアウト</Button>
        } else {
            buttonFlag = <Button className={classes.button} onClick={signInWithGoogle}>ログイン</Button>
        }
        return buttonFlag
    }
    return (
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h6'>
                    My React App__PWA__
                </Typography>
                {buttonFlag()}
            </Toolbar>
        </AppBar>
    )

    // return (
    //     <header>
    //         {buttonFlag()}
    //     </header>
    // )

}

export default Header;