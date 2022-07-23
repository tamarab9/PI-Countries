import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useEffect } from "react";
import ActivityCard from "./ActivityCard";
import axios from "axios";
import  styles from "./CountryDetail.module.css";

    export default function CountryDetail(props){

        //console.log("soy las props.", props.match.params.id)
        const [countryDetail, setcountryDetail]  = useState([]);

        const getCountryDetail = async () => {
            //console.log("soy las props", props)
            const country = await axios.get(`http://localhost:3001/countries/${props.match.params.id}`)
            //console.log( "soy la data", country.data)
            setcountryDetail(country.data)
        }
        useEffect(()=>{
            getCountryDetail();
        },[]) 
      
        return(
            <div className={styles.cardContainer}>      
              <div className={styles.contPpal}>
                            {countryDetail ?
                            // {country && country.id ?
                            <div>
                                <h1>{countryDetail.name}</h1>
                                <img src={countryDetail.flags} alt="img not found" />
                                <h4>Continente: {countryDetail.continents}</h4>
                                <h4>Capital: {countryDetail.capital}</h4>
                                <h4>Subregion: {countryDetail.subregion}</h4>
                                <h4>Area: {countryDetail.area} km</h4>
                                <h4>Poblacion: {countryDetail.population}</h4>
                                {countryDetail.activities && countryDetail.activities.map((activity) => 
                                      <ActivityCard 
                                        name={activity.name} 
                                        difficulty={activity.difficulty}
                                        duration={activity.duration}
                                        season={activity.season} />)}
                                                </div>
                                                : <h1 className={styles.load}>Loading...</h1>
                                                }
                                                <Link to="/home">
                                                    <button className={styles.btnAz} >Volver</button>
                                                </Link>
                                                </div>
                                            </div>
                            )
                                            }