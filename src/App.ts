import { createElement } from "react";

import "leaflet/dist/leaflet.css";
import DrawerComponent from "./Drawer/DrawerComponent";

function App() {
  return createElement("div", {}, createElement(DrawerComponent));
}

export default App;
