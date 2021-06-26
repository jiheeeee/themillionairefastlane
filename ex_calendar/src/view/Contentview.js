import React from 'react'
import { makeStyles } from '@material-ui/styles';
import CalendarAntd from '../component/CalendarAntd';

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
            <CalendarAntd/>
        </div>
    )
}
export default Contentview