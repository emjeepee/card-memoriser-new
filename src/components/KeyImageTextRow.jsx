import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// Sass styles:
import '../scss/style.scss';


// Components:
import ButtonOne from  './ButtonOne.js';

// Images:
import club from  '../images/club.svg';
import diamond from  '../images/diamond.svg';
import heart from  '../images/heart.svg';
import spade from  '../images/spade.svg';


export default function KeyImageTextRow(
    {  
        cardText,
        placeholder,// For the input, eg "Text for image of ace".
        imageText,   // For the cell of the table that holds the 
                    // image text, eg "A dam" (3 of diamonds)
        setTextsObject, // a function that ultimately
                        // saves data to <App/>'s state
                        // variable textsObject. This is suit-specific. 
        textsObject                  
    }
                                       )
                                     {


//--------------------------------------------------------

let changeButtonObjectOperable = {
    buttonDivCSSclass: "mainButton" 
                                 }

let changeButtonObjectInoperable = {
    buttonDivCSSclass: "mainButtonInoperable" 
                                 }

// A state variable to hold various 
// values for the Change button:
const [changeButtonInfo, setChangeButtonInfo] = useState(changeButtonObjectOperable)



//--------------------------------------------------------

let imageTextObjOne = {
    showCells: true, // when showCells is true, showInput is false, and vice versa
    showInput: false,
                      }

let imageTextObjTwo = {
    showCells: false, // when showCells is true, showInput is false, and vice versa
    showInput: true,
                      }

// A state variable to hold various 
// values that are passed in to the 
// html elements of this component
const [imageTextObject, setImageTextObject] = useState(imageTextObjOne)



// The click handler for the Change button.
// This function has to:
// 1) Show the input and "OK" button
// 2) for that row make the card and card image text 
//    divs vanish
// 3) make the Change button faded and inactive
function changeImageText(){
// 1) & 2)
setImageTextObject(imageTextObjTwo)
// 3):
setChangeButtonInfo(changeButtonObjectInoperable)
                          }




// Remember that textsObject looks like this:
/*
{
  Ace: {cardText: "Ace", placeholder: "Type new text here for Ace image", imageText: "", key: 0},
  Two: {cardText: "Two", placeholder: "Type new text here for 2 image", imageText: "", key: 1},
  Three: {cardText: "Three", placeholder: "Type new text here for 3 image", imageText: "", key: 2},
  Four: {cardText: "Four", placeholder: "Type new text here for 4 image", imageText: "", key: 3},
  Five: {cardText: "Five", placeholder: "Type new text here for 5 image", imageText: "", key: 4},
  Six: {cardText: "Six", placeholder: "Type new text here for 6 image", imageText: "", key: 5},
  Seven: {cardText: "Seven", placeholder: "Type new text here for 7 image", imageText: "", key: 6},
  Eight: {cardText: "Eight", placeholder: "Type new text here for 8 image", imageText: "", key: 7},
  Nine: {cardText: "Nine", placeholder: "Type new text here for 9 image", imageText: "", key: 8},
  Ten: {cardText: "Ten", placeholder: "Type new text here for 10 image", imageText: "", key: 9},
  Jack: {cardText: "Jack", placeholder: "Type new text here for jack image", imageText: "", key: 10},
  Queen: {cardText: "Queen", placeholder: "Type new text here for queen image", imageText: "", key: 11},
  King: {cardText: "King", placeholder: "Type new text here for king image", imageText: "", key: 12},
}
*/


// The click handler for the OK buttons.
// This function has to:
// 1) read the text
//    and put it into state variable xxx
// 2) read the input value and cardText and send to 
//    passed-in props function setTextsObject()
//    as arg in the form of an array, eg if the suit 
//    is hearts and the card the 8: ["Eight", "hoof"],
//    where "hoof" is what the user typed in and 
//    "Eight" is the passed-in props cardText.
// 3) make the input + ok button vanish and make 
//    appear again the card and card image text divs
// 4) make Change button opaque and operable
//    again
//    :
function okHandler(){
// 2):

// Remember that textsObject looks like this:
/*
{
  Ace: {cardText: "Ace", placeholder: "Type new text here for Ace image", imageText: "", key: 0},
  Two: {cardText: "Two", placeholder: "Type new text here for 2 image", imageText: "", key: 1},
  Three: {cardText: "Three", placeholder: "Type new text here for 3 image", imageText: "", key: 2},
  Four: {cardText: "Four", placeholder: "Type new text here for 4 image", imageText: "", key: 3},
  Five: {cardText: "Five", placeholder: "Type new text here for 5 image", imageText: "", key: 4},
  Six: {cardText: "Six", placeholder: "Type new text here for 6 image", imageText: "", key: 5},
  Seven: {cardText: "Seven", placeholder: "Type new text here for 7 image", imageText: "", key: 6},
  Eight: {cardText: "Eight", placeholder: "Type new text here for 8 image", imageText: "", key: 7},
  Nine: {cardText: "Nine", placeholder: "Type new text here for 9 image", imageText: "", key: 8},
  Ten: {cardText: "Ten", placeholder: "Type new text here for 10 image", imageText: "", key: 9},
  Jack: {cardText: "Jack", placeholder: "Type new text here for jack image", imageText: "", key: 10},
  Queen: {cardText: "Queen", placeholder: "Type new text here for queen image", imageText: "", key: 11},
  King: {cardText: "King", placeholder: "Type new text here for king image", imageText: "", key: 12},
}
*/ 


// setTextsObject([cardText, inputRef.current])
let tempObj = JSON.parse(JSON.stringify(textsObject));
tempObj[cardText].imageText = inputRef.current
//console.log(`In okHandler of <KeyImageTextRow/> and tempObj[cardText].key is ${tempObj[cardText].key}`)
// console.log(`In okHandler of <KeyImageTextRow/> and tempObj is:`)
// console.table(tempObj)

// NOTE end of wed28june23:
// everything works up to this point.
// tempObj is being changed correctly.
// The following line makes all of the cells 
// of the table disappear except one!:
// The problem is line 97 in <KeyImageText/>,
// which is not producing the type of array expected!


setTextsObject(tempObj)
// 3):
setImageTextObject(imageTextObjOne)
// 4):
setChangeButtonInfo(changeButtonObjectOperable)

console.log(`In line 163 of okHandler of <KeyImageTextRow/> and textsObject is:`)
console.log(textsObject)


                    }




// A ref that will hold the value of 
// what the user types in in the input:
const inputRef = useRef("")                    


// the onChange handler for the input.
// this function has to save what the 
// user types in in ref inputRef:
function saveInputToRef(e){
    inputRef.current = e.target.value
                          }




// --------- RENDERING BEGINS ---------------------------------------------


return (
<>
{/* A div that is a grid of one row and 3 cols*: */}
<div className="imageTextsRowDiv">
{/* Conditionally render the 
"cells", ie the one for card
text and the one for card 
image text. Either showCells 
is true or showInput is true 
at any given time: */}
{imageTextObject.showCells ? 
    <>
        {/*The div contaiing the card text: */}
        <div className="imageTextDivs" >
        {/*The <p> for the card text: */}
            <p className="imageTextP">
            {cardText} {/* eg "Queen"*/} 
            </p>
        </div>
        {/*The div containing the card image text: */}
        <div className="imageTextDivs" >
        {/*The card image text: */}
        <p className="imageTextP">
        {imageText} {/* eg "A dam" (for the 3  of diamonds)*/} 
        </p>
        </div>
    </>    
: null}

{/*Conditionally render the 
input instead of the 'cells': */}
{imageTextObject.showInput ? 
<>
<div className="inputContainer">
<input
className="keyImgTxtRowInput"
placeholder = {placeholder}
onChange={saveInputToRef}
/>
        <ButtonOne 
        buttonDivCSSclass = {"mainButton"} 
        pTextCSSclass = {"mainButtonText"}  
        clickHandler = {okHandler}  
        pText = {"OK"} 
        /> 

</div>
</>
: null}


<div className="imageTextDivs" >
        <ButtonOne 
        buttonDivCSSclass = {changeButtonInfo.buttonDivCSSclass} 
        pTextCSSclass = {"mainButtonText"}  
        clickHandler = {changeImageText}  
        pText = {"Change"} 
        /> 
</div>
</div>

</>
)
                                     }