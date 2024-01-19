import {configureStore} from "@reduxjs/toolkit";
import tasksReducer, {tasksMiddleware} from "./modules/Task/Tasks.store";
import modalReducer from "./modules/Modal/Modal.store";
import menuReducer from "./modules/Menu/Menu.store";
import userReducer from "./modules/User/User.store";

const store = configureStore({
    reducer: {tasks: tasksReducer,
      modal: modalReducer,
      menu: menuReducer,
      user: userReducer},
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware().concat(tasksMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;
