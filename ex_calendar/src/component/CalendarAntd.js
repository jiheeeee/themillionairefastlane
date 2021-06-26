import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Layout, Calendar, List, Avatar } from 'antd';
import { CheckOutlined, GiftFilled } from '@ant-design/icons';

const style = makeStyles({
    root: {
        flexGrow: 1,
    }
});

//List.Item.Meta에 색 입히기 style={{background : "#87e8de"}} 민트
const CalendarAntd = (value) => {
    const classes = style();
    const [currentDate, setcurrentDate] = useState(0);
    const [currentMonth, setcurrentMonth] = useState(0);
    const [Event, setEvent] = useState('');

    useEffect(() => {
        let tmp = new Date();
        setcurrentDate(tmp.getDate());
        setcurrentMonth(tmp.getMonth());
        console.log('Today is ', currentMonth + 1, '/', currentDate);
    }, [currentDate]);
    //month : 실제보다 1 작음
    const JsonData = [
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

    function dateCellRender(value) {
        const listData = loadScheduleData(value);
        return (
            <List itemLayout="horizontal" dataSource={listData} renderItem={item => (
                <List.Item style={{ padding: 0, margin: 0, background: item.color }}>
                    <List.Item.Meta avatar={item.icon !== undefined ? <Avatar gap={2} size={20} icon={item.icon} /> : null} title={item.title} style={{ textAlign: 'right', paddingRight: 70 }} />
                </List.Item>
            )}>
            </List>
        );
    }
    const loadScheduleData = (value) => {
        let listData = [{ title: '' }];
        for (let i = 0; i < JsonData.length; i++) {
            if ((value.month() === JsonData[i].month) && (value.date() === JsonData[i].date)) {
                listData = JsonData[i].reserves;
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