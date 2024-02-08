import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// Sass styles:
import '../scss/style.scss';


// Components:
import ButtonOne from  './ButtonOne.js';
import KeyImageTextRow from  './KeyImageTextRow.jsx';

// Images:
import club from  '../images/club.svg';
import diamond from  '../images/diamond.svg';
import heart from  '../images/heart.svg';
import spade from  '../images/spade.svg';


export default function KeyImageText(
    {  
        // storeCardsKeyImageTexts,
        setShowClubsKeyMemImageText, // The Close button handler employs this
        setShowDiamondsKeyMemImageText, // The Close button handler employs this
        setShowHeartsKeyMemImageText, // The Close button handler employs this
        setShowSpadesKeyMemImageText, // The Close button handler employs this
        suit, // eg "Diamonds"
        setTextsObject, // This will be specific to the suit in question:
        textsObject, // This will be specific to the suit in question
    }
                                    )
                                     {




// The onClick handler for the 
// Close button. This has to:
// 1) call a function in <App/>
// that sets the appropriate 
// state property of that 
// component to false so that the 
// window containing the table 
// of card key image texts disappears:
function closeButtonClickHandler(){
// 1):
if (suit === "Clubs") {
    setShowClubsKeyMemImageText(false) 
                      }
if (suit === "Diamonds") {
    setShowDiamondsKeyMemImageText(false)
                         }
if (suit === "Hearts") {
    setShowHeartsKeyMemImageText(false)
                       }
if (suit === "Spades") {
    setShowSpadesKeyMemImageText(false)
                       }
                                  }

// A function that this component passes 
// in to child <KeyImageTextRow/> as props.
// This function takes one argument, an 
// array that looks like this: 
// ["Eight", "hoof"]. 
// This function must:
// 1) save in localStorage "hoof" as the 
//    value of property Eight of object 
//    heartsImageTexts. Create the object 
//    in localStorage if it does not 
//    already exist.
// 2) pass heartsImageTexts as props 
//    to child <KeyImageTextRow/>, which 
//    will extract "hoof" and put it in .
//   



// Remember that textsObject (passed in as props) looks like this:
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


let textsArray = []
for (const key in textsObject) {
    textsArray.push(textsObject[key])
                               }

// So now tempArray looks like this:
/*
[
{cardText: "Ace", placeholder: "Type new text here for Ace image", imageText: "", key: 0},
...
{cardText: "King", placeholder: "Type new text here for king image", imageText: "", key: 12}
]
*/

// Make an array of 13 rows for the "table":
let keyImgTextRowComponents = textsArray.map(function(member){
return(
    // <div key = {member.key}> {/* This div and key are for the map function only*/} 
    <KeyImageTextRow
    key = {member.key}
    cardText={member.cardText}
    placeholder={member.placeholder}
    imageText={member.imageText}
    setTextsObject= {setTextsObject} // this is suit-specific
    textsObject = {textsObject}
    />
    // </div>
)
                                              }
                             )









// --------- RENDERING BEGINS ---------------------------------------------


return (
<>

<div className="key-imagetext-outer-container">

{/* The div that contains the image of the suit:*/}
<div className="suitImageContainerDiv">
    <p className="suitP"> {suit} </p>
    <img className="suitIMG"
    src= {(suit==="Clubs") ? club : ((suit==="Diamonds") ? diamond : ((suit==="Hearts") ? heart : spade))}
    />
</div>

{/* This is a grid, 3 x 14:*/}
<div className="imageTextsGridDiv">

<div className="imageTextsRowDiv">
<div className="imageTextDivs">
    <p className="imageTextPhead">
        Card
    </p>
</div>    
<div className="imageTextDivs">
    <p className="imageTextPhead">
        Image
    </p>
</div>  
<div className="imageTextDivs">
    <p className="imageTextPhead">
        Click 
    </p>
</div>    
</div>    

{keyImgTextRowComponents}





<div className="close-button-positioning-div">
        {/*The Cancel button, the clicking of which  
        makes the modal vanish: */}
        <ButtonOne 
        buttonDivCSSclass = {"mainButton"} 
        pTextCSSclass = {"mainButtonText"}  
        clickHandler = {closeButtonClickHandler}  
        pText = {"Close"} 
        /> 
</div>

</div>    
</div>
</>



)
                                     }