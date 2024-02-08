import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// Sass styles:
import '../scss/style.scss';

// Components:
import ButtonOne from  './ButtonOne.js';
import Timer from  './Timer.jsx';
import DropDownMenu from  './DropDownMenu.jsx';
import Modal from  './Modal.jsx';


// Context:
import {KeyMemImageTextsContext} from './App.js'


// images (lots!):
import turnCardSymbol from  '../images/turnCardSymbol.svg';

// For the suits DD menu:
import club from  '../images/club.svg';
import diamond from  '../images/diamond.svg';
import heart from  '../images/heart.svg';
import spade from  '../images/spade.svg';


// Clubs cards:
import c1 from  '../images/cardC1.svg';
import c2 from  '../images/cardC2.svg';
import c3 from  '../images/cardC3.svg';
import c4 from  '../images/cardC4.svg';
import c5 from  '../images/cardC5.svg';
import c6 from  '../images/cardC6.svg';
import c7 from  '../images/cardC7.svg';
import c8 from  '../images/cardC8.svg';
import c9 from  '../images/cardC9.svg';
import c10 from  '../images/cardC10.svg';
import cj from  '../images/cardCJ.svg';
import cq from  '../images/cardCQ.svg';
import ck from  '../images/cardCK.svg';
// Diamonds cards:
import d1 from  '../images/cardD1.svg';
import d2 from  '../images/cardD2.svg';
import d3 from  '../images/cardD3.svg';
import d4 from  '../images/cardD4.svg';
import d5 from  '../images/cardD5.svg';
import d6 from  '../images/cardD6.svg';
import d7 from  '../images/cardD7.svg';
import d8 from  '../images/cardD8.svg';
import d9 from  '../images/cardD9.svg';
import d10 from  '../images/cardD10.svg';
import dj from  '../images/cardDJ.svg';
import dq from  '../images/cardDQ.svg';
import dk from  '../images/cardDK.svg';
// Hearts cards:
import h1 from  '../images/cardH1.svg';
import h2 from  '../images/cardH2.svg';
import h3 from  '../images/cardH3.svg';
import h4 from  '../images/cardH4.svg';
import h5 from  '../images/cardH5.svg';
import h6 from  '../images/cardH6.svg';
import h7 from  '../images/cardH7.svg';
import h8 from  '../images/cardH8.svg';
import h9 from  '../images/cardH9.svg';
import h10 from  '../images/cardH10.svg';
import hj from  '../images/cardHJ.svg';
import hq from  '../images/cardHQ.svg';
import hk from  '../images/cardHK.svg';
// Spuds cards:
import s1 from  '../images/cardS1.svg';
import s2 from  '../images/cardS2.svg';
import s3 from  '../images/cardS3.svg';
import s4 from  '../images/cardS4.svg';
import s5 from  '../images/cardS5.svg';
import s6 from  '../images/cardS6.svg';
import s7 from  '../images/cardS7.svg';
import s8 from  '../images/cardS8.svg';
import s9 from  '../images/cardS9.svg';
import s10 from  '../images/cardS10.svg';
import sj from  '../images/cardSJ.svg';
import sq from  '../images/cardSQ.svg';
import sk from  '../images/cardSK.svg';
// Rear face of all cards:
import boc from  '../images/backOfCard.svg';

// Green tick, red cross, don'tKnow:
import redCross from  '../images/redCross.svg';
import greenTick from  '../images/greenTick.svg';
import dontKnow from  '../images/dontKnow.svg';





////////////////////////////////////////////////////////////
// HOW THIS COMPONENT FUNCTIONS
/* 

THE MEMORISATION STAGE
======================

State property stateDeckToDisplay will hold an array of 52 arrays, 
each representing a card of a playing deck and looking like
this: 
[boc, cj, 0, true, false], 
where 

\memberArray\[0] is the src value for the image that shows the back of a card.
                 All \memberArray\s have this 
\memberArray\[1] is the src value for the image that shows the face of a card.
                 This naturally varies from one \memberArray\ to the next. 
\memberArray\[2] is an integer key whose value is simply the index of the 
                 \memberArray\. It's present so that a map() function can 
                 later operate on array stateDeckToDisplay (the map() function
                 needs a key). 
\memberArray\[3] is a boolean that determines whether the face of a card  
                 should show with or without the turning effect. 
                 if \memberArray\[3] === true, show without turning effect;
                 if \memberArray\[3] === false, show with turning effect.
\memberArray\[4] is a boolean that determines whether the back or face of the 
                 card should show. 
                 true  = show back of card; 
                 false = show face of card. 

Example:
A \memberArray\ like this:
[boc, dq, 0, true, true] 
means show the back of the queen of diamonds (of course here the value of 
\memberArray\[3] doesn't matter because the back is showing anyway).



New deck button handler
-----------------------
This handler shuffles a deck of cards and puts it into stateDeckToDisplay. 



Next card button handler
------------------------
This changes the values of properties of the \memberArray\ representing
the next card to show and of the one representing the previous card.

This handler must:
1) read the counter, which has a value equal to the ordinal number of the 
next card to show, say it's *counterValue* 
2) set 
stateDeckToDisplay[*counterValue*][4] = false (ie show face of card)
stateDeckToDisplay[*counterValue*][3] = true (ie show face of card WITH the turning effect)
stateDeckToDisplay[*counterValue-1*][3] = false (ie show face of previous card 
                                            WITHOUT the turning effect)

In the return statement of this component the map() function looks at 
the members of array stateDeckToDisplay and for each creates a div
to hold a card. Those divs become the children of the div with 
className="cardsContainer".

When the user clicks Next card for the 52nd time and memorises the card
the user can then click the stop button, which will the Reset & log time button. This 
i)   stops and zeros the timer,
ii)  stores the time 
iii) makes all cards disappear and puts in their places the dropdown lists
     for card number and card suit.
v)   makes the Next card and New deck buttons fade and become inoperable   
vi)  makes the Check button appear 



How the user's actions affect this component
--------------------------------------------
The user clicks the New deck button and the backs of a shuffled deck appear 
on the green felt. 
The user clicks the Next card button and:
1) If it's the first card of the pack the button will read "First card"
2) The timer starts
3) the nth card shows with the turning effect
4) all cards from 1 to n-1 show their faces without the 
   turning effect.

If the user clicks the New deck button before turning over all of the 52 cards: 
1) A warning modal appears asking the user if he really wants to do this
1) On dismissal of the modal code creates a new shuffled deck
2) code displays the backs of the new deck on the green felt
3) the timer goes to 0 again and waits for the user to click the Next card
   button, when the timer will start again.

The user can click the Pause button to stop the timer so that the user 
can have a break. On return from his break the user clicks Start again to 
start the timer and carries on as before.

  

THE RECALL STAGE
================
This is when the user tries to recall each card.

The user goes from card space to card space, each time using the two dropdown
lists (for card number and suit) to select a card. The card shows in the card
space.

The user clicks the Check button, which:
1) shows a modal if the user has  not tried to recall all 52 cards, giving 
   him the chance to cancel
2) if the user has attempted all 52 cards code checks whether the cards 
   match those in the shuffled deck. If yes, code puts a green tick over the 
   face ofthe card; if no, a red cross.
3) makes appear a message showing how many correct, incorrect or don't-knows the 
   user got and the time appears in the lefthand column along with this info.     
4) makes the Next card and New deck buttons go opaque and operable
5) Makes the Check button disappear



*/
////////////////////////////////////////////////////////////







