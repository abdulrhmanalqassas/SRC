

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export const Success = () => {


    return (
        <>
        
        <div className="success-popUp">
            <FontAwesomeIcon icon={faCircleCheck} className="success-icon" />
            <h2> VERIFICATION IS SUCCESSFUL     </h2>
            <h3>This Product is Original </h3>
        </div>
        
        </>
    )
}
