import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// Sass styles:
import '../scss/style.scss';

/*
This component allows you to create 
one of four types of dropdown menu:
a)  one in which each option is text 
b)  one in which each option is an image
c)  one in which each option is text and image
d)  one in which each option is image and text

This component takes four props:
1) var type, a string whose value
determines which one of the four dropdown 
menus above – a)-d) – this component 
will render.
Var type can have one of four values:
i)   "text"
ii)  "image"
iii) "textAndImage"
iv)  "imageAndText"

2) array optionsList. This contains the 
data for the options of the dropdown menu.
Each member is an object that contains 
data for a dropdown menu item. 
optionsList looks like this:
[
{text: "Clubs", src: tttt},
{text: "Diamonds", src: tyui},
{text: "Hearts", src: qwer}
{text: "Spades", src: qwas}
],
where a member object has these properties:
i)   text, which has a value that is a 
     string for the text of a dropdown menu 
     option 
ii)  src, which has a value that is the src
     of an image (club, diamond, heart, spade).

src can be null or the reference to the src of an image.
text can be null or a string.

3) object optionsObject, an object that 
contains data on which css classes the 
elements of the dropdown menu should have
and which event handler(s).

optionsObject looks like this:
  {
    textCSSclass: "dropdownMenuOptionText", // css class for the <p> of each option
    imgCSSclass: null,                      // css class for the img of an option
    imageDivCSSclass: null,                 // css class for the div containing the img
    textDivCSSclass: "menuItemContainer",   // css class for the div containing the text
    imageAndTextDivCSSclass: null,          // css class for the div containing text+image    
    outerContainerCSSclass: "ddMenuOuterContainer", // css class for the div that grows/shrinks 
    ulClass: "dropDownMenu",                // css class for the ul of the dropdown
    mainText: "Card" or "Suit"              // the string text of the dd heading 
    mainTextCSSclass: "yyyy"                // css class for <p> of string mainText (the heading)
    mainTextContainerCSSclass: "xxxx"       // css class for the div containing mainText
    clickHandlerOne: someClickHandler       // three click handlers
    clickHandlerTwo: null,
    clickHandlerThree: null
  }

  4) dataVar, which is the ordinal of the card to which 
  the dd list is attached, eg 36

*/


