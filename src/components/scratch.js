shuffledDeck.current



// TEST AREA:
// --------- --------- --------- --------- ---------- --------- -------- //

// END TEST AREA
//------------------------------------------------------------

function makeTimeAndDateString(){
  
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]

  const d = new Date();
  let year = d.getFullYear();
  let month = months[d.getMonth()];
  let date = dates[d.getDate()];
  let day = days[d.getDay()]; // eg "Monday"
  let hours = d.getHours()
  let minutes = d.getMinutes();

  let timeString = hours + "h" + ":" + minutes + "m" 
  // eg "13h:08m"
  let dateString = day + " " + date + month + year 
  // eg Mo 08May2023

  return {timeString: timeString, dateString: dateString}
                            } // end fn makeTimeAndDateString

let {timeString, dateString} = makeTimeAndDateString()

console.log(`The time is ${timeString} and the date is ${dateString}`) 

                            

/*

    //----------------KEEP for a while! KEEP! KEEP! KEEP! KEEP! ------------------//

[boc, cj, 0, true, false], 
\memberArray\[3] is a boolean that determines whether the face of a card  
                 should show with or without the turning effect. 
                 if \memberArray\[3] === true, show without turning effect;
                 if \memberArray\[3] === false, show with turning effect.
\memberArray\[4] is a boolean that determines whether the back or face of the 
                 card should show. 
                 true  = show back of card; 
                 false = show face of card. 

    {stateDeckToDisplay.map((memberArray)=>(
        memberArray[4] ? 
        ( <div className = "cardScene" key={memberArray[2]}>
          <div className="cardFrontImgContainerNoRotation" >
                <img className = "cardImg" src={memberArray[0]}></img>
          </div>
          </div>) 
        : 
        (<div className = "cardScene" key={memberArray[2]}> 
        <div className = {memberArray[3] ? "cardNoRotate" : "cardRotate"}> 
              <div className="cardBackImgContainer" >
                <img className = "cardImg" src={memberArray[0]}></img>
              </div>
              <div className="cardFrontImgContainer" > 
                <img className = "cardImg" src={memberArray[1]}></img>
              </div>
         </div>
         
         
         </div>   )    
      ))} 
*/      