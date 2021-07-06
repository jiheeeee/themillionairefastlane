import React from 'react';
import { makeStyles } from '@material-ui/styles';

const style = makeStyles({
    root: {
        minHeight: '90vh',
        background: 'white',
    }
});

const Notice = () => {
    const classes = style();
    return (
        <div className={classes.root}>
            {"Notice 화면"}
        </div>
    );
}

export default Notice;
