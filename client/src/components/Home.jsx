import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { getCountries, getActivities, filterCountriesByRegion, filterCreated, orderByName, filterPopulation} from '../actions';
import CountryCard from "./CountryCard";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from './Home.module.css';

export default function Home(){

    const dispatch = useDispatch();
    const allCountries = useSelector ((state) => state.countries) 
    const allActivities = useSelector((state) => state.activities) 
    const [order, setOrder] = useState('')
   
    //Paginado
    
    const[currentPage, setCurrentPage] = useState(1) 
    const[countriesPerPage] = useState(9)//10
    const indexOfLastCounty = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCounty - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCounty) 
   
    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    } 


    useEffect(() =>{
        dispatch(getCountries());
        dispatch(getActivities());
    },[dispatch])

function handleClick(e){
    e.preventDefault();
    dispatch(getCountries());
}
//-----------Filtros--------
function handleFilterStatus(e){ 
    dispatch(filterCountriesByRegion(e.target.value))
}
   
function handleFilterActivity(e){
    dispatch(filterCreated(e.target.value))
}


function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)

}function handlePopuChange(e) {
    e.preventDefault()
    if(e.target.value !== "all"){
        dispatch(filterPopulation(e.target.value))
        setCurrentPage(1)        
        setOrder(e.target.value) 
    }else{
        dispatch(getCountries())}
        setCurrentPage(1)                                                                  
        setOrder(e.target.value)
};                                                            


return(
    <div className={styles.home}>
        <Link to='/'>
         <p>Volver al inicio</p>
        </Link>
        <h2>Buscar paises</h2>
        <SearchBar/>

      <div className= {styles.order}>
      <label>Filtrar por: </label>     
          <select onChange={e => handleFilterStatus(e)}>
                <option value="">Continente</option>         
                <option value="All">All continents</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Oceania">Oceania</option>
                </select>
            <select onChange={e => handleSort(e)}>
                <option value=''>Alfabeticamente</option>
                <option value='asc'>A-Z</option>
                <option value='des'>Z-A</option>
            </select>
        <select onChange={e => handlePopuChange(e)}>
            <option value =''>Población</option> 
            <option value ='asc'>Ascendente</option> 
            <option value='des'>Descendente</option>
        </select>
             {/* ordenar por actividad  */}
             {allActivities.length >0 ?
             <select onChange={e => handleFilterActivity(e)}>
                <option value='All' selected disabled>Actividades</option>
                   { allActivities.map(e =>
                        <option key={e.id} value={e.name}>
                            {e.name}
                        </option>
                        )}
                    </select>
                    : 
                <select><option selected disabled>No se encontraron asctividades</option></select>
                }
            
            <Link to ='/activity'> <button className={styles.btnMoz}>Crear Actividad</button></Link>

            <button className={styles.btnAz} onClick={e => {handleClick(e)}}>Cargar todos los paises</button>
            {   
            <ul className={styles.container}>
                {currentCountries?.map(p => (
                <CountryCard 
                name={p.name} 
                flags={p.flags} 
                continent={p.continent}
                id={p.id}
                population={p.population}
                key={p.id}/>
                ))}
            </ul>
            }
            
   
             <div className={styles.pagination}>Paginas 
             <ul>
            <Paginado 
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length} 
            paginado={paginado}
            />
            </ul>
            </div>
    </div>
    </div>
)};
