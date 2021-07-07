import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Layout, Calendar, List, Avatar } from 'antd';
import { CheckOutlined, GiftFilled } from '@ant-design/icons';
import './CalendarAntd.css';
import store from '../store';
import axios from 'axios';

const style = makeStyles({
    root: {
        flexGrow: 1,
    }
});
let idx = 0;

//List.Item.Meta에 색 입히기 style={{background : "#87e8de"}} 민트
const CalendarAntd = (value) => {
    const classes = style();
    const [currentDate, setcurrentDate] = useState(0);
    const [currentMonth, setcurrentMonth] = useState(0);
    const [Event, setEvent] = useState('');
    const [prjCalendar, setPrjCalendar] = useState([]);

    useEffect(() => {
        let tmp = new Date();
        setcurrentDate(tmp.getDate());
        setcurrentMonth(tmp.getMonth());
        console.log('Today is ', currentMonth + 1, '/', currentDate);
    }, [currentDate]);
    //month : 실제보다 1 작음
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
    /*const JsonData = [
        {
            month: currentMonth,
            date: currentDate,
            reserves: [
                { icon: <GiftFilled />, title: 'TODAY~!', color: '#ffc53d' }
            ]
        },
        {
            month: 5,
            date: 27,
            reserves: [
                { icon: <CheckOutlined />, title: 'test1', color: "#87e8de" },
                { title: 'test2' },
                { title: 'test3' },
            ]
        },
        {
            month: 5,
            date: 30,
            reserves: [
                { title: '월급날' },
            ]
        }
    ]
    <List.Item.Meta avatar={item.icon !== undefined ? <Avatar gap={2} size={20} icon={item.icon} /> : null} title={item.title} style={{ textAlign: 'right', paddingRight: 70 }} />
<List.Item.Meta avatar={item.icon !== undefined ? <Avatar gap={2} size={20} icon={item.icon} /> : null} title={item.title} style={{ textAlign: 'right', paddingRight: 70 }} />
*/

    function dateCellRender(value) {
        const listData = loadScheduleData(value);
        return (
            <List itemLayout="horizontal" dataSource={listData} renderItem={item => (
                <List.Item style={{ padding: 1, margin: 2, background: item.color }}>
                    <List.Item.Meta avatar={item.avatar} title={item.title} />
                </List.Item>
            )}>
            </List>
        );
    }
    const loadScheduleData = (value) => {
        let listData = [{ title: '' }];
        for (let i = 0; i < prjCalendar.length; i++) {
            let event = prjCalendar[i].due.split('. ');
            let month = Number(event[1] - 1);
            let date = Number(event[2].replace('.', ''));
            if ((value.month() === month) && (value.date() === date)) {
                let ava;
                let color;
                if (prjCalendar[i].class === 'NT') {
                    ava = <Avatar size={18} style={{ backgroundColor: '#f56a00' }}>N</Avatar>;
                }
                else if (prjCalendar[i].class === 'PMC_F08C_wFDC') {
                    ava = <Avatar size={18} style={{ backgroundColor: 'blue' }}>W</Avatar>;
                }
                else if (prjCalendar[i].class === 'PMC_F08C') {
                    ava = <Avatar size={18} style={{ backgroundColor: 'green' }}>P</Avatar>;
                }
                else if (prjCalendar[i].class === 'FK') {
                    ava = <Avatar size={18} style={{ backgroundColor: 'orange' }}>K</Avatar>;
                }
                else if (prjCalendar[i].class === 'FE') {
                    ava = <Avatar size={18} style={{ backgroundColor: 'red' }}>F</Avatar>;
                }
                else {
                    ava = <Avatar size={18} style={{ backgroundColor: 'gray' }}></Avatar>;
                }
                if (prjCalendar[i].type === '정규롬') {
                    color = '#ffccc7';
                }
                else if (prjCalendar[i].type === '시험롬') {
                    color = '#ffffb8';
                }
                else if (prjCalendar[i].type === '빌드시작') {
                    color = '#95de64';
                }
                else {
                    color = 'white';
                }
                listData.push({ title: prjCalendar[i].title, avatar: ava, color: color });
                console.log('listData : ', listData);
            }
        }
        return listData || [];
    }

    return (
        <Layout className={classes.root}>
            <Calendar dateCellRender={dateCellRender}></Calendar>
        </Layout>
    )
}
export default CalendarAntd