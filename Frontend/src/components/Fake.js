

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export const Fake = () => {


    return (
        <>
        
        <div className="failed-popUp">
        <FontAwesomeIcon icon={faCircleXmark} className="failed-icon"/>
            <h2> VERIFICATION IS FAILED     </h2>
            <h3>This Product is FAKE </h3>
        </div>
        
        </>
    )
}
