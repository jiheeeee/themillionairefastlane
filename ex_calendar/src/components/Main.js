import React, { useEffect, useState } from "react";
import axios from 'axios';
import Content from "./Content";
import store from '../store';
import {
  withStyles, Container, Button, InputAdornment, TextField,
  Fab, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar,
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const styles = theme => ({
  root:{
    width: "100%",
    marginTop: "20px",
    minHeight: '90vh',
    background: 'white',
  },
  appBarSpacer: theme.mixins.toolbar,
  button: {
    margin: theme.spacing(1),
  },
  fab:{
    position:"fixed", bottom:"3rem", right:"3rem"
  },
  textField:{
    marginBottom: "30px",
  },
});
const Alert = React.forwardRef((props, ref) => 
  <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />
);
let idx = 0;

const Main = (props) => {
  const {classes} = props;
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [prjCalendar, setPrjCalendar] = useState([]);
  const [idtmp, setIdtmp] = useState('');
  const [classtmp, setClasstmp] = useState('');
  const [typetmp, setTypetmp] = useState('');
  const [vertmp, setVertmp] = useState('');
  const [titletmp, setTitletmp] = useState('');
  const [desctmp, setDesctmp] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duetmp, setDuetmp] = useState(selectedDate.getFullYear()+'-'+(selectedDate.getMonth()+1)+'-'+selectedDate.getDate());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState('');

  let baseUrl = "http://localhost:8000"
  useEffect(() => {
    resyncDB();
    store.subscribe(()=>{
      const prjCalendarfromStore = store.getState().prjCalendar;
      for(let i=0; i<prjCalendarfromStore.length; i++){
        setPrjCalendar(prjCalendarfromStore);
      }
    })
  }, []);

  const resyncDB = () => {
    axios
      .get(baseUrl+'/api/prjcalendar/readdb')
      .then((rspn)=>{
        for(let i=0; i<rspn.data.length; i++){
          let dateObj = new Date(rspn.data[i].due);
          rspn.data[i].due = dateObj.toLocaleDateString("ko-KR", {timeZone: "Asia/Seoul"});
        }
        console.log("DB data : ", rspn.data);
        store.dispatch({
          type:'initializecontent',
          prjCalendar: rspn.data,
        });
        idx = rspn.data.length;
      });
  }
  const handleWritePrjCalendar = () => {
    setOpenCreateModal(true);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDuetmp(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate());
  };
  const handleCreateConfirm = () => {
    setOpenCreateModal(false);
    axios.post(
      baseUrl+'/api/prjcalendar/insert',
      {
        id: idx,
        class: classtmp,
        type: typetmp,
        ver: vertmp,
        title: titletmp,
        description: desctmp,
        due: duetmp,
      }
    ).then(()=>{
      resyncDB();
    });
    setOpenSnackbar(true);
    setTimeout(()=>{setOpenSnackbar(false)},1800);
    setSnackbarContent('Created!');
  };
  const handleEditConfirm = (id) => {
    setOpenEditModal(false);
    axios.post(
      baseUrl+'/api/prjcalendar/edit',
      {
        id: idx,
        class: classtmp,
        type: typetmp,
        ver: vertmp,
        title: titletmp,
        description: desctmp,
        due: duetmp,
      }
    ).then(()=>{
      resyncDB();
    });
    setOpenSnackbar(true);
    setTimeout(()=>{setOpenSnackbar(false)},1800);
    setSnackbarContent('Modified!');
  };
  const handleEdit = (id) => {
    for(let i=0; i<prjCalendar.length; i++){
      if(prjCalendar[i].id === id){
        setIdtmp(prjCalendar[i].id);
        setClasstmp(prjCalendar[i].class);
        setTypetmp(prjCalendar[i].type);
        setVertmp(prjCalendar[i].ver);
        setTitletmp(prjCalendar[i].title);
        setDesctmp(prjCalendar[i].description);
        setDuetmp(prjCalendar[i].due.replace('. ','-').replace('. ','-').replace('.',''));
        break;
      }
    }
    setOpenEditModal(true);
  };
  const handleDelete = (id) => {
    axios.post(
      baseUrl+'/api/prjcalendar/delete', {id:id}
    ).then(()=>{
      resyncDB();
    });
  };

  return(
    <main className={classes.root}>
      <div className={classes.appBarSpacer}/>
      <Container>
      {prjCalendar.map(e=>{
          return(
            <Content
              id={e.id} class={e.class} type={e.type}
              ver={e.ver} title={e.title} description={e.description} due={e.due}
              edit={handleEdit} delete={handleDelete}
            />);
        })}
        <Dialog open={openCreateModal} aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">프로젝트 일정 추가</DialogTitle>
          <DialogContent>
          <TextField
              id="classinput" label="Class" fullWidth
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setClasstmp(e.target.value)}
            />
            <TextField
              id="typeinput" label="Type" fullWidth
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setTypetmp(e.target.value)}
            />
            <TextField
              id="verinput" label="Ver" fullWidth
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setVertmp(e.target.value)}
            />
            <TextField
              id="titleinput" label="Title" fullWidth
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setTitletmp(e.target.value)}
            />
            <TextField
              id="descinput" label="Description" fullWidth
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setDesctmp(e.target.value)}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Due Day"
                disableToolbar
                variant="inline"
                format="yyyy / MM / dd"
                margin="normal"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateConfirm} color="primary">Add</Button>
            <Button onClick={()=>{setOpenCreateModal(false)}} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEditModal} aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">일정 수정</DialogTitle>
          <DialogContent>
            <TextField
              id="classinput" label="Class" fullWidth
              className={classes.textField}
              defaultValue={classtmp}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setClasstmp(e.target.value)}
            />
            <TextField
              id="typeinput" label="Type" fullWidth
              className={classes.textField}
              defaultValue={typetmp}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setTypetmp(e.target.value)}
            />
            <TextField
              id="verinput" label="Ver" fullWidth
              className={classes.textField}
              defaultValue={vertmp}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setVertmp(e.target.value)}
            />
            <TextField
              id="titleinput" label="Title" fullWidth
              className={classes.textField}
              defaultValue={titletmp}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setTitletmp(e.target.value)}
            />
            <TextField
              id="descinput" label="Description" fullWidth
              className={classes.textField}
              defaultValue={titletmp}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setDesctmp(e.target.value)}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Due Day"
                disableToolbar
                variant="inline"
                format="yyyy / MM / dd"
                margin="normal"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{handleEditConfirm(idtmp)}} color="primary">Edit</Button>
            <Button onClick={()=>{setOpenEditModal(false)}} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Snackbar open={openSnackbar}>
        <Alert severity="success">{snackbarContent}</Alert>
      </Snackbar>
      <Fab
        className={classes.fab}
        color="primary"
        onClick={handleWritePrjCalendar}>
        <EditIcon/>
      </Fab>
    </main>
  );
}

export default withStyles(styles)(Main);