import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// Components:
import ButtonOne from  './ButtonOne.js';


// Sass styles:
import '../scss/style.scss';


/*
Operation
---------



*/



export default function Timer(
    {
        counter,
        startTimerTrigger,
        stopTimerTrigger,
        logTime
    }
                             ) {



// Now a ref that will be set to the return of 
// setInterval(). You have to use a ref for this
// because if you use let newTick (floating around 
// in the component function) then newTick gets 
// wiped on next render and its value becomes undefined
// (as expected) before clearInterval() can act on it!
const tickNew = useRef(0)

    
// Info to do with the Start/Stop button:
let buttonInfo = {
    buttonDivCSSclass: "mainButton",
    pTextCSSclass: "mainButtonText",
    clickHandler: startOrStopClock,    
    pText: "Start"
                 }


// Info to do with the Reset and log time button:
let resetAndLogButtonInfo = {
    buttonDivCSSclass: "mainButtonInoperable",
    pTextCSSclass: "mainButtonText",
    clickHandler: resetAndSaveTime,    
    pText: "Reset, log time"
                    }

//----------------------------------------------

// An effect hook that calls function startTimer
// when the value of passed-in prop startTimerTrigger
// changes (but only if the timer is not already running).
// The click handler for the Next card button of <cardsContainer/>
// changes the value of startTimerTrigger (simply increments
// it), thus making the function in the following useEffect
// run 
useEffect(() => {
    if (startTimerTrigger) { // on mounting of this component startTimerTrigger === 0
        if (!startOrStop.current) {  // false = timer is not running
// Start the timer:
    startTimer()
// Change the start/Stop button text:
buttonInfo.pText = "Stop"
setStartStopButtInfo({...buttonInfo, pText: "Stop"})
console.log(`Inside the useEffect in <Timer/> and startTimerTrigger is ${startTimerTrigger}`)
                                  }
                           }
  }, [startTimerTrigger]);

//-------  

// An effect hook that calls function stopTimer
// when the value of passed-in prop stopTimerTrigger
// changes (but only if the timer is already running).
useEffect(() => {
    console.log(`in useEffect BEFORE if statement. Value of stopTimerTrigger is ${stopTimerTrigger} and value of startOrStop.current is ${startOrStop.current}`)
    // following shows that this useEffect is working:
    // console.log(`in useEffect and value of stopTimerTrigger is ${stopTimerTrigger}`)
    if (stopTimerTrigger) {
        if (startOrStop.current) { // true = timer is running
            console.log(`in useEffect if statement and value of startOrStop.current is ${startOrStop.current}`)
    // Stop the timer:
    // stopTimer()        
    // Call function resetAndSaveTime:
    resetAndSaveTime()
                                 }
                          }
  }, [stopTimerTrigger]);


//----------------------------------------------







// The text of the time. This is 
// the display of hours, minutes 
// and seconds:
// let tText = "00:00:00" 

// Info to do with the timer:
let timerInfoObject = {
    counter: 0
                      }


const [startStopButtInfo, setStartStopButtInfo] = useState(buttonInfo)
// const [resetAndLogButton, setEndButtInfo] = useState(resetAndLogButton)
const [resetAndLogButton, setResetAndLogButtonInfo] = useState(resetAndLogButtonInfo)
// const [timerInfo, setTimerInfo] = useState(timerInfoObject)
const [hoursCounter, setHoursCounter] = useState(0)
const [minutesCounter, setMinutesCounter] = useState(0)
const [secondsCounter, setSecondsCounter] = useState(0)
const startOrStop = useRef(false); // false = timer not running; true = timer is running
const initialCounter = useRef(0);
// Below hoursMinsSeconds.current[0] will be the timer the hours figure,
// hoursMinsSeconds.current[1] will be the timer the minutes figure and 
// hoursMinsSeconds.current[2] will be the timer the seconds figure.
const hoursMinsSeconds = useRef([0,0,0])




/*
The click handler for the Recall button 
ultimately calls this function.
This fn has to:
1) Stop the timer
2) Read the time and convert it to a string, timeString
3) Send timeString to the parent component <CardsContainer/>,
which will add it to a new tableObject and ...
4) Reset the ref hoursMinsSeconds.current values to [0,0,0]
5) Show 0:0:0 on the timer
6) Set the text of the Start/Stop button to "---" and make the button inoperable
7) make the Next card and New deck buttons fade and become inoperable   
9) make the Check button appear (i think it already is opaque at this stage)
*/
function resetAndSaveTime () {
// 1):
stopTimer()
// 2):
let timeString = `${hoursMinsSeconds.current[0]}h${hoursMinsSeconds.current[1]}m${hoursMinsSeconds.current[2]}s`
// 3):
logTime(timeString)
// 4):
hoursMinsSeconds.current[0] = 0
hoursMinsSeconds.current[1] = 0
hoursMinsSeconds.current[2] = 0
// 5):
setSecondsCounter(hoursMinsSeconds.current[2])
setMinutesCounter(hoursMinsSeconds.current[1])
setHoursCounter(hoursMinsSeconds.current[0])

// 6):
buttonInfo.pText = "Start"
setStartStopButtInfo({...buttonInfo, pText: "Start"}) 

                             } // end fn resetAndSaveTime

//--------------------------------------------------------------------------------

// A function that fn setStartStopButtInfo calls.
// This fn has to:
// 1)   change the value of the ref that indicates whether the 
//      clock is running or not
// 2)   run the setInterval() function so that it 
//      runs its callback every second
// 3)  make the setInterval() callback change the values in 
//      array hoursMinsSeconds.current so that they reflect
//      hours, minutes and seconds of the timers
function startTimer() {
    // 1): 
    startOrStop.current = true 
    // 2):
    tickNew.current = setInterval(function () {

        // 3): 
        hoursMinsSeconds.current[2] = hoursMinsSeconds.current[2] + 1
        if (hoursMinsSeconds.current[2] === 60) {
            hoursMinsSeconds.current[2] = 0
            hoursMinsSeconds.current[1] = hoursMinsSeconds.current[1] + 1 
            if (hoursMinsSeconds.current[1] === 60) {
                hoursMinsSeconds.current[1] = 0
                hoursMinsSeconds.current[0] = hoursMinsSeconds.current[0] + 1
                if (hoursMinsSeconds.current[0] === 6 ) {
                    hoursMinsSeconds.current[0] = 0
                                                        }
                                                    }
                                                } // end if
        
                setSecondsCounter(hoursMinsSeconds.current[2])
                setMinutesCounter(hoursMinsSeconds.current[1])
                setHoursCounter(hoursMinsSeconds.current[0])
                                        }, 1000);
// The following line tells me tckNew has value 8
// console.log(`In startTimer(), after call of setInterval, and tickNew has value: ${tickNew}`)

                      } // end startTimer

//------------

let testVar = "You can read me!"
// A utility function that fn setStartStopButtInfo calls.
// This fn must
// 1) stop the timer
// 2)   change the value of the ref that indicates whether the 
//      clock is running or not
function stopTimer() {
    // The following line tells me tckNew has value undefined!!!!
    // console.log(`In fn stopTimer() BEFORE clearInterval(tickNew) and tickNew has value: ${tickNew} and testVar has value ${testVar}`)
// 2):
startOrStop.current = false // to indicate that the timer is not running

    // 1):
    clearInterval(tickNew.current)
    // console.log(`In fn stopTimer() AFTER clearInterval(tickNew) and tickNew has value: ${tickNew}`)
                     }

//------------

// The click handler for the Start/stop button
function startOrStopClock() {

// a) if the Start/Stop button text reads "Start":
// i)   change the text of the button to "Stop"
// ii)  call setInterval() to increment the value of the 
//      counter by 1 every second up to 59 and change the 
//      minutes and hours texts accordingly.
// iii) if the "Reset and log time" button is disabled, enable it,
//      otherwise ignore it. This takes care of the very first use 
//      of the Start/Stop button. For subsequent uses the 
//      "Reset and log time" button is always enabled.

// b) if the Start/Stop button text reads "Stop":
// i)   if the counter = 1-51  stop the timer 
//      and change text of button to "Start"
// ii)  if the counter = 52   stop the timer and
//      change text of button to "---",
//      make the Reset button operable and opaque.

// a)
// NOTE: the following line doesn't work -- can't work out why!!!!
// if (startStopButtInfo.pText === "Start") {    // startStopButtInfo is a state property
if (!startOrStop.current) {    // If the timer is not running
// ai):
buttonInfo.pText = "Stop"
setStartStopButtInfo({...buttonInfo, pText: "Stop"})
// aii):
startTimer()
// aiii):
if (resetAndLogButtonInfo.buttonDivCSSclass === "mainButtonInoperable") {
    resetAndLogButtonInfo.buttonDivCSSclass = "mainButton"
                                                                }

                          }  else { // if the timer is running
// console.log(`Inside startOrStopClock() and the button reads "Stop" but is now being changed to read "Start" `)
// b):                            
stopTimer()
// i):   
// Remember that props counter has the value of 
// nextCardCounter.current of <CardsContainer/>:
// i):
if (1 <= counter <= 51) { // ie if user has turned over cards 2-51
    buttonInfo.pText = "Start"
    setStartStopButtInfo({...buttonInfo, pText: "Start"})
                        }
// ii):
if (counter === 52) { // ie if user has turned over all 52 cards
    buttonInfo.pText = "---"
    setStartStopButtInfo({...buttonInfo, pText: "---", buttonDivCSSclass: "mainButtonInoperable"})

                    }

                                } // end if-else
                                   } // end startOrStopClock
                                   

return (

<div className= "timerEnclosingDiv"> {/* Contains divs 1 and 2*/}



 {/* The following div contains the 
 <p>s for the timer numerals*/}
<div className= "timerTextEnclosingDiv">  {/* div 1: Contains three divs:
                                            div className="timerHoursContainer",
                                            div className="timerMinutesContainer" and 
                                            div className="timerSecondsContainer"
                                            */}
<div className="timerHoursContainer">
<div className="timerHoursNumberContainer">    
<p className = "timerTextP" > {/* The <p> for the hours*/}
{hoursCounter}
</p>
</div>
<div className="timerHoursHContainer">
<p className = "timerTextUnit" >
h   
</p>
</div>
</div>


<div className="timerMinutesContainer"> {/* The <p> for the minutes*/}
<div className="timerMinsNumberContainer">
<p className = "timerTextP" >
{minutesCounter}
</p>
</div>
<div className="timerMinsMinsContainer">
<p className = "timerTextUnit" >
mins
</p>
</div>    
</div>


<div className="timerSecondsContainer"> {/* The <p> for the seconds*/}
<div className="timerSecsNumberContainer">
<p className = "timerTextP" >
{secondsCounter}
</p>
</div>
<div className="timerSecsSecsContainer">
<p className = "timerTextUnit" >
secs
</p>    
</div>
</div>

</div>



<hr className="timerHR"></hr>


 
<div className="timerButtonEnclosingDiv"> {/*  div 2: Contains Start/Stop button and 
                                                button to Reset & log time */}

{/* Start/Stop button*/}
<ButtonOne 
buttonDivCSSclass = {startStopButtInfo.buttonDivCSSclass} 
pTextCSSclass = {startStopButtInfo.pTextCSSclass}  
clickHandler = {startStopButtInfo.clickHandler}  
pText = {startStopButtInfo.pText} 
/> 

{/* Reset, log time button*/}
<ButtonOne 
buttonDivCSSclass = {resetAndLogButtonInfo.buttonDivCSSclass} 
pTextCSSclass = {resetAndLogButtonInfo.pTextCSSclass}  
clickHandler = {resetAndLogButtonInfo.clickHandler}  
pText = {resetAndLogButtonInfo.pText} 
/> 

</div>

</div>

       )
                                        }


                                        