export default function DropDownMenu({
    type, optionsList, optionsObject, dataVar
                                      }) {

// A function to add keys to the member
// objects of array optionsList. This allows 
// you to use the JS map() function to  
// an array to create an array of JSX that 
// React will recognise:
function addKeysForMapFunction(arrayArg){
    for (let i = 0; i < arrayArg.length; i++) {
      arrayArg[i].key = i  
                                              }
return arrayArg
                                        }

// NOTE NOTE Mon8May23 NOTE NOTE 
// It is probably better to do this:
/*
const displayArray = 
useEffect(() => {
addKeysForMapFunction(optionsList)
                }, []);

so that displayArray gets made once only
rather than on every render.
*/
// make an array equivalent to array optionsList 
// but with keys. optionsList will be an array that 
// looks like one of the two arrays below:
/*
[
  {src: null, text: "Ace"},
  {src: null, text: "2"},
  {src: null, text: "3"},
  {src: null, text: "4"},
  {src: null, text: "5"},
  {src: null, text: "6"},
  {src: null, text: "7"},
  {src: null, text: "8"},
  {src: null, text: "9"},
  {src: null, text: "10"},
  {src: null, text: "Jack"},
  {src: null, text: "Queen"},
  {src: null, text: "King"}
]
for the dd list in which the user selects 
the card value or
  [
    {src: club, text: "c"},
    {src: diamond, text: "d"},
    {src: heart, text: "h"},
    {src: spade, text: "s"}
  ]
for the dd list in which the user selects 
the card suit
*/

// Make an array from passed in prop optionsList:
let displayArray = addKeysForMapFunction(optionsList)


// Make use of the passed in 
// dataVar, which will be a 
// recall card's ordinal number
// (its index in the pack):
const dataRef = useRef(dataVar)


// A ref that is a reference to the container 
// of the options container:
const ddMenuContainer = useRef()


// A ref that determines what the DD menu header will be.
// The default is "Card", which becomes, eg, "J" (for 
// jack) when the user makes a selection in the case of 
// the DD for card values.
// In the case of the DD for suits the default is "Suit",
// which becomes "C", eg, (for clubs) when the user makes
// a selection:
const selected = useRef(false)

// A ref to hold the text of the selected option:
const selectedOption = useRef()



// A function called in the click handler for the options
// of the DD menu. This function 
// changes the header text of the 
// DD menu.
// This function must:
// 1) set ref selected.current to true
// 2) set ref seletedOption to the option
// text
function  changeHeader(optionText){
  // 1): 
  selected.current = true
  // 2):
  selectedOption.current = optionText

  // 3): NOTE THIS IS NECESSARY
  ddMenuContainer.current.scroll(0,0)
  // Without the line above a problem occurs.
  // When you scroll the (cards) dd menu down 
  // and select, say, "Jack" what appears in 
  // the dd menu header is the option that 
  // travelled up there when you scrolled down,
  // ie 
                                  } // end changeHeader()






// Make an array, each member of which 
// is jsx for an <li> of the dropdown.
// clickHandlerOne below will be set to 
// changeRectsAndDDMenus() of 
// <CardsContainer/>. Its three args 
// are:
// i)   card (this will be a string for
//      the card in the case of the dd  
//      for card values, eg "J", or 
//      null for the dd list for card 
//      suits)
// ii)  suit (a string for the suits dd, 
//      eg "hearts", or null for the 
//      dd for card values).
// iii) card number (the index of the 
//      recall card in the pack, ie 
//      the card to which the two dd
//      lists are attached):
let menuOptionsArray

if (type === "text") {
// Code in the return statement will 
// use menuOptionsArray as part of its 
// jsx. displayArray is just optionsList
// with keys (so that React will recognise
// the jsx created below with the map 
// function). Remember that optionsList 
// is an array of objects that contain 
// either i) srcs for options in the dd that
// shows suits or ii) strings "1" to "Ace"
// for the options in the dd list that 
// shows card values:
 menuOptionsArray = (
    displayArray.map((member)=>(
    <li key = {member.key} >
    <div className={optionsObject.textDivCSSclass} onClick = {
        ()=> {
            optionsObject.clickHandlerOne(member.text, null, dataRef.current)
            expandOrContractDDmenu()
            // So when the user clicks on an <li> of the dd list
            // for card values, the click handler receives as 
            // args "J", null and 34 (for example)   
            // The following is no longer needed:            
            changeHeader(member.text)
             }  
                                                             }>
    <p className={optionsObject.textCSSclass}>
        {member.text}     
    </p>
    </div>
    </li>
                            )
                 )
                         )
                     } // end if it's a dd that contains only text



// If the dd menu will consist of 
// options that have only images: 
if (type === "image") {
menuOptionsArray = (
    optionsList.map((member)=>(
    <li key = {member.key} >
    <div className={optionsObject.imageDivCSSclass} onClick = {
        ()=> {
               optionsObject.clickHandlerOne(null, member.text, dataRef.current)
               expandOrContractDDmenu()
               changeHeader(member.text)
             } 
                                                              }>
    <img className={optionsObject.imgCSSclass} src = {member.src}  />
    </div>
    </li>
                            )
                  )
                   )
                     }


// If the dd menu is for showing the image 
// texts for each suit (ie the dd is attached to the info button): 
if (type === "imageTexts") {
  menuOptionsArray = (
      optionsList.map((member)=>(
      <li key = {member.key} >
      <div className={optionsObject.imageDivCSSclass} onClick = {
          ()=> {
                 optionsObject.clickHandlerTwo(null, member.text, dataRef.current)
                 expandOrContractDDmenu()
                 changeHeader(member.text)
               } 
                                                                }>
      <img className={optionsObject.imgCSSclass} src = {member.src}  />
      </div>
      </li>
                              )
                    )
                     )
                       }





/*                      
// If the dd menu will consist of 
// options that each has text and an image: 
if (type === "textAndImage") {
    const menuOptionsArray = (
        suitsArray.map((member)=>(
        <li key = {member.key} >
        <div className={optionsObject.imageDivCSSclass} onClick = {()=> {optionsObject.clickHandlerOne(member.src)} }>
        <img className={optionsObject.imgCSSclass}>
        src = {member.pic}
        </img>
        </div>
        </li>
                                )
                     )
                             )
                          }
*/  

// The onClick handler for two things:
// i)  the div that contains the mainText  
// <p> (ie the dd menu heading), which the 
// user clicks to make the dd menu drop
// or climb back up.
// ii) the div that is one of the menu 
// options
// This function simply toggles the value 
// of state property expandOrContract when
// the user clicks the menu heading:
function expandOrContractDDmenu(){
  switch (expandOrContract) {
    case 0:
    setExpandOrContract(1);
      break;
    case 1:
    setExpandOrContract(2)  
      break;
    case 2:
    setExpandOrContract(1)  
      break;
                            }  
                                 }

// A state property containing a boolean that will determine
// whether the dd menu expands or contracts. 
// onClick handler expandOrContractDDmenu (for the dd header
// and each menu option) toggles the value of this state 
// property:
const [expandOrContract, setExpandOrContract] = useState(0)


return (
// the following div has class ddMenuPositioningDivLeft or ddMenuPositioningDivRight
// depending on which dd menu it is:
<div className={optionsObject.ddMenuPositionCSSclass}> {/* An outer div to contain the dd menu and position it */}
  {/* The following div contains the dd menu heading and the div that contains the 
      dd menu options. This is the div whose height is made to grow or shrink
      to make the dd menu appear to drop or climb back up.
      The handler for the onClick of the div for the dd menu heading makes this div
      grow or shrink by toggling the value of expandOrContract, which gives this div 
      one of two styles, one to expand it, the other to shrink it.
       */}
<div ref={ddMenuContainer} className = {(expandOrContract===0) ? "  ddMenuOuterContainer neitherDDmenu" : 
(expandOrContract===1) ? "ddMenuOuterContainer showDDmenu" : (expandOrContract===2) ? "ddMenuOuterContainer hideDDmenu" : "ddMenuOuterContainer"
}
> 
  {/*The following div contains text for the menu header. */}
  {/* When the user clicks the header of the dd then click handler 
  expandOrContractDDmenu toggles the value of state property 
  expandOrContract from 0 to 1 to 2. The class of the div 
  immediately above changes depending on the value of 
  expandOrContract, making the dd appear to drop down or 
  climb back up. */ }
<div 
className={optionsObject.mainTextContainerCSSclass}
onClick={expandOrContractDDmenu}
>
{/* The text of the dd menu header: */}    
<p className={optionsObject.mainTextCSSclass}>
{/*This changes depending on the value of selected.current. 
If selected.current is true then the header text becomes
the dd option the user clicked on (selectedOption.current). 
But if selected.current is false the header text becomes
what it starts off as ("Card" or "Suit")*/}  
{selected.current ? selectedOption.current : optionsObject.mainText}
</p>    
</div>    
<ul className={optionsObject.ulClass}>
{menuOptionsArray} {/* <- This is the array of <li>s that make up the options of the dd*/}    
</ul>
</div>
</div>
)
                                           }