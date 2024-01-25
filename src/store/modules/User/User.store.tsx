import {createSlice} from "@reduxjs/toolkit";
import {currentUser} from "./index";
import {UserControllerService} from "@/services/requests";
import {message} from "antd";

const initialState: currentUser = {
    loginUser: null
}
const userStore = createSlice({
    name: "userStore",
    initialState: initialState,
    reducers: {
        setUserLogin(state, action)
        {
            state.loginUser = action.payload;
        },
        setUserLogout(state)
        {
            state.loginUser = null;
        }
    }
})

const { setUserLogin, setUserLogout } = userStore.actions;
const userReducer = userStore.reducer;

const getUserLogin = () =>
{
    return async (dispatch: any) =>
    {
        try
        {
            const response = await UserControllerService.getLoginUserUsingGET();
            if (response && response.data)
            {
                dispatch(setUserLogin(response.data))
            }
            else
            {
                dispatch(setUserLogout())
            }
        }
        catch (error: any)
        {
            message.error("用户未登录")
            dispatch(setUserLogout())
        }
    }
}


export {
    setUserLogin,
    getUserLogin
}

export default userReducer;