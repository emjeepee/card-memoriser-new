import React, { useEffect, useState, createContext, useRef } from "react";

// Sass styles:
import '../scss/style.scss';

// Components:
import CardsContainer from  './CardsContainer.jsx';
import Table from  './Table.jsx';
import KeyImageText from  './KeyImageText.jsx';

// images:
import greenFelt from '../images/greenFeltLowQual.jpg'

// context:
export const KeyMemImageTextsContext = createContext()



/*
STRUCTURE OF THIS COMPONENT
This component contains 
div className="appOuterContainer",
which contains three divs:
1) div className="appContainerOne"
        -- <p> className="appHeader"

2) div className="appContainerTwo"
        -- div className="timesOuterContainer"
            -- div className="timesTextContainer"
                -- <p> className="timesText"
            -- div className="timesContainer"

3) div className="appContainerThree"
        -- div className="greenFeltContainer"
        -- <CardsContainer/>
            -- div className="cardContainerAllEnclosingDiv"
              -- div className="cardsContainer"
                -- 52 card divs here
              -- div className"cardsAreaButtonsContainer"
                -- div className="mainButton"
                -- div className="mainButton" 
            -- <Timer/>    
                -- div className="timerTextEnclosingDiv"     
                    -- div className="timerHoursContainer"
                      -- <p>
                    -- div className="timerMminutesContainer"
                      -- <p>
                    -- div className="timerSecondsContainer"
                      -- <p>
                    -- div className="timerButtonEnclosingDiv"
                      -- div className="mainButton"
                      -- div className="mainButton"      



*/



