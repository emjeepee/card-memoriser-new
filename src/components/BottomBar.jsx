import React from "react";

// styles:
import '../scss/style.scss'

// Import components:
import Timer from "./Timer"
import ButtonOne from "./ButtonOne"


export default function BottomBar({
    nextCardButtInfo,
    newDeckButtInfo
                                   }) {

return (

<div className= "bottomBar">{/* contains two divs*/}

<div className="bottomBarContainerOne">{/* contains <Timer/> */}
    <Timer/>
</div>

<div className="bottomBarContainerTwo">{/* contains two <ButtonOne/>s */}

</div>

</div>

       )
                                        }