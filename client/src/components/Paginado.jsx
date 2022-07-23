import React from "react";
import  './Paginado.module.css';

export default function Paginado ({countriesPerPage, allCountries, paginado}){ 
    const pageNumber = []
    for(let i=0; i<Math.ceil(allCountries/countriesPerPage); i++)
    {        
        pageNumber.push(i + 1) 
    }

    
    return(
       <nav>
        <ul>
           {
            pageNumber?.map(number =>(
                    <button key={number} onClick={() => paginado(number)}>{number}</button>    ))
           }
        </ul>
        </nav>
    )
}