import React from "react";

// styles:
import '../scss/style.scss'


export default function ButtonOne({
    buttonDivCSSclass,
    pTextCSSclass,
    clickHandler,
    pText
                                    }) {

return (

<div 
className= {buttonDivCSSclass}
onClick = {clickHandler}
>

<p
className = {pTextCSSclass}
>
{pText}
</p>

</div>

       )
                                        }