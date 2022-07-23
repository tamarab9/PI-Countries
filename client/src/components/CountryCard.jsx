import React from "react";
import { Link } from "react-router-dom";


export default function CountryCard({flags, name, continents, population,id }) {
     return (
        <div>
            <div>
            <img src={flags} alt="imagen no encontrada" width='250px' height='125px'/>
            <h3>{name} - ({id})</h3>
            <h5></h5>
            <h5>Continente: {continents}</h5>
            <h5>Poblacion: {population}</h5>
            <div>
            <Link  key={id} to ={`/countries/${id}`}> Mas informacion...</Link>
            </div>
            </div>
        </div>
    );
}