import React from "react";


export interface MenuProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export function Menu({setPage, setPopUp}: MenuProps){
    return(setPopUp.trigger)?(
        <div className="menu">
            <div className="menu-inner">
                <button className="close-button">close</button>
            </div>
        </div>
    ): "";
}
