import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import store from "./store/index";
import router from "./router";
// current version: 1.0

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
