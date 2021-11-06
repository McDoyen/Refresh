import { createElement } from "react";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import People from "@material-ui/icons/People";
import SendButton from "@material-ui/icons/Send";
import TextField from "@mui/material/TextField";

import useStyles from "./styles";
import { Divider, Fab, ListItemButton, ListItemText } from "@mui/material";

function ChatComponent() {
  const classes = useStyles();

  return createElement(
    Grid,
    { container: true, className: classes.chatSection },
    createElement(
      Grid,
      { item: true, xs: 3, className: classes.memberSection },
      createElement(
        List,
        {},
        createElement(
          ListItemButton,
          {},
          createElement(People),
          createElement(ListItemText, { primary: "Paul McDoyen" })
        )
      ),
      createElement(Divider),
      createElement(
        Grid,
        { item: true, xs: 12, style: { padding: "10px" } },
        createElement(TextField, {
          fullWidth: true,
          label: "Search",
        })
      ),
      createElement(Divider),
      createElement(
        List,
        {},
        createElement(
          ListItemButton,
          {},
          createElement(People),
          createElement(
            ListItemText,
            { primary: "Paul McDoyen" },
            "Paul McDoyen"
          ),
          createElement(ListItemText, {
            className: classes.onlineBanner,
            secondary: "online",
          })
        ),
        createElement(
          ListItemButton,
          {},
          createElement(People),
          createElement(
            ListItemText,
            { primary: "Paul McDoyen" },
            "Paul McDoyen"
          )
        ),
        createElement(
          ListItemButton,
          {},
          createElement(People),
          createElement(
            ListItemText,
            { primary: "Paul McDoyen" },
            "Paul McDoyen"
          )
        )
      )
    ),
    createElement(
      Grid,
      { item: true, xs: 9, className: classes.messageArea },
      createElement(
        List,
        {},
        createElement(
          ListItem,
          {},
          createElement(
            Grid,
            { container: true },
            createElement(
              Grid,
              { item: true, xs: 12 },
              createElement(ListItemText, { primary: "Hi" }),
              createElement(ListItemText, { secondary: "7:44" })
            )
          )
        ),
        createElement(
          ListItem,
          {},
          createElement(
            Grid,
            { container: true },
            createElement(
              Grid,
              { item: true, xs: 12 },
              createElement(ListItemText, {
                className: classes.textMessage,
                primary: "Hi",
              }),
              createElement(ListItemText, {
                className: classes.textMessage,
                secondary: "7:44",
              })
            )
          )
        ),
        createElement(
          ListItem,
          {},
          createElement(
            Grid,
            { container: true },
            createElement(
              Grid,
              { item: true, xs: 12 },
              createElement(ListItemText, { primary: "Hi" }),
              createElement(ListItemText, { secondary: "7:44" })
            )
          )
        )
      ),
      createElement(Divider),
      createElement(
        Grid,
        { container: true, className: classes.textField },
        createElement(
          Grid,
          { item: true, xs: 11 },
          createElement(TextField, {
            fullWidth: true,
            label: "Type something",
          })
        ),
        createElement(
          Grid,
          { className: classes.send, xs: 1, item: true },
          createElement(Fab, { color: "primary" }, createElement(SendButton))
        )
      )
    )
  );
}

export default ChatComponent;
