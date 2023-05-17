{/*
Start/Stop button
-----------------
This starts and stops the timer.

On first click of this button the Next card button must become 
opaque and usable. 
On subsequent clicks this button has no effect on the Next card
button.


//-----------------------------------------------------------

Next card button
----------------
The click handler must:
i) change the state property (array) stateDeckToDisplay.
When the app first loads, each member of this array 
must have this form:
[boc, c2, true,    ]
The click handler changes the true to false, which causes 
a rerender. The map function has logic that looks at 
member [2] and if it's true, shows the back of the card
(ie applies no rotation), if it's false shows the 
front of the card (ie applies rotation).
The problem is that we only want the latest card to turn,
not all of the previously front-facing cards. So each click 
has to remove the previous card's rear face entirely and 
remove the front face's rotation.

below:
position [2] can have value:
i)  true = show BACK of card (red with white wiggly lines)
ii) false = show FRONT of card (face of card)

position [3] can have value:
i)  true = simply show the face of the card, no need to rotate first
ii) false = depending on value of [2] show back of card or show face, rotating it first,


The map function must take into account these four scenarios:

a) On load of app:
[[boc, c10, true, false], [boc, s1, true, false], ... [boc, hk, true, false] ]
with [2] above = true, show the back of the card
with [2] above = false, show the face of the card, rotating first

with [3] above = false, either show the back of the card or show the face of card, rotating it first
with [3] above = true, simply show the face of the card, no need to rotate

b) The first click of Next card button should change deckToDisplay.current (and hence stateDeckToDisplay) to:
[[boc, c10, false, false], [boc, s1, true, false], ... [boc, hk, true, false] ]
do this in the click handler:
deckToDisplay.current[0][2] = false


c) The second click of Next card should change deckToDisplay.current to:
[[boc, c10, null, true], [boc, s1, false, false], ... [boc, hk, true, false]  ]
do this in the click handler:
deckToDisplay.current[0][2] = null (actually the value doesn't matter in this case)
deckToDisplay.current[0][3] = true
deckToDisplay.current[1][2] = false


d) The third click of Next card should change deckToDisplay.current to:
[[boc, c10, null, true], [boc, s1, null, true], [boc, s1, false, false], ... [boc, hk, true, false]  ]

deckToDisplay.current[1][2] = null
deckToDisplay.current[1][3] = true
deckToDisplay.current[2][2] = false



e) The fifty second click of Next card should change deckToDisplay.current to:
[[boc, c10, null, true], [boc, s1, null, true], ... [boc, s1, null, true], [boc, hk, false, false]  ]

deckToDisplay.current[50][2] = null
deckToDisplay.current[50][3] = true
deckToDisplay.current[51][2] = false

e) The ith click of Next card should change deckToDisplay.current to:
[[boc, c10, null, true], [boc, s1, null, true], ... [boc, s1, null, true], [boc, hk, false, false]  ]

deckToDisplay.current[i-1][2] = null
deckToDisplay.current[i-1][3] = true
deckToDisplay.current[i][2] = false






if (memberArray[3]){
// change what's inside div of className "cardScene" to:
<div className="cardBackImgContainerNoRotate" key={memberArray[1]}>  
<img className = "cardImg" src={memberArray[1]}></img>
</div>

but 

if (!memberArray[3]){
// change what's inside div of className "cardScene" to:
<div className = {memberArray[2] ? "cardNoRotate" : "cardRotate"}> 
        <div className="cardFrontImgContainer" key={memberArray[1]}>
          <img className = "cardImg" src={memberArray[0]}></img>
        </div>
        <div className="cardBackImgContainer" key={memberArray[1]}>
        <img className = "cardImg" src={memberArray[1]}></img>
        </div>

*/}

{/* a) */}
{/* b) */}
{stateDeckToDisplay.map((memberArray)=>(
  memberArray[3] ? {/* simply show the face of the card, no need to rotate first */}
  ( <div className = "cardScene">
    <div className="cardFrontImgContainerNoRotation" key={memberArray[1]}>
          <img className = "cardImg" src={memberArray[1]}></img>
    </div>
    </div>) 
  : 
  (<div className = "cardScene"> {/* either show the back of the card or show the face of card, rotating it first */}
  <div className = {memberArray[2] ? "cardNoRotate" : "cardRotate"}>  {/* "cardNoRotate" = show back of card; "cardRotate" = show face, rotating first*/}
        <div className="cardBackImgContainer" key={memberArray[1]}>
          <img className = "cardImg" src={memberArray[0]}></img>
        </div>
        <div className="cardFrontImgContainer" key={memberArray[1]}>  {/* rotateY: 180º*/}
          <img className = "cardImg" src={memberArray[1]}></img>
        </div>
   </div>
   {/* end div className = "cardScene" follows*/}
   </div>   )   
))} 
 
 


<div className = {memberArray[2] ? "cardNoRotate" : "cardRotate"}>
</div>
className="cardImgContainer"










{/*
Next card button triggers 
two functions:
a) <App/> function moveToDisplayDeck 
this must 
i) look at the counter value i
ii) move the ith card in shuffledDeck to 
the ith position in <App/> ref deckToDisplay

b) <App/> function displayDeck
this must:
i) set the props of <CardContainer> that
makes the cards appear
*/}
