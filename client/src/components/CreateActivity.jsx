import React, { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { addActivities, getActivities } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './CreateActivity.module.css';

function validate(input){
    let errors = {};
    if (!input.name){
        errors.name = 'Se requiere un que ingreses una actividad'
    }else if (!input.difficulty) {
        errors.difficulty = 'Se requiere un que ingreses una dificultad'

    }else if (!input.duration) {
        errors.duration = 'Se requiere un que ingreses una duracion en horas'
       
    }else if (!input.season) {
        errors.season = 'Se requiere un que ingreses una temporada'
   
    } else if (!input.countries) {
        errors.season = 'Seleccione el pais al cual le asignara la actividad'
    }
    return errors;
}

export default function CreatedActivity(){
    const dispatch = useDispatch()
    const history = useHistory() 

    const countries = useSelector((state) => state.countries)

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season:'',
        countries: [] 
    })

    
    function handleChange(e){ 
        setInput({
            ...input, 
            [e.target.name] : e.target.value 
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCheck(e){
        if(e.target.checked){ 
            setInput({
                ...input, 
                [e.target.name] : e.target.value
            })
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
        
    }

    function handleSubmit(e){
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries){
            e.preventDefault();
            alert('Complete todos los campos para poder continuar')
        } else {
            e.preventDefault();
            dispatch(addActivities(input));
            alert('Tu actividad ha sido creada exitosamente');
            history.push('/home')
            setInput({
                name: '',
                difficulty: '',
                duration: '',
                season:'',
                countries: []
            })
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            countries: input.countries.filter(country => country !== e) 
        })
    }

    useEffect(() => {
        dispatch(getActivities('ASC'))
    }, [dispatch])
    
    //console.log(input)

    return (
        <div className={styles.formAct}>
            <div>
            <Link to='/home'>
                <button className={styles.btnAz} >Volver</button>
            </Link>
            </div>
            <h1>Crear actividad</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div >
                <div>
                    <label>Nombre: </label>
                    <input type="text" value={input.name} name='name' onChange={handleChange}/>
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>Dificultad: </label>
                    <label>
                    <input type="radio" value='1' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    1</label>
                    <label>
                    <input type="radio" value='2' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    2</label>
                    <label>
                    <input type="radio" value='3' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    3</label>
                    <label>
                    <input type="radio" value='4' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    4</label>
                    <label>
                    <input type="radio" value='5' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    5</label>
                </div>
                <div>
                    <label>Duracion: </label>
                    <input type="text" value={input.duration} name='duration' onChange={handleChange}/>
                    {errors.duration && (<p>{errors.duration}</p>)}
                </div>
                <div>
                    <label>Temporada: </label>
                    <label>
                    <input type="radio" value='summer' name='season' onChange={(e) => handleCheck(e)}/>
                    Verano</label>
                    <label>
                    <input type="radio" value='fall' name='season' onChange={(e) => handleCheck(e)}/>
                    Otoño</label>
                    <label>
                    <input type="radio" value='spring' name='season' onChange={(e) => handleCheck(e)}/>
                    Primavera</label>
                    <label>
                    <input type="radio" value='winter' name='season' onChange={(e) => handleCheck(e)}/>
                    Invierno</label>
                    {errors.season && (<p>{errors.season}</p>)}
                </div>
                <div>
                    <label>Pais donde se realiza la actividad: </label>
                    <div>
                    <select onChange={(e) => handleSelect(e)} >
                    {countries.map((country) => (
                        <option value={country.name}>{country.name}</option>
                    ))}
                    </select>
                    </div>
                    {errors.countries && (<p>{errors.countries}</p>)}
                </div>
                {input.countries.map((e) => 
                <div> <p>{e}</p> 
                    <button className={styles.btnRojo} type='button' onClick={() => handleDelete(e)}>X</button>
                    </div>
                )}
                <div>
                <button className={styles.btnMoz} type='submit'>Crear actividad</button>
                </div>
                </div>
            </form>
        </div>
    )
}
