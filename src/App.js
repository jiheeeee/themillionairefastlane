import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import './App.css';
import { makeStyles } from '@material-ui/styles';
const { Header, Content, Footer } = Layout;

let baseUrl = "/getComplexArticleList?hscpNo=2527&cortarNo=4146310100&tradTpCd=A1&order=point_&showR0=N&page=1"
const style = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    width: '100vh',
    height: '100%',
  },
  content: {
    padding: 0,
  },
  footer: {
    textAlign: 'center',
    height: 30,
    padding: 0,
    paddingTop: 5,
    fontSize: 8,
  },
  table: {
    width: '100%',
  }
})
const columns = [
  {
    field: 'id',
    headerName: '#',
    width: 90,
  },
  {
    field: 'buildnum',
    headerName: '동',
    width: 100,
  },
  {
    field: 'floor',
    headerName: '층',
    width: 100,
  },
  {
    field: 'price',
    headerName: '가격',
    width: 150,
  },
  {
    field: 'tenant',
    headerName: '입주 가능',
    width: 150,
  }
];

function App() {
  const classes = style();
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .get(baseUrl)
      .then((rspn) => {
        console.log('rspn : ', rspn);
        let result = [];
        for (let i = 0; i < rspn.data.result.list.length; i++) {
          let tmpBildNm = rspn.data.result.list[i].bildNm;
          let tmpFlrInfo = rspn.data.result.list[i].flrInfo;
          let tmpPrcInfo = rspn.data.result.list[i].prcInfo;
          let tmp = { id: i, buildnum: tmpBildNm, floor: tmpFlrInfo, price: tmpPrcInfo, tenant: '.' };
          //rows = createData(i + 1, '.', tmpBildNm, tmpFlrInfo, tmpPrcInfo);
          result.push(tmp);
        }
        console.log('result : ', result);
        setData(result);
      });
  }

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', display: 'flex', flexGrow: 1 }}>
      <DataGrid autoHeight autoPageSize disableExtendRowFullWidth={true}
        rows={data}
        columns={columns}
      />
    </div>
  );
}

export default App;
