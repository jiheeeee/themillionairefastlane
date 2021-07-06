import React, { useState } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import {
    Button, IconButton, Chip,
    Card, CardHeader, CardContent, CardActions, Collapse,
    List, ListItem, ListItemText, ListItemAvatar,
    Avatar, Divider, Badge, Menu, MenuItem
  } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import WorkIcon from '@material-ui/icons/Work';
import EventIcon from '@material-ui/icons/Event';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root:{
    width: "100%",
  },
  card:{
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "0px",
    marginRight: "0px",
  },
  button: {
    margin: theme.spacing(1),
  },
  smallavatar:{
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  expand:{
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

const Content = (props) => {
  const {classes} = props;
  const [cardExpand, setCardExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const id = props.id;

  const handleEdit = () =>{props.edit(id);};
  const handleDelete = () =>{props.delete(id);};
  const handleExpand = () => {
    setCardExpand(!cardExpand);
  };
  const handleOptionMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleOptionMenuClose = () => {
    setAnchorEl(null);
  }
  const getDDay = (due) => {
    const today = new Date();
    const dueDate = new Date(due);
    const distance = dueDate.getTime()-today.getTime();
    const dday = Math.floor(distance/(1000*60*60*24))*(-1);
    return (dday>0) ? "D+"+dday : "D"+dday;
  };
  const colorOverdue = (due) => {
    const today = new Date();
    const dueDate = new Date(due);
    const distance = dueDate.getTime()-today.getTime();
    const dday = Math.floor(distance/(1000*60*60*24))*(-1);
    return (dday<0) ? "primary" : "secondary";
  }
  
  return(
    <Card className={classes.card} elevation={1}>
      <CardHeader
        title={
          <div style={{display:'flex', alignItems:'center'}}>
            <Chip
              style={{marginRight:'10px'}}
              variant="outlined" size="small"
              color={colorOverdue(props.due)}
              label={getDDay(props.due)}
            />
            {props.title}
          </div>
        }
        action={
          <div style={{display:'flex'}}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: cardExpand,
              })}
              onClick={handleExpand}
            ><ExpandMoreIcon/></IconButton>
            <IconButton
              onClick={handleOptionMenuOpen}
            ><MoreVertIcon/></IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleOptionMenuClose}
            >
              <MenuItem onClick={()=>handleEdit()}>Edit</MenuItem>
              <MenuItem onClick={()=>handleDelete()}>Delete</MenuItem>
            </Menu>
          </div>
        }
      />
      <Collapse in={cardExpand} timeout="auto" unmountOnExit>
        <CardContent>
          <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.smallavatar}>
                  <WorkIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={props.description}/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.smallavatar}>
                  <EventIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText secondary={props.due} />
            </ListItem>
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default withStyles(styles)(Content);