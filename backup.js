import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './App.css';
import { makeStyles } from '@material-ui/styles';
import { TableSortLabel } from '@material-ui/core';
const { Header, Content, Footer } = Layout;

let baseUrl = "/getComplexArticleList?hscpNo=2527&cortarNo=4146310100&tradTpCd=A1&order=point_&showR0=N&page=1"
const style = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    width: '100vh',
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
  },
  visuallyHidden: {
    display: 'none',
  },
})
const headCells = [
  { id: '#', label: '#' },
  { id: 'buildnum', label: '동' },
  { id: 'floor', label: '층' },
  { id: 'price', label: '가격' },
  { id: 'tenant', label: '입주 가능' },
];

function App() {
  const classes = style();
  const [data, setData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('price');

  useEffect(() => {
    loadData();
  }, []);

  function createData(key, tenants, bildnum, floor, price) {
    return { key, tenants, bildnum, floor, price };
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    console.log("orderBy : ", orderBy);
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    console.log('stabilizedThis : ', stabilizedThis);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const loadData = () => {
    axios
      .get(baseUrl)
      .then((rspn) => {
        console.log('rspn : ', rspn);
        let result = [];
        let rows = [];
        for (let i = 0; i < rspn.data.result.list.length; i++) {
          let tmpBildNm = rspn.data.result.list[i].bildNm;
          let tmpFlrInfo = rspn.data.result.list[i].flrInfo;
          let tmpPrcInfo = rspn.data.result.list[i].prcInfo;
          //let tmp = { bildNm: tmpBildNm, flrInfo: tmpFlrInfo, prcInfo: tmpPrcInfo };
          rows = createData(i + 1, '.', tmpBildNm, tmpFlrInfo, tmpPrcInfo);
          result.push(rows);
        }
        console.log('result : ', result);
        setData(result);
      });
  }
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <Layout className="root">
      <Header>

      </Header>
      <Content className={classes.content}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell 
                    key={headCell.id} 
                    sortDirection={orderBy === headCell.id ? order : false}>
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .map((row) => {
                  return (
                    <TableRow key={data.key}>
                      <TableCell>{row.key}</TableCell>
                      <TableCell>{row.bildnum}</TableCell>
                      <TableCell>{row.floor}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.tenants}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Content>
    </Layout>
  );
}

export default App;
