import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// Sass styles:
import '../scss/style.scss';

// Components:
import CardsContainer from  './CardsContainer.jsx';
import Table from  './Table.jsx';

// images:
import greenFelt from '../images/greenFeltLowQual.jpg'


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

  // State property that contains 
  // a string for the header:
  const [headerText, setHeaderText] = useState("Memorise a deck of cards")  

  // State property that contains 
  // info for the Start/Stop button:
  const [startStopButtInfo, setstartStopButtInfo] = useState(
    {
      buttonDivCSSclass: "mainButton" ,
      pTextCSSclass: "mainButtonText" ,
      clickHandler: ()=>{alert("You clicked the Start/stop button!")},
      pText: "Start" 
    }
                                                            )  

  

// A state property to hold the dates, times and scores:
const [datesTimesAndScores, setDatesTimesAndScores] = useState([])


// A function that sets the dates, times and scores

// arg dataArg is an array of any number of members that looks like this:
// [
// {key: 0, time: "2hrs23mins19s", date: "4May23", scores: {correct: 45, incorrect: 5, dontKnow: 2}},
// {key: 1, time: "1hrs52mins9s", date: "6May23", scores: {correct: 47, incorrect: 3, dontKnow: 2}},
// {key: 2, time: "51mins10s", date: "14May23", scores: {correct: 49, incorrect: 1, dontKnow: 2}},
// ...
// ]
function setTimesAndScores(dataArg){
  setDatesTimesAndScores(dataArg)
                                   }





  return (
    <div className="App">

      <div className="appOuterContainer"> {/* contains three divs: 
                                              1) div className="appContainerOne" 
                                              contains a div containing the header <p>

                                              2) div className="appContainerTwo"
                                              contains 
                                              a) a div className="timesOuterContainer"
                                              
                                              3) div className="appContainerThree" 
                                              contains
                                              a) a div containing the green felt img
                                              b) <CardsContainer/>
                                              
                                          */}


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
      <div className="greenFeltContainer">
        <img className="greenFeltImg"
         src = {greenFelt}>
        </img>
      </div>
      
            <CardsContainer setTimesAndScores = {setTimesAndScores}/>                                      
      </div>



      </div> {/* end div of className appOuterContainer */}
 
    </div>
        );
}

export default App;
