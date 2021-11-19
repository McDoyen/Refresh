import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
}));