// setTimesAndScores is the <App/> component's function 
// setTimesAndScores, which takes one arg: 
// an array of any number of members that looks like this:
// [
// {key: 0, time: "2hrs23mins19s", date: "4May23", scores: {correct: 45, incorrect: 5, dontKnow: 2}},
// {key: 1, time: "1hrs52mins9s", date: "6May23", scores: {correct: 47, incorrect: 3, dontKnow: 2}},
// {key: 2, time: "51mins10s", date: "14May23", scores: {correct: 49, incorrect: 1, dontKnow: 2}},
// ...
// ]
export default function CardsContainer({
  setTimesAndScores,
}) {

// A lookup table object that function changeRectsAndDDMenus 
// refers to. That function gets called by the click handlers
// of the click handlers of the dd menus: 
const srcLookup = useRef({
cAce: c1,
c2: c2,
c3: c3,
c4: c4,
c5: c5,
c6: c6,
c7: c7,
c8: c8,
c9: c9,
c10: c10,
cJack: cj,
cQueen: cq,
cKing: ck,

hAce: h1,
h2: h2,
h3: h3,
h4: h4,
h5: h5,
h6: h6,
h7: h7,
h8: h8,
h9: h9,
h10: h10,
hJack: hj,
hQueen: hq,
hKing: hk,

dAce: d1,
d2: d2,
d3: d3,
d4: d4,
d5: d5,
d6: d6,
d7: d7,
d8: d8,
d9: d9,
d10: d10,
dJack: dj,
dQueen: dq,
dKing: dk,

sAce: s1,
s2: s2,
s3: s3,
s4: s4,
s5: s5,
s6: s6,
s7: s7,
s8: s8,
s9: s9,
s10: s10,
sJack: sj,
sQueen: sq,
sKing: sk
}
)




  
// There are 13 options for the cards dropdown menu:
// : "Ace", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"
//  Selecting one selects a specific object from the array below:
let cardsArray = [
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
  
  // There are 4 options for the suits dropdown menu:
  // an <img/> for clubs
  // an <img/> for diamonds
  // an <img/> for hearts
  // an <img/> for spades.
  // Selecting one selects a specific object 
  // from the array below:
  
  let suitsArray = [
      {src: club, text: "club"},
      {src: diamond, text: "diamond"},
      {src: heart, text: "heart"},
      {src: spade, text: "spade"}
                   ]





// An array containing 52 arrays, each representing
// a card of a playing deck. This deck is not shuffled.
// In each member array below 
// boc = the src of the image of the back of a card,
// cj (for example) = the src of the card face,
// 0 = a key, later to be to the index of the card in the array
// true at index [3] =  
// true at index [4] =  
// "cj" (for example) = a string representing the card
let unshuffledDeck = [
    [boc, c1, 0, true, true, "c1"], 
    [boc, c2, 0, true, true, "c2"], 
    [boc, c3, 0, true, true, "c3"], 
    [boc, c4, 0, true, true, "c4"], 
    [boc, c5, 0, true, true, "c5"], 
    [boc, c6, 0, true, true, "c6"],  
    [boc, c7, 0, true, true, "c7"], 
    [boc, c8, 0, true, true, "c8"], 
    [boc, c9, 0, true, true, "c9"], 
    [boc, c10, 0, true, true, "c10"], 
    [boc, cj, 0, true, true, "cj"], 
    [boc, cq, 0, true, true, "cq"], 
    [boc, ck, 0, true, true, "ck"], 
    [boc, d1, 0, true, true, "d1"], 
    [boc, d2, 0, true, true, "d2"], 
    [boc, d3, 0, true, true, "d3"], 
    [boc, d4, 0, true, true, "d4"], 
    [boc, d5, 0, true, true, "d5"], 
    [boc, d6, 0, true, true, "d6"], 
    [boc, d7, 0, true, true, "d7"], 
    [boc, d8, 0, true, true, "d8"], 
    [boc, d9, 0, true, true, "d9"], 
    [boc, d10, 0, true, true, "d10"], 
    [boc, dj, 0, true, true, "dj"], 
    [boc, dq, 0, true, true, "dq"], 
    [boc, dk, 0, true, true, "dk"], 
    [boc, h1, 0, true, true, "h1"], 
    [boc, h2, 0, true, true, "h2"], 
    [boc, h3, 0, true, true, "h3"], 
    [boc, h4, 0, true, true, "h4"], 
    [boc, h5, 0, true, true, "h5"], 
    [boc, h6, 0, true, true, "h6"], 
    [boc, h7, 0, true, true, "h7"], 
    [boc, h8, 0, true, true, "h8"], 
    [boc, h9, 0, true, true, "h9"], 
    [boc, h10, 0, true, true, "h10"], 
    [boc, hj, 0, true, true, "hj"], 
    [boc, hq, 0, true, true, "hq"], 
    [boc, hk, 0, true, true, "hk"], 
    [boc, s1, 0, true, true, "s1"], 
    [boc, s2, 0, true, true, "s2"], 
    [boc, s3, 0, true, true, "s3"], 
    [boc, s4, 0, true, true, "s4"], 
    [boc, s5, 0, true, true, "s5"], 
    [boc, s6, 0, true, true, "s6"], 
    [boc, s7, 0, true, true, "s7"], 
    [boc, s8, 0, true, true, "s8"], 
    [boc, s9, 0, true, true, "s9"], 
    [boc, s10, 0, true, true, "s10"], 
    [boc, sj, 0, true, true, "sj"], 
    [boc, sq, 0, true, true, "sq"], 
    [boc, sk, 0, true, true, "sk"], 
                    ] 
    

// Ref that contains data for 
// the dropdown menu that will
// show cards:
const cardsOptionsList = useRef(
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
                          )


// Ref that contains info for 
// the suits dropdown menu:
const suitsOptionsList   = useRef(
  [
    {src: club, text: "c"},
    {src: diamond, text: "d"},
    {src: heart, text: "h"},
    {src: spade, text: "s"}
  ]
                                 )

//----------------------------------------------------------
// The object that App passes to this component as 
// context. The object contains setters for boolean
// state properties of <App/> that conditionally 
// render each table of cards and their key memory
// image texts:  
const cardsKeyImageTextsObject = useContext(KeyMemImageTextsContext)


//----------------------------------------------------------
// A ref to hold the counter.
// The click handler for the Next card button
// increments this counter with every click
// of that button.
// The value of this counter is 
// (card the user wants to see)-1,
// eg if the user clicks First card 
// the value of this counter is 0.
// If nextCardCounter === 13 then
// the user has asked to see card 14
// (ie has clicked the Next card 
// button to see the 14th card):
const nextCardCounter = useRef(-1);

// a function to increment the value of the counter:
function incrementCounter(){
nextCardCounter.current += 1
                           }

//-----------------------------------------------------------------

// A state property to do with the modal.
// This component passes this in to
// <Modal/> as props.
// REMEMBER: React docs say that any state property
// that is an object must be treated as read only,
// ie to change one property you have to relpace the 
// whole object! use spread operator to change only 
// one properry of many (use many times to deal with 
// nested objects because spread operator does a 
// shallow copy). 

const [modalObject, setModalObject] = useState(
  {
    showModal: false,  // OK and Cancel buttons in <Modal> set this to false (to dismiss the modal)
                       
    messageText: "",   // The text that will appar in the modal. 
                       
    showOrNot: false,  // true -> show the modal, false -> hide the modal. 
                       
    selfDismiss: true, // true -> make modal vanish after a fews seconds, false -> user has to dimiss modal
                       
    whichModalButtonClicked: null, // The OK and Cancel buttons in <Modal/> set this to "OK" or "Cancel"                   
  }
                                              )
//----------------------------------------------------------
// A state property that is a boolean that 
// code sets when it wants to put a blocking screen 
// over the timer:
const [blockScreen, setBlockScreen] = useState(true)





//----------------------------------------------------------
// A ref that will hold three data
// in the form of strings:
// i)   the date of the attempt
// ii)  the time of the attempt
// iii) the time taken to memorise the cards.
// The onClick handler of the Check button
// reads this data and passes it on to 
// component <App/>, which  makes the table 
// out of it:
const timeDateTimeTaken = useRef(
{
data: "",
time: "",
timeTaken: "",
}
                                )


// A function that this component uses in 
// checkCards() to set ref timeDateTimeTaken.
// Each arg is a string:
function setTimeAndDate(time, date){
  // console.log(`In setTimeDateTimeTaken`)
  timeDateTimeTaken.current.date = date
  timeDateTimeTaken.current.time = time
                                  }


// A function that this component passes in
// to <Timer/> to set ref timeDateTimeTaken.
// The arg is a string:
function setTimeTaken(timeTaken){
  // console.log(`In setTimeTaken`)
  timeDateTimeTaken.current.timeTaken = timeTaken
                                }




// A function to make two strings:
// i)   one for the time of day
// ii)  one for the date:
function makeTimeAndDateString(){
  
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]

  const d = new Date();
  let year = d.getFullYear();
  year = year.toString()
  if (year.startsWith('20')) {
    year = year.replace("20", '');  
                             }
  let month = months[d.getMonth()];
  let date = dates[d.getDate()];
  let day = days[d.getDay()]; // eg "Monday"
  let hours = d.getHours()
  let minutes = d.getMinutes();

  let timeString = hours + "h" + ":" + minutes + "m" 
  // eg "13h:08m"
  let dateString = day + " " + date + month + year 
  // eg Mo 08May2023

  return {currentTimeString: timeString, dateString: dateString}
                            } // end fn makeTimeAndDateString



// A state property that this component passes in to
// <Timer/> as props. The onClick handler for the 
// New deck button calls increments this state 
// property, causing a useEffect in <Timer/> to 
// run that calls a function that resets te timer:

const [resetTimer, setResetTimer] = useState(0)

// TESTING ONLY:
useEffect(() => {
  // console.log(`In useEffect of <CardsContainer/> and resetTimer has changed`)    
              }, [resetTimer]);


//----------------------------------------------------------------------------

// A utility function to make up the
// members of array lookupTable.current:
function makeLookupTable(){
let tempArray = []
for (let i = 0; i < 52; i++) {
  tempArray.push({suit: null, card: null})
                             }
return deepCopyArray(tempArray)                             
                          }



// A ref that a function called by 
// the click handlers of the dd menu
// options call. 
const lookupTable = useRef(makeLookupTable())

// A function to reset ref lookupTable.
// The onClick handler for the Recall
// button (recallCards) calls this function:
function resetLookupTable(){
lookupTable.current = makeLookupTable()
                           }




// Stuff to do with the dropdown menus:

/*
<DropDownMenu/>'s prop optionsObject 
looks like this:

optionsObject looks like this:
  {
    ddMenuPositionCSSclass: "ddMenuPositioningDivLeft" // css class, positions menu in rect
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
*/

// Ref that contains info for the 
// <DropDownMenu/>'s prop optionsObject
// in the case of the cards dropdown
// menu: 
const cardsOptObj = useRef(
  {
    ddMenuPositionCSSclass: "ddMenuPositioningDivLeft",
    textCSSclass: "optionTextCSSclass",
    imageAndTextDivCSSclass: null,
    textDivCSSclass: "menuItemContainer",
    outerContainerCSSclass: "ddMenuOuterContainer",
    ulClass: "ulForDDownMenu",
    mainText: "Card",
    mainTextCSSclass: "optionTextCSSclass", 
    mainTextContainerCSSclass: "menuHeaderContainer",
    clickHandlerOne: changeRectsAndDDMenus,
    clickHandlerTwo: null,
    clickHandlerThree: null
  }
                        )

// A ref related to the one above:
const copiedCardsOptObj = useRef()


// Ref that contains info for the 
// <DropDownMenu/>'s prop optionsObject
// in the case of the suits dropdown
// menu: 
const suitsOptObj = useRef(
  { 
    ddMenuPositionCSSclass: "ddMenuPositioningDivRight",
    textCSSclass: null,
    imgCSSclass: "suitImg",
    imageDivCSSclass: "menuItemContainer",
    textDivCSSclass: null,
    imageAndTextDivCSSclass: null,
    outerContainerCSSclass: "ddMenuOuterContainer",
    ulClass: "ulForDDownMenu",
    mainText: "Suit",
    mainTextCSSclass: "optionTextCSSclass", 
    mainTextContainerCSSclass: "menuHeaderContainer",
    clickHandlerOne: changeRectsAndDDMenus,
    clickHandlerTwo: null,
    clickHandlerThree: null
  }
                        )


// Ref that contains info for the 
// <DropDownMenu/>'s prop optionsObject
// in the case of the suits dropdown
// menu: 
const cardsAreaSuitsOptObj = useRef(
  { 
    ddMenuPositionCSSclass: "ddPositionDiv",
    textCSSclass: null,
    imgCSSclass: "suitImg",
    imageDivCSSclass: "menuItemContainer",
    textDivCSSclass: null,
    imageAndTextDivCSSclass: null,
    outerContainerCSSclass: "ddMenuOuterContainer",
    ulClass: "ulForDDownMenu",
    mainText: "Suit",
    mainTextCSSclass: "optionTextCSSclass", 
    mainTextContainerCSSclass: "menuHeaderContainer",
    clickHandlerOne: showCardKeyMemImages,
    clickHandlerTwo: null,
    clickHandlerThree: null
  }
                        )




//----------------------------------------------------





//----------------------------------------------------
// A state property to hold an object that determines
// properties of the <ButtonOne/> component that is
// the Start/Stop button (a child of <Timer/>).
// Code in this comnponent changes the value of this
// state property, which gets passed in to <Timer/>
// a props:
let startStopButtonInfoObj = 
{
  buttonDivCSSclass: "mainButtonInoperable" ,
  pTextCSSclass: "mainButtonText" ,
  clickHandler: null,
  pText: "Start" 
}

const [startStopButtonInfo, setStartStopButtonInfo] = useState(startStopButtonInfoObj) 

// A function that makes the Start/Stop button inoperable
function makeStartStopButtonInoperable(){
  setStartStopButtonInfo(
{
  buttonDivCSSclass: "mainButtonInoperable" ,
  pTextCSSclass: "mainButtonText" ,
  clickHandler: null,
  pText: "---" 
}

                        )
                                        }




//----------------------------------------------------
   
// A state property that will contain an array whose members
// represent the 52 cards of the deck. Code will read this 
// array and based on what's in it create another array 
// (displayCards), each member of which will be jsx for a 
// card to show in the green felt area. In other words 
// array displayCards is a child of the div of 
// className="cardsContainer" (the grid div):
const [stateDeckToDisplay, setStateDeckToDisplay] = useState([])

// A ref whose value is either 0, 1, 2 or 3.
// React conditionally renders stuff in the grid depending
// on this value.
// when whatToShowInGrid.current === 0 -> show nothing
// when whatToShowInGrid.current === 1 -> show the play cards
// when whatToShowInGrid.current === 2 -> show the recall rects + dd menus and green ticks/red crosses
const whatToShowInGrid = useRef(0)



// A state property that will contain an array whose members
// each comprise jsx that describes: a div containing two 
// things:
// i)   the image of the back of a card
// ii)  two dd menus (one for selecting card number, the 
//      other for selecting card suit) 
// When the user clicks the Recall button, rectsAndDDMenus 
// gets put into the grid (ie the div of 
// className="cardsContainer"):
const [rectsAndDDMenus, setRectsAndDDMenus] = useState()

// A ref that the click handlers for the dd menus 
// on the backs of cards change. This holds an array that 
// the click handler for the Recall button will 
// put into state property rectsAndDDMenus, triggering
// a rerender. The line below intialises this ref to
// an array whose members each are jsx for a rect
// that contains two dd menus and an image but the
// image has no src:
const recallCardsToDisplay = useRef(makeRectsAndDDMenus())


// A function to put the array recallCardsToDisplay
// into state property rectsAndDDMenus (thus 
// triggering a rerender):
function redrawRectsAndDDMenus(){
    setRectsAndDDMenus([...recallCardsToDisplay.current])
                                }
// NOTE: you have to use the spread operator above.
// If you use the deepCopyArray function instead 
// you get an error message saying something like 
// "objects cannot be children of components in 
// React, try using an array instead"! WORK OUT WHY!!!!

//---------------------------------------------------------------------------



//---------------------------------------------------------------------------

// Code surrounding the Recall button
//-----------------------------------

// A function called by function recallCards
// (the onClick handler for the Recall button).
// This function determines how many cards the
// user has overturned and 
// 1) if no cards, make self-dismissing modal show 
//    with an appropriate message
// 2) if 1-51 cards make non-self-dismissing modal 
//    show with appropriate message
// 3) if the user has memorised the whole deck
//    DO NOT show the modal. Simply return "Whole deck"
function displayModal(numberOfCardsMinusOne){
  // Remember that no cards overturned means numberOfCardsMinusOne = -1
  // 1): 
  if (numberOfCardsMinusOne === -1 ) {  // user has not overturned any cards yet
    setModalObject(
      { ...modalObject,
        messageText: "You must turn over a card before you can go to the recall stage", 
        showOrNot: true, 
        selfDismiss: true, 
      }
                  )
      return ("Zero cards")
                                     }  // end first if

// 2):
if (numberOfCardsMinusOne > -1 && numberOfCardsMinusOne <51) {  // user has overturnd 1-51 cards
  if (numberOfCardsMinusOne === 0) {
    setModalObject(
      { ...modalObject,
        messageText: `You have turned over only one card. Continue to the recall stage anyway?`, 
        showOrNot: true, 
        selfDismiss: false,
      }
                  ) 
                  return ("Less than a deck") 
                                   }

  if (numberOfCardsMinusOne > 0 ) {
    setModalObject(
      { ...modalObject,
        messageText: `You have turned over only ${numberOfCardsMinusOne +1 } cards. Continue to the recall area anyway?`, 
        showOrNot: true, 
        selfDismiss: false,
      }
                  )
                return ("Less than a deck")                 
                                  }       
                                                                 } // end second if

if (numberOfCardsMinusOne === 51 ) { // user has memorised all 52 cards
  return ("Whole deck")                   
                                   } // end third if
                                              } // end displayModal()




// The click handler for the Recall button.
// This fn has to:
// 6) Put the blocking screen in front of <Timer/>, to 
//    prevent the user from using the timer.
// 5) Reset ref recallCardsToDisplay to an array of 52 members,
//    each JSX representing a card back and the two dropdowns. 
//    Here read the number of cards the user attempted and for 
//    the remaining cards add a black 0.7 opacity screen to make
//    the remaining cards' dds unusable.
//    Also reset ref lookupTable. 
// 1) Stop the timer
// 2) Record the timer time, save to ref xxxx
// 3) Record current time and date, save to ref xxxx
// 4) Find out how many cards the user has overturned
//    and:
//    i)   if 0 show the self-dismissing modal with appropriate message;
//         while the message is showing, stop the clock, and fade and
//         make inoperable the Next card and New deck buttons. Once the
//         modal has gone away make those buttons operable again and 
//         restart the clock from where it left off.
//    ii)  If >0 and <52 show the user-dismissable modal with 
//    the appropriate message. The modal must two buttons:
//        a) Cancel
//           Clicking this causes the modal to disappear.
//        b) Continue
//           Clicking this causes the modal to disappear and 
//                                                         
//    iii)  If 52 carry on 
// 
function recallCards(){
// 6):
setBlockScreen(true)   
// 5):
toastRecallCardsToDisplay()
recallCardsToDisplay.current= makeRectsAndDDMenus()
resetLookupTable()
// 1):
stopTimerTrigger.current += 1

// 2):


// 3): 
// let timeAndDateObject = makeTimeAndDateString()
//  {currentTimeString: timeString, dateString: dateString}

  // 4):
// modalResult below will have one of three values:
// ii) "Less than a deck", when the user has overturned 1-51
//    cards. This is when code must show the modal with 
//    buttons "OK" and "Cancel". 

// i) "Zero cards", when the user has not overturned any 
//    cards (and obviously mistakenly clicked button "Recall").
//    Here the se;f-dosmissing modal shows.

// iii) "Whole deck", when the user has overturned all 52 cards.
//    Here code must stop the timer and take the user to the recall stage:

// displayModal shows the appropriate modal
let modalResult = displayModal(nextCardCounter.current)
if (modalResult === "Whole deck") {
  stopTimerTrigger.current += 1  
  respondToModalOK()  
                                  }

                      } // end recallCards


// A function that responds to the click of the Cancel button
// of the modal. This component passes this function in to 
// <Modal/> as props. This function 
// 1) restarts the timer
// 2) removes the blocking screen in front of <Timer/>:
function respondToModalCancel() {
// 2):
setBlockScreen(false)
  // 1): 
  startTimerTrigger.current += 1
                                }


// A function that responds to the click of the OK button
// of the modal. This component passes this function in to 
// <Modal/> as props:
// 2) Make Next card button inoperable
// 3) Make <Timer/>'s Stop/Start button change its
//    text to "---" and make it inoperable
// 4) Make the Recall button faded and inoperable
// 5) Show the backs of cards + dd menus 
// 6) Put 52 divs on the baize, each containing: 
// i)   the dd menu for card number and the dd menu for suit
// ii)  an img, initially for the back of a card, later for its face 
function respondToModalOK() {    
  // 1):
  // a):

  // 2):
  setNextCardButtInfo(
    {
      buttonDivCSSclass: "mainButtonInoperable" ,
      pTextCSSclass: "mainButtonText" ,
      clickHandler: showNextCard ,
      pText: "---" 
    }                )

  // 3) 


  // 4):
  setRecallButtInfo (
    {
      buttonDivCSSclass: "mainButtonInoperable" ,
      pTextCSSclass: "mainButtonText" ,
      clickHandler: null,
      pText: "Recall" 
    }
                    )

  // 5): 
  whatToShowInGrid.current = 2
  // 6):
  redrawRectsAndDDMenus()
                                  }
  



  
//---------------------------------------------------------------------------

// A function to create the array that will go into state 
// property rectsAndDDMenus. 
// Each members will contain the same jsx, which will
// describe a card, face down, with two dd menus superimposed 
// on it. Additionally if the user has attempted to memorise 
// the first n cards, where n < 52, the array members from 
// n+1 to 52 (from indexes n to 51) will also include jsx for
// a div of black background and opacity 0.7 that sits above
// the jsx for the dds and the card back and prevents the user 
// from using the dds:
function makeRectsAndDDMenus(){
let tempArray = []
for (let i = 0; i < 52; i++) {
  tempArray.push(
    (
<div className="containerForBackOfCard" key={i}> 
        {/* An overlay screen that blocks the 
        the back of the card abd the dds for 
        cards (n+1) to 52, where the user has
        attempted to memorise n cards (n being 
        less than 52 and having value 
        nextCardCounter.current +1) : */}
        <div className={(i > nextCardCounter.current) ? "recall-card-blocking-screen" : null }></div>

        {/*The back of a card: */}
        <img className="recallCard" src = {boc}/>

        {/*The cards dropdown menu: */}
         <DropDownMenu 
         optionsList = {cardsOptionsList.current}
         optionsObject={cardsOptObj.current}
         dataVar = {i}
         type = "text"
         /> 
      
        {/*The suits dropdown menu: */}
         <DropDownMenu
         optionsList = {suitsOptionsList.current}
         optionsObject={suitsOptObj.current}
         dataVar = {i}
         type = "image"
         />
</div>
    )
                )
                             }
return tempArray
                              }


//---------------------------------------------------------------------------------------

// The click handler for the options of the dd menus. 
// This function changes array 
// recallCardsToDisplay.current so that instead of 
// having 52 identical members that each contain 
// jsx for a back of a card and the two dds, instead 
// it will contain 52 members, each containing jsx that 
// describes one of two things:
// i)   a card back and the two dds
// ii)  a card front and the two dds. The card front
//      corresponds to the user's selection from the
//      dds. 
// This function must
// 1) Set the image of the appropriate rect div in 
// array recallCardsToDisplay according to the user's 
// selection in the dd menus
// 2) Set the text of the heads of the dd menus to what
// the user selects. 
// 3) set state property rectsAndDDMenus to the now changed
// recallCardsToDisplay.
// 4) Save the name of the src in an indexed array that 
// the Check button handler will read.
// 5) Make the Check button operable if the user has selected 
// both card and suit of at tleast one card.
// Args card and suit are strings and cardNumber is an int.
// Args card and suit are strings or null:
function changeRectsAndDDMenus(card, suit, cardNumber){
// 1):
// remember that lookupTable.current is an array that 
// looks like this:
// [
//  {card: null, suit: null}, 
//  {card: null, suit: null} 
//  ... \50 more\  
// ]
// So the code below looks for the array member of 
// index [cardNumber] and sets it card and suit properties
// to a card string and a suit string, respectively.

let joinedSRCstring = null

if (card) {
  lookupTable.current[cardNumber].card = card // eg "J"
          }

if (suit) {
  lookupTable.current[cardNumber].suit = suit // eg "c"
          }

// set joinedSRCstring to, eg, "cJ", for jack of clubs:
if (lookupTable.current[cardNumber].suit && lookupTable.current[cardNumber].card) {
  joinedSRCstring = lookupTable.current[cardNumber].suit.concat(
    lookupTable.current[cardNumber].card
                                                               ) // produces, eg, "cJ"
                                                                                  
// 3):
  recallCardsToDisplay.current[cardNumber] =
  (
    <div className="recallCardIMGandDDmenusContainer" key={cardNumber}>
    <img
    className="recallCard"
    src = {srcLookup.current[joinedSRCstring]}
    />
    {/*The cards dropdown menu: */}
   <DropDownMenu
   optionsList = {cardsOptionsList.current}
   optionsObject= { cardsOptObj.current  } //
   dataVar = {cardNumber}
   type = "text"
   /> 

    {/*The suits dropdown menu: */}
   <DropDownMenu
   optionsList = {suitsOptionsList.current}
   optionsObject= { suitsOptObj.current  }
   dataVar = {cardNumber}
   type = "image"
   /> 
  </div>
  )

// 4):
// Remember that each of the 52 members of memorisedCards.current
// look like this: {ordinal: i, card: null}
// memorisedCards.current[cardNumber].card = joinedSRCstring
memorisedCards.current[cardNumber].card = srcLookup.current[joinedSRCstring ]

// 5):
if (checkButtInfo.buttonDivCSSclass === "mainButtonInoperable") {
  setCheckButtInfo(
    {...checkButtInfo, buttonDivCSSclass: "mainButton" }
                  )
               }

                                                                                } // end if
  redrawRectsAndDDMenus()
                                                      }



// Now a function that the Recall button's onClick handler 
// (recallCards) calls to toast the array that contains 
// 52 members, each representing the back/front of a card
// and the two dds:
function toastRecallCardsToDisplay(){
  recallCardsToDisplay.current = []
                                    }




//---------------------------------------------------------------------------------------



// state property that contains 
// info for the Recall button:
  const [recallButtInfo, setRecallButtInfo] =  useState(
    {
      buttonDivCSSclass: "mainButtonInoperable" ,
      pTextCSSclass: "mainButtonText" ,
      // clickHandler: recallCards,
      pText: "Recall" 
    }
                                                      )


// state property that contains info
// for <Timer/>'s Start/Stop button:
const [startStopButtInfo, setStartStopButtInfo] =  useState(
  {
    buttonDivCSSclass: "mainButtonInoperable" ,
    pTextCSSclass: "mainButtonText" ,
    // clickHandler: recallCards,
    pText: "---" 
  }
                                                           )





// state property that contains 
// info for the Check button:
const [checkButtInfo, setCheckButtInfo] =  useState(
  {
    buttonDivCSSclass: "mainButtonInoperable" ,
    pTextCSSclass: "mainButtonText" ,
    clickHandler: checkCards,
    pText: "Check" 
  }
                                                  )



// State property that contains 
  // info for the Next card button:
  const [nextCardButtInfo, setNextCardButtInfo] = useState(
    {
      buttonDivCSSclass: "mainButtonInoperable" ,
      pTextCSSclass: "mainButtonText" ,
      clickHandler: showNextCard ,
      // clickHandler: nextCardTestClickHandler ,
      pText: "Next card" 
    }
                                                          )  

  // State property that contains 
  // info for the New deck button:
  const [newDeckButtInfo, setNewDeckButtInfo] = useState(
    {
      buttonDivCSSclass: "mainButton" ,
      pTextCSSclass: "mainButtonText" ,
      clickHandler: makeNewShuffledDeckAndShowCardBacks,
      pText: "New deck" 
    }
                                                        )  

//----------------------------------

// Utility function to produce a random number 
// between max and min inclusive (function 
// comes from MDN):
let getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
                                                } // end getRandomIntInclusive

