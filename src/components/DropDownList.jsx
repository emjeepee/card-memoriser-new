import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// Components:
// import ButtonOne from  './ButtonOne.js';


// Sass styles:
import '../scss/style.scss';


// prop listOfMenuItems is an array of objects
// that has one of two forms:
// 1)   [{card: "Ace"}, {card: "2"}, etc, {card: "J"}, {card: "Q"}, {card: "K"}].
//      This is for the dd menu of cards 
// 2)   [{suit: H}, {suit: S}, {suit: D}, {suit: C}.
//      This is for the dd menu of suits, where H, S, D and C
//      are srcs for the images of suits    


export default function DropDownList({listOfMenuItems}) {

// --------UTILITY FUNCTIONS ------------

// a utility function to deep copy any array:
function deepCopyArray(arrayArg){
    let arrayCopy = JSON.parse(JSON.stringify(arrayArg));
    return arrayCopy
                                }

// a utility function to add to each member object of an array of objects 
// a property with key key and value the index of the member object 
// in the parent array (so that each member object ends up looking like 
// this:  {name: "Chocolate", ... , key: 6} ):
function addKeyProperty(arrayArg){
    for (let i = 0; i < arrayArg.length; i++) {
        arrayArg[i].key = i;
                                              }
return arrayArg
                                 }

// --------UTILITY FUNCTIONS ------------



// Initialise state property itemsInMenu to have value
// the passed-in array listOfMenuItems with keys added
// (for the benefit of the map() function):
const [itemsInMenu, setItemsInMenu] = useState(addKeyProperty(listOfMenuItems))

// Create var menuItemsList and set it to an 
// array whose members each comprise JSX for a
// menu item for the dropdown menu. Each menu item 
// is either 
// i)   a div with text in it such as "K" or "6"
// ii)  a div with an <img/> in it with one of these four srcs: C, D, H, S:
const menuItemsList = (
    stateObj.itemsInMenu.map((member)=>(
    <li key = {member.key} >
    <div className="menuItemContainer" onClick = {()=> console.log(`You clicked member.name`) }>
    {member.card ? 
    <p className="menuItemText">
    {member.name}     
    </p> :
    <img src = {member.suit}/>
    }
    </div>
    </li>
                                        )
                            )
                    )


return(
<div>
<ul>
{menuItemsList}
</ul>
</div>
       )

                                        }