import React from 'react';
import { makeStyles } from '@material-ui/styles';

const style = makeStyles({
    root: {
        minHeight: '90vh',
        background: 'white',
    }
});

const Status = () => {
    const classes = style();
    return (
        <div className={classes.root}>
            {"Status 화면"}
        </div>
    );
}

export default Status;