//----------------------------------

// A utility function to make 
// a deep copy of an array and 
// return it:
function deepCopyArray(arrayArg){
  let arrayCopy = JSON.parse(JSON.stringify(arrayArg));
  return arrayCopy
                             }

//----------------------------------

// A utility function that operates on an
// array of arrays. The member arrays must have 
// two members themselves.
// This function looks at each member array 
// and adds a number as its index[2] member.
// The number is the index of the member array.
// This is useful for providing a key to the 
// array of arrays if code will apply the 
// map() function to it in React.
function addKeysForMapFunction(arrayArg){
  for (let i = 0; i < arrayArg.length; i++) {
    arrayArg[i][2]= i  
                                             }
                                        }


//----------------------------------


// A ref to hold array that represents a 
// shuffled deck:
const shuffledDeck = useRef();

// A ref to hold an array that will be
// a copy of shuffledDeck.current, will
// be changed and will then be
// copied into the state property 
// array stateDeckToDisplay
const deckToDisplay = useRef();

//----------------------------------

// A function to create an array to represent
// a new shuffled deck and put it into the 
// ref shuffledDeck.current.
// The click handler for the New deck button 
// calls this function, which must:
// 1) make new shuffled deck and
//    store the new shuffled deck
// 2) reset the counter to -1:
function makeAndStoreNewShuffledDeck(){
// 1):
// The following line is absolutely necessary:
shuffledDeck.current = JSON.parse(JSON.stringify(shuffleArrayMembers(unshuffledDeck)))
// 2):
nextCardCounter.current = -1
                                      }

