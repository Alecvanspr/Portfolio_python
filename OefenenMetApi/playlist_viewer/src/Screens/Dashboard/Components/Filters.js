import React, {useState} from "react";
import './Filters.css';


export default function Filters(props){
    const [filters,setFilters] = useState({
            naam:"",
            sorterenOp:"naam",
        })
        const  items = ["naam","aantal"]

        //Dit is zodat de veranderingen die worden gedaan gelijk opgeslagen worden in het systeen
        const handleChange = e =>{
            let {name, value} = e.target;
    
            if(e.target.type === "checkbox"){
                value = e.target.checked;
            }
            setFilters({[name]:value})
        }
        const options  = items.map(item => (
            <option>{item}</option>
        ))
    return(
        <div className="filters">
            <div>
                <h2>Filters</h2>
                <p>{filters.naam}</p>
            </div>
            <div>
                <input
                    id="naam"
                    name="naam"
                    value={filters.naam}
                    onChange={handleChange}
                 ></input>
                </div>
                <div>
                <label for="sorterenOp">sorteer op </label>
                 <select
                    id="sorterenOp"
                    name="sorterenOp"
                    value={filters.sorterenOp}
                    onChange={handleChange}
                 >
                    {options}
                 </select>
                 </div>
                 <button onClick={()=>props.handleFilters(filters)}>Laad</button>
        </div>  
    )
}