import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {menusActions} from "@/store/modules/Menu/Menu.store";
import LayoutMenus from "../Utilities/LayoutMenus";
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import Weather from "../../Weather/WeatherApp";


const AccountData: React.FC = () =>
{
    const menuOpen = useAppSelector((state) => state.menu.menuAccountOpened);
    const dispatch = useAppDispatch();
    const [ selectedDate, setSelectedDate ] = useState<dayjs.Dayjs | null>(dayjs(new Date()));

    const closeMenuHandler = () =>
    {
        dispatch(menusActions.closeMenuAccount());
    };


    return (
        <div>
            <LayoutMenus
                menuOpen={menuOpen}
                closeMenuHandler={closeMenuHandler}
                className="top-0 right-0"
            >
                <div className="grid grid-cols-1">
                    <div className=""><Weather/></div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar sx={{ width: "95%" }}
                                      className="maxAccount"
                                      value={selectedDate}
                                      // @ts-ignore
                                      onChange={(date: dayjs.Dayjs) => setSelectedDate(date)}/>
                    </LocalizationProvider>
                </div>
            </LayoutMenus>
        </div>
    );
};

export default AccountData;
