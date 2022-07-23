import React from 'react'
import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'



const LandingPage = () => {
  return (
    <div className={styles.landing} >
        <h1 className={styles.title} > Bienvenido a la API de paises</h1>
        <Link to = '/home/'>
            <button className={styles.btn}>Ingresar</button>
        </Link>
    </div>
  )
}

export default LandingPage

