import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  List,
  Divider,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";

export default function MyDrawer(props) {
  const { anchor, classes, toggleDrawer, name } = props;

  return (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>{name.initials}</Avatar>
          </ListItemAvatar>

          <ListItemText primary={name.firstName + " " + name.lastName} />
        </ListItem>
        <Divider />
        <Link to="/" style={{ color: "#000" }}>
          <ListItem button>
            <ListItemIcon>
              <FontAwesomeIcon icon="home" />
            </ListItemIcon>
            <ListItemText primary="home" />
          </ListItem>
        </Link>

        <Link to="/account" style={{ color: "#000" }}>
          <ListItem button>
            <ListItemIcon>
              <FontAwesomeIcon icon="user" />
            </ListItemIcon>
            <ListItemText primary="account" />
          </ListItem>
        </Link>

        <Link to="/security" style={{ color: "#000" }}>
          <ListItem button>
            <ListItemIcon>
              <FontAwesomeIcon icon="user-shield" />
            </ListItemIcon>
            <ListItemText primary="privacy" />
          </ListItem>
        </Link>

        <Link to="/theme" style={{ color: "#000" }}>
          <ListItem button>
            <ListItemIcon>
              <FontAwesomeIcon icon="paint-brush" />
            </ListItemIcon>
            <ListItemText primary="theme" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}
