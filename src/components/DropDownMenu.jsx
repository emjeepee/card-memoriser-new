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

Properties text and src may have value null.

3) object optionsObject, an object that 
contains data on which css classes the 
elements of the dropdown menu should have
and which event handler(s).

optionsObject looks like this:
  {
    textCSSclass: "dropdownMenuOptionText", // css class for the <p> of each option
    imgCSSclass: null,                      // css class for the img of an option
    imageDivCSSclass: null,                 // css class for the div contianing the img
    textDivCSSclass: "menuItemContainer",   // css class for the div containing the text
    imageAndTextDivCSSclass: null,          // css class for the div containing text+image    
    outerContainerCSSclass: "ddMenuOuterContainer", // css class for the div that grows/shrinks 
    ulClass: "dropDownMenu",                // css class for the ul of the dropdown
    mainText: "Card",                       // the string text of the dd before clicking on it 
    mainTextCSSclass: "yyyy"                // css class for <p> of string mainText
    mainTextContainerCSSclass: "xxxx"       // css class for the div containing mainText
    clickHandlerOne: setCard,               // three click handlers
    clickHandlerTwo: null,
    clickHandlerThree: null
  }









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
  // When you scoll the (cards) dd menu down 
  // and select, say, "Jack" what appears in 
  // the dd menu header is the option that 
  // travelled up there when you scrolled down,
  // ie 
                                  }



// Below clickHandlerOne is function changeRectsAndDDMenus
// of <CardsContainer/>. Its three args are:
// card (a string for the card, eg "cJ")
// suit (a string for the suit, eg "hearts")
// car number (the index of the card in the pack)
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
                     }



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
// contains the mainText <p>. This function
// simply toggles the value of var
// expandOrContract:
function expandOrContractDDmenu(){
    // console.log(`you clicked! the Card or Suit div!`)
    setExpandOrContract(!expandOrContract)
                                 }

// A state property containing a boolean that will determine
// whether the dd menu expands or contracts. 
// The onClick handler for the mainText containing 
// div toggles the value of this state property:
const [expandOrContract, setExpandOrContract] = useState(false)






return (

<div className={optionsObject.ddMenuPositionCSSclass}>
  {/*The following div takes on one of two styles, one to expand it, the other to shrink it */}
<div ref={ddMenuContainer} className = {expandOrContract ? " showDDmenu ddMenuOuterContainer " : " hideDDmenu ddMenuOuterContainer " }>
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