import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions"
import styles from './SearchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("") 

    function handleInputChange(e){ 
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCountries(name))
        //setName("")
    } 

    return(
        <form className={styles.searchContainer}>
        <div> 
            <input className={styles.input}
            type = 'text' 
            placeholder = "Ingrese el nombre del pais..."
            onChange ={(e)=> handleInputChange(e)} 
            // value={name}
            />
            <div>  <button className={styles.btn} onClick={(e)=> handleSubmit(e)}
            type="submit">Buscar</button>  </div>
            </div>
        </form>
    )
}