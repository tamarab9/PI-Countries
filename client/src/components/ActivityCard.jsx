import React from "react";

export default function CountryCard({duration, name, difficulty, season, id }) {
   
    
    return (
        <div>
            <div>
            <h5>Actividad: {name}</h5>
            <h5>Dificultad: {difficulty}</h5>
            <h5>Duracion: {duration} hs</h5>
            <h5>Temporada: {season}</h5>
            
            </div>
        </div>
    );
}