import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  description: {
    minWidth: "50%",
  },
  locationGrid: {
    display: "flex",
    marginBottom: "20px",
  },
  locationIcon: {
    marginRight: "15px",
  },
  main: {
    minWidth: "50%",
  },
  map: {
    borderRadius: "10px",
    height: "370px",
  },
  mapGrid: {
    maxWidth: "49.779%",
  },
  root: {
    margin: "60px 60px 60px 60px",
  },
  temp: {
    marginLeft: "8px",
  },
  tempGrid: {
    backgroundColor: "gainsboro", //TODO: use dynamic images.
    borderRadius: "10px",
    padding: "16px",
    maxWidth: "49.779%",
  },
  weatherContainer: {
    gap: "5px",
  },
}));