//----------------------------------
// A ref for memorised cards:
const memorisedCards = useRef([])

// Make the array for memorised cards once only:
useEffect(() => {
for (let i = 0; i < 52; i++) {
  memorisedCards.current.push({status: null, card: null, ordinal: i})
                             }
                }, []);


// A state property that will contain the 
// array whose members comprise jsx for 
// a card plus green tick/red cross/"Don't know":
const [stateCheckArray, setStateCheckArray] = useState()


// An array of 52 members, each of which will
// comprise jsx describing either:
// i)   a div (for the grid) that contains the 
//      card the user chose and a green tick
// ii)  a div (for the grid) that contains the 
//      card the user chose and a red cross
// iii) a div (for the grid) that contains the 
//      text "Don't know"
const checkArray = useRef([])



// The click handler for the Check button.
// This handler should 

// 4)   Read the memorised cards
//      Compare the memorised cards with those in 
//      shuffledDeck.current and in the grid show an
//      overlying semi-transparent green tick/red cross 
//      for the card in question.
// 5)   grab the data about number of cards recalled 
//      correctly/incorrectly/don't know and the number
//      of cards attempted
//      Also grab the time taken, time and date (which the onClick 
//      handler for <Timer/>'s Start/Stop button set when 
//      the user clicked that button after having overturned
//      the 52nd card) and send that data to <App/> to create 
//      the table.
// 6)   make the Check button inoperable


