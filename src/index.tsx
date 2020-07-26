import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "app/layout/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);

serviceWorker.unregister();

//NO REASON PROBLEM WITH REACT.STRICTMODE
