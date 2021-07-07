import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Tabs, Checkbox } from 'antd';
import store from '../store';
import axios from 'axios';
const { TabPane } = Tabs;

const style = makeStyles({
    root: {
        minHeight: '60vh',
        width: '50%',
        background: 'white',
        margin: 10,
    }
});

let idx = 0;
let idxdev = 0;
const CheckVerify = () => {
    const classes = style();
    const [prjCalendar, setPrjCalendar] = useState([]);
    const [developers, setDevelopers] = useState([]);
    let baseUrl = "http://localhost:8000"

    useEffect(() => {
        resyncDB();
        store.subscribe(() => {
            const prjCalendarfromStore = store.getState().prjCalendar;
            for (let i = 0; i < prjCalendarfromStore.length; i++) {
                setPrjCalendar(prjCalendarfromStore);
            }
        })
    }, []);
    useEffect(() => {
        resyncDBdev();
        store.subscribe(() => {
            const developersfromStore = store.getState().developers;
            for (let i = 0; i < developersfromStore.length; i++) {
                setDevelopers(developersfromStore);
            }
        })
    }, []);

    const resyncDB = () => {
        axios
            .get(baseUrl + '/api/prjcalendar/readdb')
            .then((rspn) => {
                for (let i = 0; i < rspn.data.length; i++) {
                    let dateObj = new Date(rspn.data[i].due);
                    rspn.data[i].due = dateObj.toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" });
                }
                store.dispatch({
                    type: 'initializecontent',
                    prjCalendar: rspn.data,
                });
                idx = rspn.data.length;
            });
    }
    const resyncDBdev = () => {
        axios
            .get(baseUrl + '/api/developers/readdb')
            .then((rspn) => {
                console.log("DB data : ", rspn.data);
                store.dispatch({
                    type: 'loadDevelopers',
                    developers: rspn.data,
                });
                idxdev = rspn.data.length;
            });
    }
    const onChanges = (dev) => {
     /*   let tmp;
        if(dev.done === "0"){
            tmp = "1";
        }
        else {
            tmp = "0";
        }
        axios.post(
            baseUrl + '/api/developers/checkdone',
            {
                id: dev.id,
                name: dev.name,
                romtitle: dev.romtitle,
                done: tmp,
            }
        ).then(() => {
            resyncDB();
        });*/
    };
    const onChange = (e) => {
        console.log("e : ",e );
    }

    const insertDeveloperList = (paneTitle, dev) => {
        if (dev.romtitle === paneTitle)
            return <Checkbox style={{ width: '100%' }} onChange={onChange}>{dev.name}</Checkbox>
    };

    return (
        <div className={classes.root}>
            <Tabs defaultActiveKey="1" type="card" size="small">
                {prjCalendar.map(pane => (
                    <TabPane tab={pane.title} key={pane.id}>
                        {developers.map(dev => (
                            insertDeveloperList(pane.title, dev)
                        ))}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
}

export default CheckVerify;
