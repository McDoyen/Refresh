import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  description: {
    marginLeft: "50px",
  },
  locationGrid: {
    display: "flex",
    marginBottom: "20px",
  },
  locationIcon: {
    marginRight: "15px",
  },
  main: {
    minWidth: "100%",
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
  skeleton: {
    borderRadius: "10px",
    width: "50%",
  },
  skeletonRoot: { margin: "60px 60px 60px 60px" },
  weatherContentSkeleton: {
    display: "flex",
    gap: "5px",
    height: "23.125em",
  },
  temp: {
    marginLeft: "8px",
    lineHeight: "50px",
  },
  tempGrid: {
    backgroundColor: "gainsboro", //TODO: use dynamic images.
    backgroundImage: `url("https://assets.msn.com/weathermapdata/1/static/background/v2.0/compactads3/Cloudy 1.png")`,
    backgroundSize: "cover",
    borderRadius: "10px",
    padding: "16px",
    maxWidth: "49.779%",
  },
  weatherContainer: {
    gap: "5px",
  },
}));
