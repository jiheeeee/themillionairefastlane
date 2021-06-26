import React from 'react'
import { makeStyles } from '@material-ui/styles';

const style = makeStyles({
    root: {
        minHeight: '85vh',
        padding: 24,
        background: 'white',
    }
});

const Contentview = () => {
    const classes = style();
    return (
        <div className={classes.root}>
            Content 화면 입니다.
        </div>
    )
}
export default Contentview