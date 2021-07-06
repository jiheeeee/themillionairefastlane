import React from 'react'
import { makeStyles } from '@material-ui/styles';
import CalendarAntd from '../components/CalendarAntd';
import { Switch, Route } from "react-router-dom";
import Notice from '../components/Notice';
import Status from '../components/Status';
import Main from '../components/Main';
import { BrowserRouter as Router } from "react-router-dom";

const style = makeStyles({
    root: {
        padding: 2,
        background: 'white',
    }
});

const Contentview = () => {
    const classes = style();
    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path="/" component={CalendarAntd} />
                <Route exact path="/planlist" component={Main} />
                <Route exact path="/notice" component={Notice} />
                <Route exact path="/status" component={Status} />
            </Switch>
        </div>
    )
}
export default Contentview