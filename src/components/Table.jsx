import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// Sass styles:
import '../scss/style.scss';

// images:
import redCross from  '../images/redCross.svg';
import greenTick from  '../images/greenTick.svg';






export default function Table({tableData}) {
// prop tableData is an array of any number of members that looks like this:
// [
// {key: 0, numOfCardsAttempted: 52, timeTaken: "3:34:23", time: "2hrs23mins19s", date: "4May23", scores: {correct: 45, incorrect: 5, dontKnow: 2}},
// {key: 1, numOfCardsAttempted: 52, timeTaken: "2:14:42", time: "1hrs52mins9s", date: "6May23", scores: {correct: 47, incorrect: 3, dontKnow: 2}},
// {key: 2, numOfCardsAttempted: 52, timeTaken: "1:51:27", time: "51mins10s", date: "14May23", scores: {correct: 49, incorrect: 1, dontKnow: 2}},
// ...
// ]

const tableRowsDataArray = useRef([])

// The following line is necessary because 
// tableData to begin with is an empty object
// (not sure why!!!!) 
if ('key' in tableData) {
    tableRowsDataArray.current.push(tableData)    
                        }



// Add a value to the key property of each member
// of tableData:

    
               
for (let i = 0; i < tableRowsDataArray.current.length; i++) {
    tableRowsDataArray.current[i].key = i;
                                                            }

console.log(`In <Table/> and tableRowsDataArray.current is `)
console.table(tableRowsDataArray.current)





// Create an array with members that each represent 
// a row of table data:
let rows = 
tableRowsDataArray.current.map((member)=>(

<tr key = {member.key}>
    <td className="tableDP"> {member.numOfCardsAttempted}</td>
    <td className="tableDP"> {member.time + ",   " + member.date}</td>
    <td className="tableDP"> {member.timeTaken}</td>
    <td className="tableDP"> {member.scores.correct}</td>
    <td className="tableDP"> {member.scores.incorrect}</td>
    <td className="tableDP"> {member.scores.dontKnow}</td>
</tr>

)
)
/**/


// console.log(`In <Table/> and rows is an array with ${rows.length} members`)
// console.log(`In <Table/> and tableData is`)
// console.table(tableData)




return(
<>
<table>
<thead>
    <tr>
        <th><p className="tableHeadP">Cards<br></br>tried</p></th>
        <th><p className="tableHeadP">Time, <br></br>date</p></th>
        <th><p className="tableHeadP">Your time</p></th>
        <th><div className="tableHdiv"><img src = {greenTick} className="tableHimg" ></img></div></th>
        <th><div className="tableHdiv"><img src = {redCross} className="tableHimg" ></img></div></th>
        <th><p className="tableHeadP">Don't know</p></th>
    </tr>
</thead>
<tbody>
{/* {null}     */}
{rows}
</tbody>
</table>
</>
        )

                                }