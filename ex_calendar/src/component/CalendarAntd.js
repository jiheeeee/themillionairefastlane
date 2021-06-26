import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Layout, Calendar, List } from 'antd';

const style = makeStyles({
    root: {
        height: 500,
    }
});

const JsonData = [
    {
        month : 6,
        date : 27,
        title : 'Tomorrow',
    }
]

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

    function dateCellRender(value) {
        const listData = getListData(value);
        console.log("listData ", listData);
        return (
            <List itemLayout="horizontal" dataSource={listData} renderItem={item => ( 
                <List.Item>
                    <List.Item.Meta title={item.title} style={{background : "#87e8de"}}/>
                </List.Item>
            )}>
            </List>
        );
    }
    function getListData(value) {
        let listData = [{title: ''}];
        if ((value.month() === currentMonth) && (value.date() === currentDate)) {
            listData = [ { title : 'Today also Keep it up!!' }, {title : "2"} ];
        }
        return listData || [];
    }
    /*const loadScheduleData = () => {
        for (let i=1; i<JsonData.length; i++){
            
        }
    }*/

    return (
        <Layout>
            <Calendar dateCellRender={dateCellRender}></Calendar>
        </Layout>
    )
}
export default CalendarAntd