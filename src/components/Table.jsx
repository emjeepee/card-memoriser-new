import React, { useEffect, useState, useContext, createContext, useRef } from "react";

// Sass styles:
import '../scss/style.scss';

// images:
import redCross from  '../images/redCross.svg';
import greenTick from  '../images/greenTick.svg';






export default function Table({tableData}) {

// A state property to hold the table data:
// const [dataForTable, setDataForTable] = useState()



// prop tableData is an array of any number of members that looks like this:
// [
// {key: 0, time: "2hrs23mins19s", date: "4May23", scores: {correct: 45, incorrect: 5, dontKnow: 2}},
// {key: 1, time: "1hrs52mins9s", date: "6May23", scores: {correct: 47, incorrect: 3, dontKnow: 2}},
// {key: 2, time: "51mins10s", date: "14May23", scores: {correct: 49, incorrect: 1, dontKnow: 2}},
// ...
// ]

let rows = 
tableData.map((member)=>(
// <>
<tr key = {member.key}>
    <td className="tableDP"> {member.date}</td>
    <td className="tableDP"> {member.time}</td>
    <td className="tableDP"> {member.scores.correct}</td>
    <td className="tableDP"> {member.scores.incorrect}</td>
    <td className="tableDP"> {member.scores.dontKnow}</td>
</tr>
// </>
)
)








return(
<>
<table>
<thead>
    <tr>
        <th><p className="tableHeadP">Date</p></th>
        <th><p className="tableHeadP">Time</p></th>
        <th><div className="tableHdiv"><img src = {greenTick} className="tableHimg" ></img></div></th>
        <th><div className="tableHdiv"><img src = {redCross} className="tableHimg" ></img></div></th>
        <th><p className="tableHeadP">Don't know</p></th>
    </tr>
</thead>
<tbody>
{rows}
</tbody>
</table>
</>
        )

                                }