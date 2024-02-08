import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// Sass styles:
import '../scss/style.scss';

// components:
import ButtonOne from  './ButtonOne.js';






export default function Modal({
    messageText,    // the string for the message
    setModalObject, // modalObject is an object that is a state property of the parent 
                    // and has boolean property showModal, which the handler for dismissing this modal
                    // will set
    showOrNot,      // a boolean; true -> show this modal, false -> make vanish; set by setModalObject above,  
                    // eg when user clicks on the "OK" button of this modal.
    selfDismiss,    // a boolean, determines whether this modal disappears by itself or whether 
                    // the user has to dismiss it  
    respondToModalCancel, // the function that runs in the parent when user clicks Cancel
    respondToModalOK,     // the function that runs in the parent when user clicks OK
            
                                }) {





//----------------------------------------------------------                                

let renderThis // what the return statement calls.
               // This contains jsx or null                 

//----------------------------------------------------------



//-----------------------------------------------------------------
// Handlers for the OK and Cancel buttons 
// of this component:

// For the OK button.
// This function must:
// 1) set <CardsContainer/>'s modalObject
// so that the modal goes away
// 2) call a function in <CardsContainer/>
// that will take the user to the Recall
// area
// 3) Call a function in <Timer/> that 
// will change the Stop/Start button text 
// to "---" and make the button inoperable:
function okButtonClickHandler(){
// 1):    
    setModalObject(
        {
            messageText: "",
            showOrNot: false,
            selfDismiss: null,
            whichModalButtonClicked: "OK",
        }
                  )
// 2):
respondToModalOK()                  
                               }


// For the Cancel button.
// This function must:
// 1) set <CardsContainer/>'s modalObject
// so that the modal goes away 
// 2) call the parent's function that 
// runs when the user clicks Cancel:
function cancelButtonClickHandler(){
// 1):
    setModalObject(
        {
            messageText: "",
            showOrNot: false,
            selfDismiss: null,
            whichModalButtonClicked: "Cancel"
        }
                  )
// 2):
respondToModalCancel()                   
                                   }





// The jsx that describes the modal:               
let jsxForModal = (
    (
        <div className="modal-Semi-Opaque-Div">
        <div className="modalEnclosingDiv">
        
        {/*The div that contains the message: */}
        <div className="modal-Text-Container">
        <p className="modal-Message-Text">
        {messageText}    
        </p>
        </div>
        
        {/*The div that contains the OK button
        and Cancel buttons.
        This container div is conditionally rendered: */}
        {selfDismiss ? null :
        (<div className="modal-Button-Container">
        
        {/* Remember that <CardsContainer/>'s state property 
        modalObject looks like this: 
          {
            messageText: "",   // The text that will appar in the modal. 
                               // Passed in as props to <Modal/>
            showOrNot: false,  // true -> show the modal, false -> hide the modal. 
                               // Passed in as props to <Modal/>
            selfDismiss: true, // true -> make modal vanish after a fews seconds, false -> user has to dimiss modal
                               // Passed in as props to <Modal/>
          }
        */}
        {/*The Cancel button, the clicking of which  
        makes the modal vanish: */}
        <ButtonOne 
        buttonDivCSSclass = {"mainButton"} 
        pTextCSSclass = {"mainButtonText"}  
        clickHandler = {cancelButtonClickHandler}  
        pText = {"Cancel"} 
        /> 
        {/*The OK button, the clicking of which  
        makes the modal vanish: */}
        <ButtonOne 
        buttonDivCSSclass = {"mainButton"} 
        pTextCSSclass = {"mainButtonText"}  
        clickHandler = {okButtonClickHandler}  
        pText = {"OK"} 
        /> 
        </div>)
        }
        
        </div>
        </div>
                         )
                                        )


//----------------------------------------------------------


if (showOrNot) {
// If this is a self-dismissing modal
// make it vanish after x seconds:
renderThis = jsxForModal
if (selfDismiss) {
    setTimeout(()=>{
            // console.log(`In the setTimeout callback, renderThis will be set to null`)
            renderThis = null
            setModalObject({
                messageText: "",
                showOrNot: false,
                selfDismiss: null,
                          })
                   }, 5000);
                 } // end if selfDismiss
               } // end outer if


//----------------------------------------------------------


if (!showOrNot) {
    renderThis = null
                }


//----------------------------------------------------------
// RENDERING BEGINS
//----------------------------------------------------------

return(
    <>
{renderThis}
    </>
      )


                            }