function checkCards(){
// 4):
// memorisedCards.current is an array that contains 52
// members that each looks like this, each a representation
// of a user's attempt at memorising a card: 
// {status: null, card: cJ, ordinal: 45} .
// The 52 members of shuffledDeck.current look like this,
// each a card in the shuffled deck:
// [boc, d8, 0, true, true, "d8"].
// Now make array checkArray.current to contain 52 members, 
// each containing jsx that is one of three types:
// i)    jsx that describes a card face with an overlayed green tick
//       (to indicate that the user's attempt at that card was correct)
// ii)   jsx that describes a card face with an overlayed red cross
//       (to indicate that the user's attempt at that card was incorrect)
// iii)  jsx that describes a card back with an overlay of text "Don't know" 
//       (to indicate that the user didn't attempt to recall that card)

// First toast the old checkArray.current:
checkArray.current = []

for (let i = 0; i < 52; i++) {
  if (
    memorisedCards.current[i].card === shuffledDeck.current[i][1] 
     ){ // 4) i):
      memorisedCards.current[i].status = "correct"
      checkArray.current.push(
        <div className = "cardScene" key={i}>
          <div className="tickCrossOrDkImgContainer">
          <img  style = {{opacity: 0.7}} className = "cardImg" src={greenTick}></img>
          </div>
          <div className="cardFrontImgContainerNoRotation" >
            <img className = "cardImg" src={shuffledDeck.current[i][1]}></img>
          </div>
        </div>
                             )
      }
if (  // if the card in memorisedCards.current does not match the one in shuffledDeck.current 
    memorisedCards.current[i].card !== shuffledDeck.current[i][1] 
   ) { // The card in memorisedCards.current can be one of two things: null or wrong:
    // if the user did not remember the card at all (null):
    if (   // 4) iii):
      memorisedCards.current[i].card === null
       ) {
        memorisedCards.current[i].status = "dk" // don't know
        checkArray.current.push(
          <div className = "cardScene" key={i}>
            <div className="tickCrossOrDkImgContainer">
            <img className = "dontKnowImg" src={dontKnow}></img>
            </div>
            <div className="cardFrontImgContainerNoRotation" >
              <img className = "cardImg" src={boc}></img>
            </div>
          </div>
                               )

         } else {    // 4) ii):
          // if the user recalled the card incorrectly (wrong):
memorisedCards.current[i].status = "incorrect"
checkArray.current.push(
  <div className = "cardScene" key={i}>
    <div className="tickCrossOrDkImgContainer">
    <img  style = {{opacity: 0.7}} className = "cardImg" src={redCross}></img>
    </div>
    <div className="cardFrontImgContainerNoRotation" >
      {/**/} 
      {/*<img className = "cardImg" src={shuffledDeck.current[i][1]}></img>*/}
      <img className = "cardImg" src={memorisedCards.current[i].card}></img>
    </div>
  </div>
                       )
                }
     }
                             } // end for
// So now memorisedCards.current contains members that 
// are like this:
// i)   {status: null, card: null, ordinal: 45}         // user didn't recall
// ii)  {status: "correct", card: "d2", ordinal: 46}    // user recalled correctly
// iii) {status: "incorrect", card: "s9", ordinal: 47}  // user recalled incorrectly,
// and checkArray.current contains 52 members, each comprising
// jsx that describes either:
// i)   a div (for the grid) that contains the 
//      card the user chose and a green tick
// ii)  a div (for the grid) that contains the 
//      card the user chose and a red cross
// iii) a div (for the grid) that contains the 
//      text "Don't know" 
// 

whatToShowInGrid.current = 3
setStateCheckArray([...checkArray.current])
// NOTE: you have to use the spread operator above.
// If you use the deepCopyArray function instead 
// you get an error message saying something like 
// "objects cannot be children of components in 
// React, try using an array instead"! WORK OUT WHY!!!!

// 6):
setCheckButtInfo(
  {
    buttonDivCSSclass: "mainButtonInoperable" ,
    pTextCSSclass: "mainButtonText" ,
    clickHandler: checkCards,
    pText: "Check" 
  }
                )


//5):
// Passed-in prop setTimesAndScores is a function that takes one arg: 
// an object that looks like this:
// {key: 0, time: "2hrs23mins19s", date: "4May23", scores: {correct: 45, incorrect: 5, dontKnow: 2}}
// Remember that memorisedCards.current contains 52 members that 
// are like this:
// i)   {status: "dk", card: null, ordinal: 45}         // user didn't recall the card
// ii)  {status: "correct", card: "d2", ordinal: 46}    // user recalled the card correctly
// iii) {status: "incorrect", card: "s9", ordinal: 47}  // user recalled the card incorrectly,
let numberOfCorrect = 0
let numberOfIncorrect = 0
let numberOfDontKnow = 0
for (let i = 0; i < 52; i++) {
  if (memorisedCards.current[i].status === "dk") {
    numberOfDontKnow += 1
                                                 }
if (memorisedCards.current[i].status === "correct") {
  numberOfCorrect += 1
                                                    }
if (memorisedCards.current[i].status === "incorrect") {
  numberOfIncorrect += 1
                                                      }
                              } // end for


let timeAndDateObject = makeTimeAndDateString()
// Set object in ref timeDateTimeTaken.current
// (timeAndDateObject looks like this: {currentTimeString: timeString, dateString: dateString} )
setTimeAndDate(timeAndDateObject.currentTimeString, timeAndDateObject.dateString)

// Make an object that contains all of the info that
// must go in the table. Code will pass this object
// to <App/>, which add it to the existing data for 
// the table and then pass that updated info to 
// <Table/>, which will make the table out of the info:
let tableRowData = {
  key: null, 
  numOfCardsAttempted: (nextCardCounter.current +1), 
  timeTaken: timeDateTimeTaken.current.timeTaken, 
  time: timeDateTimeTaken.current.time, 
  date: timeDateTimeTaken.current.date, 
  scores: { 
            correct: numberOfCorrect, 
            incorrect: numberOfIncorrect, 
            dontKnow: numberOfDontKnow
          }
               }

// send object tableRowData to <App/>, which will
// add it to existing data and send the new data 
// to <Table/>, which will display it in a table:
setTimesAndScores(tableRowData)


                     } // end checkCards