function App() {



// An object that stores the texts
// for the card key images:
const cardKeyImagesTextObject = useRef(
  {
  Clubs:  {
    ace:"",
    two:"",
    three:"",
    four:"",
    five:"",
    six:"",
    seven:"",
    eight:"",
    nine:"",
    ten:"",
    jack:"",
    queen:"",
    king:""
          },
  Diamonds:  {
    ace:"",
    two:"",
    three:"",
    four:"",
    five:"",
    six:"",
    seven:"",
    eight:"",
    nine:"",
    ten:"",
    jack:"",
    queen:"",
    king:""
          },
  Hearts:  {
    ace:"",
    two:"",
    three:"",
    four:"",
    five:"",
    six:"",
    seven:"",
    eight:"",
    nine:"",
    ten:"",
    jack:"",
    queen:"",
    king:""
          },
  Spades:  {
    ace:"",
    two:"",
    three:"",
    four:"",
    five:"",
    six:"",
    seven:"",
    eight:"",
    nine:"",
    ten:"",
    jack:"",
    queen:"",
    king:""
          },
  }
                                        )
  

// Four state variables that contain card texts 
// and card key image texts for the four suits: 
const [clubsTextsObject, setClubsTextsObject] = useState()
const [heartsTextsObject, setHeartsTextsObject] = useState()
const [diamondsTextsObject, setDiamondsTextsObject] = useState()
const [spadesTextsObject, setSpadesTextsObject] = useState()

// Four useEffect, each of which runs when a suit 
// textsObject changes, ie when the user clicks the OK button 
// in a <KeyImageTextRow/>.
// 1) for clubs:
useEffect(() => {
  // save the textsObject to localStorage:
  localStorage.setItem("clubsTextsObject", JSON.stringify(clubsTextsObject));
                }, [clubsTextsObject]);

// 2) for diamonds:
useEffect(() => {
  // save the textsObject to localStorage:
  localStorage.setItem("diamondsTextsObject", JSON.stringify(diamondsTextsObject));
                }, [diamondsTextsObject]);

// 3) for hearts:
useEffect(() => {
  // save the textsObject to localStorage:
  localStorage.setItem("heartsTextsObject", JSON.stringify(heartsTextsObject));
                }, [heartsTextsObject]);

// 4) for spades:
useEffect(() => {
  // save the textsObject to localStorage:
  localStorage.setItem("spadesTextsObject", JSON.stringify(spadesTextsObject));
                }, [spadesTextsObject]);



// Four refs follow (after the declaration of 
// baseTextsObject), each containing card texts 
// and card key image texts for a suit. These 
// texts are the default or initial 
// values. In the case of each member
// array of the array below  
// arrayMember[0] is the card text
// arrayMember[1] is the placeholder text for the input
// arrayMember[2] is an object with property key. this is for the map function
// arrayMember[3] is the card image text
// : 

let clubsBaseTextsObject = {
  Ace: {cardText: "Ace", placeholder: "Type new text here for Ace image", imageText: "Cat (the grey one)", key: 0},
  Two: {cardText: "Two", placeholder: "Type new text here for 2 image", imageText: "Can (Foster's lager)", key: 1},
  Three: {cardText: "Three", placeholder: "Type new text here for 3 image", imageText: "Camo", key: 2},
  Four: {cardText: "Four", placeholder: "Type new text here for 4 image", imageText: "Car", key: 3},
  Five: {cardText: "Five", placeholder: "Type new text here for 5 image", imageText: "Call (iPhone symbol)", key: 4},
  Six: {cardText: "Six", placeholder: "Type new text here for 6 image", imageText: "Cash", key: 5},
  Seven: {cardText: "Seven", placeholder: "Type new text here for 7 image", imageText: "Cake", key: 6},
  Eight: {cardText: "Eight", placeholder: "Type new text here for 8 image", imageText: "Café (French for coffee)", key: 7},
  Nine: {cardText: "Nine", placeholder: "Type new text here for 9 image", imageText: "Cab", key: 8},
  Ten: {cardText: "Ten", placeholder: "Type new text here for 10 image", imageText: "Case (blue trunk)", key: 9},
  Jack: {cardText: "Jack", placeholder: "Type new text here for jack image", imageText: "Cadet (RAF)", key: 10},
  Queen: {cardText: "Queen", placeholder: "Type new text here for queen image", imageText: "Cotton (reel)", key: 11},
  King: {cardText: "King", placeholder: "Type new text here for king image", imageText: "Club (golf, larg-head driver)", key: 12},
                          } 


let diamondsBaseTextsObject = {
  Ace: {cardText: "Ace", placeholder: "Type new text here for Ace image", imageText: "Dad", key: 0},
  Two: {cardText: "Two", placeholder: "Type new text here for 2 image", imageText: "Dane (dog, great)", key: 1},
  Three: {cardText: "Three", placeholder: "Type new text here for 3 image", imageText: "Dome (O2)", key: 2},
  Four: {cardText: "Four", placeholder: "Type new text here for 4 image", imageText: "Deer", key: 3},
  Five: {cardText: "Five", placeholder: "Type new text here for 5 image", imageText: "Dill", key: 4},
  Six: {cardText: "Six", placeholder: "Type new text here for 6 image", imageText: "Dish", key: 5},
  Seven: {cardText: "Seven", placeholder: "Type new text here for 7 image", imageText: "Duke (Isaac Hayes, Escape from New York)", key: 6},
  Eight: {cardText: "Eight", placeholder: "Type new text here for 8 image", imageText: "Daffy (Duck)", key: 7},
  Nine: {cardText: "Nine", placeholder: "Type new text here for 9 image", imageText: "Dubya (goofy US president)", key: 8},
  Ten: {cardText: "Ten", placeholder: "Type new text here for 10 image", imageText: "Daz (soap powder)", key: 9},
  Jack: {cardText: "Jack", placeholder: "Type new text here for jack image", imageText: "Deadwood", key: 10},
  Queen: {cardText: "Queen", placeholder: "Type new text here for queen image", imageText: "Deaden", key: 11},
  King: {cardText: "King", placeholder: "Type new text here for king image", imageText: "Diamond", key: 12},
                             } 


let heartsBaseTextsObject = {
  Ace: {cardText: "Ace", placeholder: "Type new text here for Ace image", imageText: "Hat", key: 0},
  Two: {cardText: "Two", placeholder: "Type new text here for 2 image", imageText: "Hen", key: 1},
  Three: {cardText: "Three", placeholder: "Type new text here for 3 image", imageText: "Ham", key: 2},
  Four: {cardText: "Four", placeholder: "Type new text here for 4 image", imageText: "Hair", key: 3},
  Five: {cardText: "Five", placeholder: "Type new text here for 5 image", imageText: "Hail", key: 4},
  Six: {cardText: "Six", placeholder: "Type new text here for 6 image", imageText: "Hash", key: 5},
  Seven: {cardText: "Seven", placeholder: "Type new text here for 7 image", imageText: "Hag", key: 6},
  Eight: {cardText: "Eight", placeholder: "Type new text here for 8 image", imageText: "Hoof", key: 7},
  Nine: {cardText: "Nine", placeholder: "Type new text here for 9 image", imageText: "Hub", key: 8},
  Ten: {cardText: "Ten", placeholder: "Type new text here for 10 image", imageText: "Hose", key: 9},
  Jack: {cardText: "Jack", placeholder: "Type new text here for jack image", imageText: "Headed", key: 10},
  Queen: {cardText: "Queen", placeholder: "Type new text here for queen image", imageText: "Heathen", key: 11},
  King: {cardText: "King", placeholder: "Type new text here for king image", imageText: "Heart", key: 12},
                            } 

let spadesBaseTextsObject = {
  Ace: {cardText: "Ace", placeholder: "Type new text here for Ace image", imageText: "Sad (emoji)", key: 0},
  Two: {cardText: "Two", placeholder: "Type new text here for 2 image", imageText: "Sin", key: 1},
  Three: {cardText: "Three", placeholder: "Type new text here for 3 image", imageText: "Sumo (wrestler)", key: 2},
  Four: {cardText: "Four", placeholder: "Type new text here for 4 image", imageText: "Sari", key: 3},
  Five: {cardText: "Five", placeholder: "Type new text here for 5 image", imageText: "Sail", key: 4},
  Six: {cardText: "Six", placeholder: "Type new text here for 6 image", imageText: "Sash", key: 5},
  Seven: {cardText: "Seven", placeholder: "Type new text here for 7 image", imageText: "Sack", key: 6},
  Eight: {cardText: "Eight", placeholder: "Type new text here for 8 image", imageText: "Safe", key: 7},
  Nine: {cardText: "Nine", placeholder: "Type new text here for 9 image", imageText: "Soup (Heinz)", key: 8},
  Ten: {cardText: "Ten", placeholder: "Type new text here for 10 image", imageText: "Suzi (Quatro)", key: 9},
  Jack: {cardText: "Jack", placeholder: "Type new text here for jack image", imageText: "Sated", key: 10},
  Queen: {cardText: "Queen", placeholder: "Type new text here for queen image", imageText: "Satan", key: 11},
  King: {cardText: "King", placeholder: "Type new text here for king image", imageText: "Spade", key: 12},
                           } 




const clubsTextsObjectRef = useRef(
  JSON. parse(JSON.stringify(clubsBaseTextsObject))
                                  )

const diamondsTextsObjectRef = useRef(
  JSON. parse(JSON.stringify(diamondsBaseTextsObject))
                                     )

const heartsTextsObjectRef = useRef(
  JSON. parse(JSON.stringify(heartsBaseTextsObject))
                                   )

const spadesTextsObjectRef = useRef(
  JSON. parse(JSON.stringify(spadesBaseTextsObject))
                                   )





// The onClick handler for the options of the
// dd next to the Recall and Check buttons 
// calls the following function.
// This function must:
// 1) Get from localStorage the array that 
// holds card texts and key image texts 
// for the suit in question -- 
// if that object exists. If it does not 
// this function will employ state variable
// clubsTextsObject (for example). 
// 2) Set state variable clubsTextsObject to the 
// object retrieved from localStorage if it
// exists, if it doesn't exist set 
// clubsTextsObject to ref clubsTextsObjectRef.current
// 3) 
function retrieveTexts(suit){

let retrievedObject
// 1):
if (suit === 'c') {
  retrievedObject = localStorage.getItem("clubsTextsObject"); 
  console.log(`In line 238, retrieveTexts in <App/> and retrievedObject is ${retrievedObject}`) 
// 2):
if (retrievedObject !== "undefined") {
  retrievedObject = JSON.parse(retrievedObject)
  setClubsTextsObject(retrievedObject)
                     } else { // 3):
  setClubsTextsObject(clubsTextsObjectRef.current)
                            }
                  }

if (suit === 'd') {
  retrievedObject = localStorage.getItem("diamondsTextsObject");  
// 2):
if (retrievedObject !== "undefined") {
  retrievedObject = JSON.parse(retrievedObject)  
  setDiamondsTextsObject(retrievedObject)
                     } else { // 3):
  setDiamondsTextsObject(diamondsTextsObjectRef.current)
                            }
                  }


if (suit === 'h') {
  retrievedObject = localStorage.getItem("heartsTextsObject");  
// 2):
if (retrievedObject !== "undefined") {
  retrievedObject = JSON.parse(retrievedObject)
  setHeartsTextsObject(retrievedObject)
                     } else { // 3):
  setHeartsTextsObject(heartsTextsObjectRef.current)
                            }
                  }

if (suit === 's') {
  retrievedObject = localStorage.getItem("spadesTextsObject");  
// 2):
if (retrievedObject !== "undefined") {
  retrievedObject = JSON.parse(retrievedObject)
  setSpadesTextsObject(retrievedObject)
                     } else { // 3):
  setSpadesTextsObject(spadesTextsObjectRef.current)
                            }
                  }
                        }





//--------------------------------------------------------


  // State property that contains 
  // a string for the header:
  const [headerText, setHeaderText] = useState("Memorise a deck of cards")  


//--------------------------------------------------------



// A state property to hold the dates, times and scores:
const [datesTimesAndScores, setDatesTimesAndScores] = useState([])

// A ref that is an array that will end up looking like this
// as it gets added to:
// [
// {key: 0, timeTaken: "2hrs23mins19s", time: 13:43:32, date: "4May23", scores: {correct: 45, incorrect: 5, dontKnow: 2}},
// {key: 1, timeTaken: "2hrs23mins19s", time: 13:43:32, date: "6May23", scores: {correct: 47, incorrect: 3, dontKnow: 2}},
// {key: 2, timeTaken: "2hrs23mins19s", time: 13:43:32, date: "9May23", scores: {correct: 49, incorrect: 1, dontKnow: 2}},
// ...
// ]
// const tableData = useRef([])



// A function that passes the data for the table 
// to <Table/>. rowData is an object that looks
// like this:
// {key: 0, timeTaken: "2hrs23mins19s", time: 13:43:32, date: "Saturday 4May23", scores: {correct: 45, incorrect: 5, dontKnow: 2}}
// This function gets called by a function
// in <CardsContainer/>. It has to:
// 1) add the object dataArg to the array 
//    tableData.current
// 2) set datesTimesAndScores to array of objects 
// tableData.current so that it gets passed to <Table/>
function setTimesAndScores(rowData){

  console.log(`In <App/>'s setTimesAndScores and  tableData.current is:`)
  console.table(rowData)
  setDatesTimesAndScores(rowData)
                                   }


// Four state properties that are booleans.
// Only one of the four will be true at any given time.
// When each is true a table will appear that 
// shows the card key memory image texts for the cards
// of a suit.
const [showClubsKeyMemImageText, setShowClubsKeyMemImageText] = useState(false)
const [showDiamondsKeyMemImageText, setShowDiamondsKeyMemImageText ] = useState(false)
const [showHeartsKeyMemImageText, setShowHeartsKeyMemImageText] = useState(false)
const [showSpadesKeyMemImageText, setShowSpadesKeyMemImageText] = useState(false)


// An object that this component makes 
// available to its children via Context
// (although only <CardsContainer/> employs it).
// The dd to the right of the Recall and Check buttons 
// (which selects a suit) will invoke the function that 
// is the property of this object (which takes one arg, 
// either "c", "d", "h" or "s"), which will make 
// the table of card key image texts show: 
let showTextsObject =  {
  showImageTextsTable: showImageTextsTable
                       }


// The function that is the value of property 
// showTextsObject above.
// This function takes one arg (of value either 
// "c", "d", "h" or "s") and must:
// 1) Show the appropriate table depending on
// the value of the arg. To do this set one of
// the following state variables to true and 
// the other three to false (depending on the 
// value of the arg):
// showClubsKeyMemImageText
// showDiamondsKeyMemImageText
// showHeartsKeyMemImageText
// showSpadesKeyMemImageText
// 
// 2) set state variable heartsTextsObject,
// for example, to either 
// an array retrieved from localStorage or 
// a default array. The array contains info 
// that will go in the table of cards and 
// their key image texts:
function showImageTextsTable(suit){
  // 1) 
if (suit === "c") {
  setShowClubsKeyMemImageText(true)
  setShowDiamondsKeyMemImageText(false)
  setShowHeartsKeyMemImageText(false)
  setShowSpadesKeyMemImageText(false)
                }
// 1):                
if (suit === "d") {
  setShowClubsKeyMemImageText(false)
  setShowDiamondsKeyMemImageText(true)
  setShowHeartsKeyMemImageText(false)
  setShowSpadesKeyMemImageText(false)
                }
// 1):
if (suit === "h") {
  setShowClubsKeyMemImageText(false)
  setShowDiamondsKeyMemImageText(false)
  setShowHeartsKeyMemImageText(true)
  setShowSpadesKeyMemImageText(false)
                }
// 1):                
if (suit === "s") {
  setShowClubsKeyMemImageText(false)
  setShowDiamondsKeyMemImageText(false)
  setShowHeartsKeyMemImageText(false)
  setShowSpadesKeyMemImageText(true)
                }
// 2)                
retrieveTexts(suit)
                                  } 


// A function thta gets passed
// to child <KeyImageText/>, which 
// passes it to its child 
// <KeyImageTextRow/>. This function takes
// one arg, an array of two members,
// eg ["Eight", "hoof"].
// This function saves "hoof" in the right place 
// in state variable textsObject, which is an array!!  
// a member of array textxObject looks like this:
// [["Eight"], ["Type new text here for 8 image"], [{key: 7}], [""] ],
function saveDataToTextsObject(dataArray){

                                         }


// -------------- RENDERING BEGINS ---------------------------


  return (
    <div className="App">

      <div className="appOuterContainer"> {   /* contains four things:
      
                                              0) Conditionally rendered divs, each
                                              showing a table of two cols (card, key memory image)

                                              1) div className="appContainerOne" 
                                              contains a div containing the header <p>

                                              2) div className="appContainerTwo"
                                              contains 
                                              a) a div className="timesOuterContainer"
                                              This contains all of the stuff in the LH
                                              column (eg the table of times)
                                              
                                              3) div className="appContainerThree" 
                                              contains
                                              a) a div containing the green felt img
                                              b) <CardsContainer/>
                                              
                                              
                                          */}


      {/* 0) Conditionally render the components that
      show cards key memory image texts: */}
      {showClubsKeyMemImageText ? 
                                  <KeyImageText
                                  // The Close button of <KeyImageText/> 
                                  // calls one of the following four props 
                                  // to set the appropriate <App/> state
                                  // variable to false to close the window 
                                  // that shows the table of card key image 
                                  // texts:
                                  setShowClubsKeyMemImageText = {setShowClubsKeyMemImageText} 
                                  setShowDiamondsKeyMemImageText = {setShowDiamondsKeyMemImageText}
                                  setShowHeartsKeyMemImageText = {setShowHeartsKeyMemImageText}
                                  setShowSpadesKeyMemImageText = {setShowSpadesKeyMemImageText}
                                  suit = {"Clubs"}
                                  textsObject = {clubsTextsObject}
                                  setTextsObject = {setClubsTextsObject }
                                  // saveDataToTextsObject = {saveDataToTextsObject}
                                  /> 
                                  : null}
      {showDiamondsKeyMemImageText ? 
                                    <KeyImageText
                                    setShowClubsKeyMemImageText = {setShowClubsKeyMemImageText}
                                    setShowDiamondsKeyMemImageText = {setShowDiamondsKeyMemImageText}
                                    setShowHeartsKeyMemImageText = {setShowHeartsKeyMemImageText}
                                    setShowSpadesKeyMemImageText = {setShowSpadesKeyMemImageText}                                    
                                    suit = {"Diamonds"}
                                    textsObject = {diamondsTextsObject}
                                    setTextsObject = {setDiamondsTextsObject }
                                    // saveDataToTextsObject = {saveDataToTextsObject}
                                    /> 
                                    : null}
      {showHeartsKeyMemImageText ? 
                                   <KeyImageText
                                   setShowClubsKeyMemImageText = {setShowClubsKeyMemImageText}
                                   setShowDiamondsKeyMemImageText = {setShowDiamondsKeyMemImageText}
                                   setShowHeartsKeyMemImageText = {setShowHeartsKeyMemImageText}
                                   setShowSpadesKeyMemImageText = {setShowSpadesKeyMemImageText}                                   
                                    suit = {"Hearts"}
                                    textsObject = {heartsTextsObject}
                                    setTextsObject = {setHeartsTextsObject }
                                    // saveDataToTextsObject = {saveDataToTextsObject}
                                   /> 
                                   : null}
      {showSpadesKeyMemImageText ? 
                                    <KeyImageText
                                    setShowClubsKeyMemImageText = {setShowClubsKeyMemImageText}
                                    setShowDiamondsKeyMemImageText = {setShowDiamondsKeyMemImageText}
                                    setShowHeartsKeyMemImageText = {setShowHeartsKeyMemImageText}
                                    setShowSpadesKeyMemImageText = {setShowSpadesKeyMemImageText}                                    
                                    suit = {"Spades"}
                                    textsObject = {spadesTextsObject}
                                    setTextsObject = {setSpadesTextsObject }
                                    // saveDataToTextsObject = {saveDataToTextsObject}
                                    /> 
                                    : null}
      




 {/* 1): */}
      <div className="appContainerOne">
        <p className="appHeader">{headerText}</p>
      </div>



 {/* 2): */}
      <div className="appContainerTwo"> {/* contains 
                                            a) a div className="timesOuterContainer"
                                        */}
      
      {/* a): */}
      {/* contains divs A and B */}
       <div className="timesOuterContainer">  
       {/* A */}<div className="timesTextContainer">
      <p className="timesText">
        Results
      </p>
      </div>  

    {/* B: This will hold a list of previous times */}
      <div className="timesContainer">
      {/* the actual times go in here */}

      <Table tableData = {datesTimesAndScores}/>

      </div>  
      </div>{/* end div className="timesOuterContainer" */}

     
      </div>  {/* end div of clasName "appContainerTwo" */}






{/* 3): */}
      <div className="appContainerThree">  

      
      
      {/* The green felt and its container: */}
      <div className="greenFeltContainer">
        <img className="greenFeltImg"
         src = {greenFelt}>
        </img>
      </div>
      
      {/* Make context available to 
      <CardsContainer/> and its 
      children: */}
      <KeyMemImageTextsContext.Provider value={showTextsObject}>
            <CardsContainer setTimesAndScores = {setTimesAndScores}/>          
      </KeyMemImageTextsContext.Provider>
      </div>



      </div> {/* end div of className appOuterContainer */}
 
    </div>
        );
}

export default App;
