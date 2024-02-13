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





// ---------- ---------- ---------- ---------- ---------- ---------- ----------

Tues 6 June 23:
user clicks First card
  start timer
  make start/stop button opaque and opearable
  make stop/start button read "Stop"

User clicks Stop at any time
  counter == 52 ? 
                stop timer, record the elapsed time and time and date,
                change text of start/stop button to "---" and make inoperable
                :   
                stop timer

User clicks Next card (I think this has been dealt with)
  timer ticking ?
                do nothing
                :
                start timer

User clicks Next card for 52nd time
  Next card button onClick handler sends a messageto 
  <Timer/>. 

Tues 6 June 23:
When the user has turned over the 52 card and the timer is still ticking
if the user clicks Stop the start/stop button text should read "---" 
and the button become inoperable but thtat doesn't happens. This is why
(sort this out tomorrow):
In <Timer/> line 278 shows that counter never reaches 52! This is because 
somewhere the code reads counter and if it is 52 it resets it to 0! This
means that line 290 never runs!


                