//-----------------------------------

// A function to get the current time and date
// and convert it into this format:
// 13.08 Mon 8 May 2023:

function makeTimeAndDateString(){
  
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]

  const d = new Date();
  let year = d.getFullYear();
  year = year.toString()
  if (year.startsWith('20')) {
    year = year.replace("20", '');  
                             }
  let month = months[d.getMonth()];
  let date = dates[d.getDate()];
  let day = days[d.getDay()]; // eg "Monday"
  let hours = d.getHours()
  let minutes = d.getMinutes();

  let timeString = hours + "h" + ":" + minutes + "m" 
  // eg "13h:08m"
  let dateString = day + " " + date + month + year 
  // eg Mo 08May2023

  return {currentTimeString: timeString, dateString: dateString}
                            } // end fn makeTimeAndDateString





//-------------                                              



// The click handler for the 
// New deck button.
// This function has to:
// 0) make the screen that clocks the <Timer/>
//    go away
// 1) make a new shuffled deck and 
// put it in ref shuffledDeck.current
// 2) Enable the Next card button and 
// set its text to First card
// 3) set whatToShowInGrid.current to 1
// 4) Enable the Recall button
// 5) Stop the timer and reset it to 0:0:0
// 6) set stateDeckToDisplay to the new shuffled
// deck. This will cause a rerender and show
// the cards in the grid (above the green felt)
function makeNewShuffledDeckAndShowCardBacks(){
// 0): 
setBlockScreen(false)
  // 1):
makeAndStoreNewShuffledDeck()
// ref shuffledDeck.current now contains 
// a newly shuffled deck
// 2):
setNextCardButtInfo(
  {
    buttonDivCSSclass: "mainButton" ,
    pTextCSSclass: "mainButtonText" ,
    clickHandler: showNextCard ,
    pText: "First card" 
  }              )

// 3):   
  whatToShowInGrid.current = 1

// 4):
// Remember that recallButtInfo looks like this:
/*
{
  buttonDivCSSclass: "mainButtonInoperable" ,
  pTextCSSclass: "mainButtonText" ,
  // clickHandler: recallCards,
  pText: "Recall" 
}
*/
setRecallButtInfo(
  {
  ...recallButtInfo, buttonDivCSSclass: "mainButton"
  }
                   )

// 5):
// increment resetTimer, which is 
// passed in as props to <Timer/>,
// where every time resetTimer 
// changes a useEffect runs that 
// calles a <Timer/> function that 
// resets the timer:
setResetTimer(prevValue => prevValue +1)

// 6):
changeStateDeckToDisplay(shuffledDeck.current)
                                              }

