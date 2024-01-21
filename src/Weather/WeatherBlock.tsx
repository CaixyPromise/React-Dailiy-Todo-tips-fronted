import {AlertBlock} from "./AlertBlock";
import DangerousIcon from "@mui/icons-material/Dangerous";
import React from "react";

export default function WeatherBlock()
{

    const AlertShow = localStorage.getItem('Alert')
    return (
        <div>
            {AlertShow !== `"Showed"` && <AlertBlock/>}
            <section className="weather-container2 align-middle text-center ">
                <DangerousIcon className="DangerFont"/> <br/> <p>Can't Use This</p>
            </section>
        </div>
    )
}
