import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CheckVerify from './CheckVerify'

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
            <CheckVerify/>
        </div>
    );
}

export default Status;