//-----------------------------------------------------------------

// A ref to hold a trigger. this component passes the value of 
// this ref in to <Timer/>, causing that component's startTimer  
// function to run.
// The Next card button's click handler increments this ref
// to call the <Timer/> function that starts the timer
const startTimerTrigger = useRef(0)

//-------

// A ref to hold a trigger. this component passes the value of 
// this ref in to <Timer/>, causing that component's stopTimer  
// function to run.
// The Next card button's click handler increments this ref
// to call the <Timer/> function that stops the timer
const stopTimerTrigger = useRef(0)


//-----------------------------------------------------------------


// A function that the click handler for the Next card button
// will call. This function must:
// 2) Change the array in shuffledDeck.current
//    that represents the card in question
//    (which depends on the value of the counter)
// 3) When the user has clicked Next card 52 
//    times make the Next card button inoperable
//    and faded
// 4) Change the text of the Next card button 
//    from First card to Next card or from 
//    Next card to last card:
function changeDeckToDisplay(){

// The value of the counter 
// is (card the user wants to see)-1,
// eg if nextCardCounter === 13 then
// the user wants to see card 14.

// For all clicks of the button up to 
// and including the one that means 
// the user wants to see the 52nd card:
if (nextCardCounter.current < 52) {
    
if (nextCardCounter.current === 50) {
  setNextCardButtInfo(
    {
      buttonDivCSSclass: "mainButton" ,
      pTextCSSclass: "mainButtonText" ,
      clickHandler: showNextCard ,
      pText: "Last card" 
    } 
                     )
                                    } // end if



// 2):
// If the user has clicked Next card
// for the first time the app must make 
// the first card turn to show its face:
if (nextCardCounter.current === 0) {
  // 4):
  setNextCardButtInfo(
    {
      buttonDivCSSclass: "mainButton" ,
      pTextCSSclass: "mainButtonText" ,
      clickHandler: showNextCard ,
      pText: "Next card" 
    } 
                     )

  shuffledDeck.current[nextCardCounter.current][4] = false// show current card's face 
  shuffledDeck.current[nextCardCounter.current][3] = false//  show current card face WITH turning effect 
                                   } // end if

// If the user has clicked Next card
// for the 2nd-52nd time make the previous card
// show its face without turning it and make 
// the current card turn to show its face
// after turnng it:
if (1 <= nextCardCounter.current && nextCardCounter.current <=51) {
  shuffledDeck.current[nextCardCounter.current-1][4] = false// show previous card face   
  shuffledDeck.current[nextCardCounter.current -1][3] = true// show previous card face WITHOUT turning effect
  shuffledDeck.current[nextCardCounter.current][4] = false// show current card face 
  shuffledDeck.current[nextCardCounter.current][3] = false//  show current card face WITH turning effect 
                                                                  } // end if
                                 } // end if nextCardCounter <52

// 3):                                                                
if (nextCardCounter.current > 50) {

    setNextCardButtInfo(
        {
          buttonDivCSSclass: "mainButtonInoperable" ,
          pTextCSSclass: "mainButtonText" ,
          clickHandler: showNextCard ,
          pText: "---" 
        }              )
                                  } // end if

                              } // end changeDeckToDisplay

//----------------------


// The click handler for the Next card button.
// This function must 
// 1) Start the clock if it is not running,
//    do nothing if it is
// make the next card turn
// by:
// 2) increment the counter
// 3) make appropriate changes to 
//    deckToDisplay.current
// 4) Set state property stateDeckToDisplay to 
//    deckToDisplay.current. This causes the re-render
function showNextCard(){
// 1) 
// Increment the value of startTimerTrigger
// (which will trigger a useEffect callback 
// in <Timer/> that starts the timer if it's
// not already running):
startTimerTrigger.current += 1 
  //2):
  incrementCounter()
  // console.log(`In showNextCard and the counter has value ${nextCardCounter.current}`)
  // 3):  
  changeDeckToDisplay()
  // 4):
    changeStateDeckToDisplay(shuffledDeck.current)
                       }

//-------------

// Now fn shuffleArrayMembers to 
// 1) create an array of 52 shuffled cards 
// and return it.
// This function takes one arg, 
// the array to shuffle.
// NOTE This function simply shuffles 
// randomly the members of ANY array
// of any length:
function shuffleArrayMembers (arrayArg) {
  let aRandomNumber ;
  let playPack = [] ;
  // An array for used random numbers:
  let usedRandomNumbers = [] ;
  //
      do {
  // Generate a random number between 1 and arrayArg.length:
  aRandomNumber = getRandomIntInclusive( 0 , arrayArg.length-1  )
  
  // If the random number has not already been generated:
  if (!usedRandomNumbers.includes(aRandomNumber)) {
  // Push the (aRandomNumber)th card from array arrayArg into array playPack:
  playPack.push(arrayArg[aRandomNumber])
  // Put the just-created random number into array usedRandomNumbers:
  usedRandomNumbers.push(aRandomNumber)
                                                  } // end if
         } // end do
  // Stop picking a random card from array arrayArg when 
  // usedRandomNumbers contains arrayArg.length random numbers:
      while (usedRandomNumbers.length < arrayArg.length); // NOTE tricky! must be arrayArg.length!!!!
      addKeysForMapFunction(playPack)
      return playPack
                                    } // end shuffleArrayMembers
  

//--------------------

let myArray = shuffleArrayMembers(unshuffledDeck)

//--------------------

// CODE TO DO WITH WHAT GOES ONTO THE GREEN FELT:
//-----------------------------------------------------------------------------------------------

