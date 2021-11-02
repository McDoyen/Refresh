import { createElement } from "react";

import useStyles from "./styles";

import Grid from "@material-ui/core/Grid";
import Skeleton from "@mui/material/Skeleton";

function SkeletonComponent() {
  const classes = useStyles();

  return createElement(
    Grid,
    { className: classes.skeletonRoot },
    createElement(
      Grid,
      { className: classes.locationGrid },
      createElement(Skeleton, {
        className: classes.locationIcon,
        width: "7%",
        variant: "circular",
      }),
      createElement(Skeleton, { width: "-webkit-fill-available" })
    ),
    createElement(
      Grid,
      { className: classes.weatherContentSkeleton },
      createElement(Skeleton, {
        className: classes.skeleton,
        height: "100%",
        variant: "rectangular",
      }),
      createElement(Skeleton, {
        className: classes.skeleton,
        height: "100%",
        variant: "rectangular",
      })
    )
  );
}

export default SkeletonComponent;
