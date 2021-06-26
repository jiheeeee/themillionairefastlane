import React from 'react'
import { makeStyles } from '@material-ui/styles';
import CalendarAntd from '../component/CalendarAntd';
import { Switch, Route } from "react-router-dom";
import Notice from '../component/Notice';
import Status from '../component/Status'
import { BrowserRouter as Router } from "react-router-dom";

const style = makeStyles({
    root: {
        minHeight: '88vh',
        padding: 24,
        background: 'white',
    }
});

const Contentview = () => {
    const classes = style();
    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path="/" component={CalendarAntd} />
                <Route exact path="/notice" component={Notice} />
                <Route exact path="/status" component={Status} />
            </Switch>
        </div>
    )
}
export default Contentview