// A function that the click handler for 
// the New deck button calls. 
// This function must:
// 1) make an array each member of which 
// is the jsx for a card, either the face 
// or the back of the card
// 2) set stateDeckToDisplay to that array,
// thus triggering a rerender.
// Remember that xxxx:

function changeStateDeckToDisplay(arrayArg){
setStateDeckToDisplay (
  arrayArg.map((memberArray)=>{
    return    (
    memberArray[4] ? // if true, show the back of the card:
    ( <div className = "cardScene" key={memberArray[2]}>
      <div className="cardFrontImgContainerNoRotation" >
            <img className = "cardImg" src={memberArray[0]}></img>
      </div>
      </div>) 
    : // if false, show the card face with turning effect or without
    (<div className = "cardScene" key={memberArray[2]}> 
    <div className = {memberArray[3] ?
         "cardNoRotate" // if true simply show the card face
         : 
         "cardRotate"}> {/* if false use the turning effect to show the card face*/} 
          
          <div className="cardBackImgContainer" > {/* card back is facing the user*/} 
            <img className = "cardImg" src={memberArray[0]}></img>
          </div>
          
          <div className="cardFaceImgContainer" >  {/* card face is facing away from the user*/}  
            <img className = "cardImg" src={memberArray[1]}></img>
          </div>
     </div>
     </div>   )    
              )
} // end map() callback
) // end map 
) // setStateDeckToDisplay
                                          } // end changeStateDeckToDisplay



// A function to set the Recall button
// so that it is operable. This component 
// passes this function in to <Timer/> 
// as props because simply passing in 
// state setter setRecallButtInfo to 
// <Timer/> didn't always set the 
// onClick handler of hte Recall button:
function makeRecallButtonOperable (){
  setRecallButtInfo({...recallButtInfo, buttonDivCSSclass: "mainButton" })
                                    }


// The onClick handler for the options
// of the cards area dd list. This function
// has ultimately to show the window that 
// holds the table of cards and their image 
// texts (for a given suit).
// This function 
// 1) must take three args (because that's
// how the dd is set up):
// null, member.text and dataRef.current
// but only do anything with the second 
// (textArg, which is a string for the suit, 
// "c", "d", "h" or "s"). The third arg 
// will be null.
// 2) change the appropriate state property
//    of <App/> to make the window show. Do
//    this by calling a function of <App/>
//    that this component has acess to via 
//    context (function showImageTextsTable):
function showCardKeyMemImages(argOne, textArg, argThree){ // 1)
// 2) 
  cardsKeyImageTextsObject.showImageTextsTable(textArg)
                                                        }


//--------------------------------------------------------------------------------------------
// RENDERING BEGINS
//--------------------------------------------------------------------------------------------

return (
<div className="cardContainerAllEnclosingDiv">

{/*The div above contains two divs:

1) div className="cardsContainer"
This is a 13x4 grid that will contain
the cards (the card backs, the card fronts,
  the card backs plus dd menus) 

2) div className= "cardsAreaButtonsAndTimerContainer"
    This contains two elements:
    i)   div className = "cardsAreaButtonsContainer"
    ii)  <Timer/>
*/}



<div className="cardsContainer"> {/*This is the grid that contains four rows, each of 13 slots*/}

{/*whatToShowInGrid.current can have these three values:
1)  0   -> show nothing
2)  1   -> show play cards (backs or faces, depending on whether the user has overturned cards or not) -- stateDeckToDisplay
3)  2   -> show rects (ie backs of cards) and the two dd menus -- rectsAndDDMenus
4)  3   -> show the card plus green ticks/red crosses/"Don't know") -- stateCheckArray
*/}


{
whatToShowInGrid.current === 0 ? null 
: (whatToShowInGrid.current === 1 ? <>{stateDeckToDisplay}</> 
: (whatToShowInGrid.current === 2 ? <>{rectsAndDDMenus}</> 
: (whatToShowInGrid.current === 3 ? <>{stateCheckArray}</>
: null)) )
}


</div> {/* end div className="cardsContainer"*/}



{/*  cardsAreaButtonsAndTimerContainer  */}
<div className= "cardsAreaButtonsAndTimerContainer">
{/* The click handler for the following button must:
1) change <App/>'s deckToShow so that each member is 
   successively changed to allow a new card from 
   shuffledDeck to appear in the display window.
   This must also trigger a rerender of the display window
   (ie <CardsContainer/>)
*/}


{/* The div that contains the 
Next card and New deck buttons */}
<div className="cardsAreaButtonsContainer">

{/* Next card button */}
<ButtonOne 
buttonDivCSSclass = {nextCardButtInfo.buttonDivCSSclass} 
pTextCSSclass = {nextCardButtInfo.pTextCSSclass}  
clickHandler = {nextCardButtInfo.clickHandler}  
pText = {nextCardButtInfo.pText} 
/> 

{/* New deck button */}
<ButtonOne 
buttonDivCSSclass = {newDeckButtInfo.buttonDivCSSclass} 
pTextCSSclass = {newDeckButtInfo.pTextCSSclass}  
clickHandler = {newDeckButtInfo.clickHandler}  
pText = {newDeckButtInfo.pText} 
/> 

</div>

<Timer 
counter = {nextCardCounter.current}
startTimerTrigger = {startTimerTrigger.current}
stopTimerTrigger = {stopTimerTrigger.current}
// makeStartStopButtonInoperableTrigger = {makeStartStopButtonInoperableTrigger}
makeRecallButtonOperable = {makeRecallButtonOperable}
// setTimeDateTimeTaken = {setTimeDateTimeTaken}
setTimeTaken = {setTimeTaken}
resetTimer = {resetTimer}
blockScreen={blockScreen}
/>



{/* The div containing the Recall and Check buttons:*/}
<div className="cardsAreaCheckButtonContainer">
{/* Recall button */}
<ButtonOne 
buttonDivCSSclass = {recallButtInfo.buttonDivCSSclass} 
pTextCSSclass = {recallButtInfo.pTextCSSclass}  
/*     clickHandler = {recallButtInfo.clickHandler}     */
clickHandler = {recallCards}
pText = {recallButtInfo.pText} 
/> 

{/* Check button */}
<ButtonOne 
buttonDivCSSclass = {checkButtInfo.buttonDivCSSclass} 
pTextCSSclass = {checkButtInfo.pTextCSSclass}  
clickHandler = {checkButtInfo.clickHandler}  
pText = {checkButtInfo.pText} 
/> 

</div>

{/* The div containing the dd 
the user selects from to show 
a window that displays a table 
that contains the texts for
card key memory images: */}
<div className="cards-area-dd-container">
{/*The suits dropdown menu: */}
<p className="infoTextP">
  Info
</p>
<DropDownMenu
         optionsList = {suitsOptionsList.current}
         optionsObject={cardsAreaSuitsOptObj.current}
         dataVar = {null}
         type = "image"
/>
</div>



</div> {/* end div className= "cardsAreaButtonsAndTimerContainer" */}


{/* Remember that nodalObject looks like this: 
  {
    messageText: "",   // The text that will appar in the modal. 
                       // Passed in as props to <Modal/>
    showOrNot: false,  // true -> show the modal, false -> hide the modal. 
                       // Passed in as props to <Modal/>
    selfDismiss: true, // true -> make modal vanish after a fews seconds, false -> user has to dimiss modal
                       // Passed in as props to <Modal/>
  }
*/}


{/* The modal, condionally rendered: */}
<Modal
messageText = {modalObject.messageText} 
showOrNot = {modalObject.showOrNot}
setModalObject = {setModalObject}
selfDismiss = {modalObject.selfDismiss}
respondToModalCancel = {respondToModalCancel}
respondToModalOK = {respondToModalOK}
/>



</div>
)
                                                    }