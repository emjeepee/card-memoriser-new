import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// Components:
import ButtonOne from  './ButtonOne.js';


// Sass styles:
import '../scss/style.scss';



export default function Timer(
    {
        counter,
        startTimerTrigger,
        stopTimerTrigger,
        // logTime,
        makeRecallButtonOperable,
        // setTimeDateTimeTaken
        setTimeTaken,
        resetTimer,
        blockScreen
    }
                             ) {

// console.log(`Inside <Timer/>, at top of component.  counter has value ${counter}`)


// Now a ref that will be set to the return of 
// setInterval(). You have to use a ref for this
// because if you use let newTick (floating around 
// in the component function) then newTick gets 
// wiped on next render and its value becomes undefined
// (as expected) before clearInterval() can act on it!
const tickNew = useRef(0)




//----------------------------------------------

// A UseEffect hook that calls function startTimer
// when the value of passed-in prop startTimerTrigger
// changes (but only if the timer is not already running).
// The click handler for the Next card button of <CardsContainer/>
// changes the value of startTimerTrigger (simply increments
// it), thus making the function in the following useEffect
// run 
useEffect(() => {
    if (startTimerTrigger) { // on mounting of this component startTimerTrigger === 0
        if (!startOrStop.current) {  // false -> timer is not running
// Start the timer:
    startTimer()
// Change the start/Stop button text and make it operable:
buttonInfo.pText = "Stop"
setStartStopButtInfo({...buttonInfo, buttonDivCSSclass: "mainButton"})
                                  }
                           }
  }, [startTimerTrigger]);

//-------  

// A useEffect hook that calls function stopTimer
// when the value of passed-in prop stopTimerTrigger
// changes (but only if the timer is already running).
// <CardsContainer/>'s Recall button's onClick handler
// increments stopTimerTrigger, which is passed in 
// to this component as props.
useEffect(() => {
    // following shows that this useEffect is working:
    // console.log(`in useEffect and value of stopTimerTrigger is ${stopTimerTrigger}`)
    if (stopTimerTrigger) { // on startup of app stopTimerTrigger == 0
        if (startOrStop.current) { // true -> timer is running
    // Stop the timer:
    stopTimer()   
    // Record the time taken:
    let timeTakenString = `${hoursMinsSeconds.current[0]}h-${hoursMinsSeconds.current[1]}m-${hoursMinsSeconds.current[2]}s`
    // Send timeTakenString to <CardContainer/>: 
    setTimeTaken(timeTakenString)        


                                 }
                          }
  }, [stopTimerTrigger]);


//----------------------------------------------

// A useEffect that runs when passed-in prop 
// resetTimer changes (the onClick handler 
// for the New deck button in <CardsContainer/>
// increments resetTimer).
// The idea is to reset the timer when the user 
// clicks New deck: 
useEffect(() => {
    resetTheTimer()    
                }, [resetTimer]);


//----------------------------------------------
// Info to do with the Start/Stop button:



let buttonInfo = {
    buttonDivCSSclass: "mainButtonInoperable",
    pTextCSSclass: "mainButtonText",
    clickHandler: startOrStopClock,    
    pText: "Start"
                 }

// state property that holds info for the <ButtonOne/>
// that is the Start/Stop button
const [startStopButtInfo, setStartStopButtInfo] = useState(buttonInfo)



// state properties to hold the hours, mins, secs
// of the final amount of time the user took to 
// memorise the cards:
const [hoursCounter, setHoursCounter] = useState(0)
const [minutesCounter, setMinutesCounter] = useState(0)
const [secondsCounter, setSecondsCounter] = useState(0)

// A state property used in the onClick handler of the 
// start/stop button to determine whether the timer is 
// runnin or not. false -> not running, true -> running:
const startOrStop = useRef(false);

// not used!:
const initialCounter = useRef(0);

// A state property that is an array whose members get set to 
// the hours, mins and secs of the timer to hold the values
// for time taken to memorise cards. 
// The startTimer() function sets these values as the timer ticks.
// hoursMinsSeconds.current[0] will be the timer's hours figure,
// hoursMinsSeconds.current[1] will be the timer's minutes figure and 
// hoursMinsSeconds.current[2] will be the timer's seconds figure.
const hoursMinsSeconds = useRef([0,0,0])


// NOW NOT USED IN THIS COMPONENT
// -- USE IN <CardsContainer/>
// instead:
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



/*
The click handler for the Recall button 
ultimately calls this function.
This fn has to:
1) Stop the timer
4) Reset the ref hoursMinsSeconds.current values to [0,0,0]
5) Show 0:0:0 on the timer
6) Set the text of the Start/Stop button to "Start" and make the button inoperable
*/
function resetTheTimer () {
console.log(`resetTheTimer called`)
// 1):
stopTimer()

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

                             } // end fn resetTheTimer

//--------------------------------------------------------------------------------

// A function that fn xxxx calls.
// This fn has to:
// 1)   change the value of the ref that indicates whether the 
//      clock is running or not
// 2)   call the setInterval() function so that it 
//      runs its callback every second
// 3)   make the setInterval() callback change the values in 
//      array hoursMinsSeconds.current every second so that they reflect
//      how many hours, minutes and seconds have passed
// 4)   set the timer digits to show the elapsed time
function startTimer() {
    // 1): 
    startOrStop.current = true // indicates the clock is now ticking
    // 2):
    tickNew.current = setInterval(function () {
    // 3): 
        hoursMinsSeconds.current[2] = hoursMinsSeconds.current[2] + 1
        if (hoursMinsSeconds.current[2] === 60) {
            hoursMinsSeconds.current[2] = 0 // reset the seconds to 0
            hoursMinsSeconds.current[1] = hoursMinsSeconds.current[1] + 1 // increment the minutes 
            if (hoursMinsSeconds.current[1] === 60) {
                hoursMinsSeconds.current[1] = 0 // reset the minutes to 0
                hoursMinsSeconds.current[0] = hoursMinsSeconds.current[0] + 1 // increment the hours
                if (hoursMinsSeconds.current[0] === 6 ) { // If the timer has been going for 6 hours
                    hoursMinsSeconds.current[0] = 0       // reset the hours to 0.
                                                        }
                                                    }
                                                } // end if
        // 4):
                setSecondsCounter(hoursMinsSeconds.current[2])
                setMinutesCounter(hoursMinsSeconds.current[1])
                setHoursCounter(hoursMinsSeconds.current[0])
                                        }, 1000);
                      } // end startTimer

//------------


// A utility function that fn xxxx calls.
// This fn must
// 1) stop the timer
// 2)   change the value of the ref that indicates whether the 
//      clock is running or not
function stopTimer() {
// 1):
clearInterval(tickNew.current) // This stops setInterval()'s callback.
// 2):
startOrStop.current = false // to indicate that the timer is now not running
                     }

//------------


// The click handler for the Start/stop button
function startOrStopClock() {

// Testing:
// console.log(`0) In <Timer/>, in start/stop button's onClick handler. counter is ${counter}`)   


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
// i)   if the counter = 0-50  stop the timer 
//      and change text of button to "Start"
// ii)  if the counter = 51 (because the user has 
//      turned the last card) stop the timer and
//      change text of button to "---",
//      make the Recall button operable and opaque.
//      Record the elapsed time and time and date


// a)
if (!startOrStop.current) {    // If the timer is not running (ie button reads "Start")
// ai):
buttonInfo.pText = "Stop"
// buttonDivCSSclass: "mainButton",
setStartStopButtInfo({...buttonInfo, buttonDivCSSclass: "mainButton"})
// aii):
startTimer()

/*  OLD CODE
// aiii):
if (resetAndLogButtonInfo.buttonDivCSSclass === "mainButtonInoperable") {
    resetAndLogButtonInfo.buttonDivCSSclass = "mainButton"
                                                                        }
*/


                          }  else { // if the timer is running (ie button reads "Stop")
// console.log(`1) In <Timer/>, in start/stop button's onClick handler. counter is ${counter}`)                            
// b):                            
stopTimer()
// i):   
// Remember that props counter has the value of 
// nextCardCounter.current of <CardsContainer/>,
// which is (ordinal of card shown)-1:
// i):
if ((counter > -1 ) && (counter < 51)) { // ie if user has turned over cards 1-51
    // buttonInfo.pText = "Start"
    setStartStopButtInfo({...buttonInfo, pText:"Start", buttonDivCSSclass: "mainButton"})
    // console.log(`2) In <Timer/>, in start/stop button's onClick handler. User clicked Stop and counter is ${counter}`)
                                      }
// ii):
if (counter === 51) { // ie if user has turned over all 52 cards
    // console.log(`3) In <Timer/>, in start/stop button's onClick handler. User clicked Stop after turning over 52nd card`)
    // buttonInfo.pText = "---"
    // buttonInfo.buttonDivCSSclass = "mainButtonInoperable"
    setStartStopButtInfo({...buttonInfo, pText: "---", buttonDivCSSclass: "mainButtonInoperable"})
    // Make Recall button operable:
    makeRecallButtonOperable()
    
                    }
                                } // end if-else
                                   } // end startOrStopClock




// KEEP
// MAKE NOTE OF THIS!!! THIS IS IMPORTANT!!!
// IT WILL DEEPEN YOUR UNDERSTANDING OF USEEFFECT!!!!
// Testing:
// This is a test onClick handler for the button:
// <ButtonOne clickHandler = {startStopButtInfo.clickHandler} />
// ie via object startStopButtInfo, which has property 
// clickHandler: startOrStopClock.
// startStopButtInfo gets changed in a useEffect that runs when passed in prop 
// startTimerTrigger changes, which it does every time the user clicks 
// the Next card button and the timer is NOT running. It also gets changed in
// the click handler for the Recall button but that's not relevant to the problem.
// The problem is that counter in fn startOrStopClock is always has value 0! 
// HOWEVER, changing the button's onClick handler to this:
// onClick = startOrStopClock 
// makes counter have the corect value!
// So the useEffect is somehow freeze-drying the valueof counter available to 
// function startOrStopClock   
/*
function startOrStopClock() {
    console.log(`0) In <Timer/>, in start/stop button's onClick handler. counter is ${counter}`)   
                            }
*/                            
// END NOTE



//--------------------------------------------------------------------------------------------
// RENDERING FOLLOWS
//--------------------------------------------------------------------------------------------                                   

return (

<div className= "timerEnclosingDiv"> {/* Contains divs 1 and 2*/}



 {/* The following div contains the 
 <p>s for the timer numerals*/}
<div className= "timerTextEnclosingDiv">  {/* div 1: Contains three divs:
                                            div className="timerHoursContainer",
                                            div className="timerMinutesContainer" and 
                                            div className="timerSecondsContainer"
                                            */}

{/* A div that sits on top of all of the elements of <Timer/>
and acts as a screen to block the timer out: */}
{blockScreen ? <div className="timer-blocking-screen-div"></div> : null}

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
// clickHandler = {startStopButtInfo.clickHandler}  // This makes counter take on an incorrect value!!!! WHY!!!
clickHandler = {startOrStopClock}
pText = {startStopButtInfo.pText} 
/> 


{/*     */}

{/* Reset, log time button
<ButtonOne 
buttonDivCSSclass = {resetAndLogButtonInfo.buttonDivCSSclass} 
pTextCSSclass = {resetAndLogButtonInfo.pTextCSSclass}  
clickHandler = {resetAndLogButtonInfo.clickHandler}  
pText = {resetAndLogButtonInfo.pText} 
/> 
*/}

{/* A test button 
<ButtonOne 
buttonDivCSSclass = "mainButton"
pTextCSSclass = "mainButtonText"
clickHandler = {testClickHandler}  
pText = "Test"
/> 
*/}

</div>

</div>

       )
                                        }


                                        