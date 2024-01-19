import {createSlice} from "@reduxjs/toolkit";
import {currentUser} from "./index";
import {UserControllerService, UserLoginRequest} from "../../../services/requests";

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
        setUserLogout(state, action)
        {
            state.loginUser = null;
        }
    }
})

const { setUserLogin } = userStore.actions;
const userReducer = userStore.reducer;


const fetchLogin = (loginForm: UserLoginRequest) =>
{
    return async (dispatch: any) =>
    {
        try
        {
            const response = await UserControllerService.userLoginUsingPOST(loginForm);
            if (response && response.data)
            {
                dispatch(setUserLogin(response.data))
            }
        }
        catch (error: any)
        {
            console.log(error);
        }
    }
}

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
        }
        catch (error: any)
        {
            console.log(error);
        }
    }
}


export {
    fetchLogin,
    setUserLogin,
    getUserLogin
}

export default userReducer;