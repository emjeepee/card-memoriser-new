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

This component takes three props:
1) var type, a string set to text that 
determines which one of the four dropdown 
menus above – a) to d) – this component 
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
{text: "xxxxx", src: tttt},
{text: "abcde", src: tyui},
{text: "jklmn", src: qwer}
],
where a member object has these properties:
i)   text, which has a value that is a 
     string for the text of a dropdown menu 
     option 
ii)  src, which has a value that is the src
     of an image.

If property text is null, the value of property src must be a reference to an image.
If property src is null, the value of property text must be a string.

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
    mainText: "Card" or "Suit"             // the string text of the dd heading 
    mainTextCSSclass: "yyyy"                // css class for <p> of string mainText (the heading)
    mainTextContainerCSSclass: "xxxx"       // css class for the div containing mainText
    clickHandlerOne: xxxxxxxxx              // three click handlers
    clickHandlerTwo: null,
    clickHandlerThree: null
  }

  4) dataVar, which ...








This component adds keys to each member 
object of array optionsList for the sake of 
the map() function.
*/






export default function DropDownMenu({
    type, optionsList, optionsObject, dataVar
                                      }) {

// A function to add keys to the member
// objects of optionsList:
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
// but with keys:
let displayArray = addKeysForMapFunction(optionsList)


// Make use of the passed in data:
const dataRef = useRef(dataVar)


// A ref that is a reference to the container 
// of the options container:
const ddMenuContainer = useRef()


// A ref that determines whether or not the 
// DD menu header will be "Card"/"Suit" on
// the one hand or "J"/"C" on the other
const selected = useRef(false)

// A ref to hold the text of the selected option:
const selectedOption = useRef()

// The click handler for the options
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
                                  }


// Make an array, each member of which 
// is jsx for an <li> of the dropdown.
// Below clickHandlerOne is function changeRectsAndDDMenus
// of <CardsContainer/>. Its three args are:
// card (a string for the card, eg "J", or null)
// suit (a string for the suit, eg "hearts", or null)
// card number (the index of the card in the pack)
let menuOptionsArray

if (type === "text") {
 menuOptionsArray = (
    displayArray.map((member)=>(
    <li key = {member.key} >
    <div className={optionsObject.textDivCSSclass} onClick = {
        ()=> {
            optionsObject.clickHandlerOne(member.text, null, dataRef.current)
            expandOrContractDDmenu()
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

// The onClick handler for the div that 
// contains the mainText <p> (ie the dd menu heading),
// which the user clicks to make the dd menu appear or disappear
// This function simply toggles the value of state property
// expandOrContract when the user clicks 
// the menu heading:
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
// The onClick handler for the mainText containing 
// div toggles the value of this state property:
const [expandOrContract, setExpandOrContract] = useState(0)






return (

<div className={optionsObject.ddMenuPositionCSSclass}> {/* An outer div to contain the dd menu and position it */}
  {/* This div contains the dd menu heading and the div that contains the 
      dd menu options. This is the div whose height is made to grow or shrink
      to make the dd menu drop or climb.
      The handler for the onClick of the div for the dd menu heading makes this div
      grow or shrink by toggling the value of expandOrContract, which gives this div 
      one of two styles, one to expand it, the other to shrink it.
       */}
{/*  <div ref={ddMenuContainer} className = {expandOrContract ? " showDDmenu ddMenuOuterContainer " : " hideDDmenu ddMenuOuterContainer " }> */}
{/* <div ref={ddMenuContainer} className = {expandOrContract ? "  ddMenuOuterContainer " : "  ddMenuOuterContainer " }> */}
<div ref={ddMenuContainer} className = {(expandOrContract===0) ? "  ddMenuOuterContainer neitherDDmenu" : 
(expandOrContract===1) ? "ddMenuOuterContainer showDDmenu" : (expandOrContract===2) ? "ddMenuOuterContainer hideDDmenu" : "ddMenuOuterContainer"
}
> 
  {/*The following div contains text for the menu header*/}
<div 
className={optionsObject.mainTextContainerCSSclass}
onClick={expandOrContractDDmenu}
>
<p className={optionsObject.mainTextCSSclass}>
{selected.current ? selectedOption.current : optionsObject.mainText}
</p>    
</div>    
<ul className={optionsObject.ulClass}>
{menuOptionsArray}
</ul>
</div>
</div>
)
                                           }