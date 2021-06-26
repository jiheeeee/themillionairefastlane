import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { Calendar, List } from 'antd';


const CalendarAntd = (value) => {
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
        switch (value.month()) {
            case currentMonth:
                switch (value.date()) {
                    case currentDate:
                        listData = [
                            { title : 'Today also Keep it up!!' },
                        ];
                        break;
                    default:
                }
                break;
            default:
        }
        return listData || [];
    }

    return (
        <div>
            <Calendar dateCellRender={dateCellRender}></Calendar>
        </div>
    )
}
export default CalendarAntd