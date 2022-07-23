const { Router } = require('express');
// Importar todos los routers;

const Sequelize = require('sequelize')

const axios = require('axios');

//Traemos las tablas de db
const { Activity, Country } = require('../db'); // traigo las tablas de BD
const { Op } = require('sequelize');

// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    let allCountriesApi = (await axios.get("https://restcountries.com/v3/all")).data.map( p =>({
            id: p.cca3,
            name: p.translations.spa.common,
            flags: p.flags[1],
            continents: p.continents[0],
            capital: p.capital? p.capital[0]:null, 
            subregion: p.subregion, //? p.subregion: "",
            area: p.area,
            population: p.population,
        

    }))
    return allCountriesApi
}


router.get('/countries', async (req, res)=> { //query
    let allCountries = await Country.findAll({include:{ all: true }}); //consulta la base de datos
    const id = req.query.id; // peticion 
    const name = req.query.name;   
try {
    if (id) { 
        let countriesId = allCountries.filter( p => p.id.toLowerCase()===id.toLowerCase()) 
        return countriesId.length ?
        res.status(200).send(countriesId) :
        res.status(404).send('Country not found');
        //return res.status(200).send(countryDetail)
    }
    if (name) {
        let countriesName = allCountries.filter( p => p.name.toLowerCase().includes(name.toLowerCase()))
        return countriesName.length ?
        res.status(200).send(countriesName) :
        res.status(404).send('Country not found');
        //res.status(200).send(countryDetail)
    }
    if(!allCountries.length){ 
        allCountries = await getApiInfo();
        await Country.bulkCreate(allCountries);
    }
    return res.status(200).json(allCountries)
    
} catch (error) {
    res.status(400).send(error)
    //console.log("soy el error de la ruta de get countries", error)
} 

})

router.get('/countries/:id', async (req, res)=>{
    const id = req.params.id; // const {id} = req.params
    //console.log("entre a countries/:id", id)
    //let countriesTotal = await getAllCountries ();
try{
if (id) {
    const countryDetail = await  Country.findOne({include:{ all: true }, where:{id: id}})
    //console.log("soy el countryDetail", countryDetail)
    return res.status(200).send(countryDetail)
}
}catch{
// res.status(200).json(countriesId) :
res.status(404).send('Country not found');
}
}) 

router.delete('/delete/:id', (req,res)=> {
    try {
        let {id} = req.params
        Country.destroy({
            where: {
                id: id
            }
        })
        res.send("pais eliminado correctamente")
    } catch (error) {
        
    }
})


//--------------------

router.get('/activity', async (req,res) => {

const activities = await Activity.findAll();
if(activities.length) {
  return res.status(200).json(activities);
}
return res.status(200).send([]);

});

router.post("/activity", async (req,res)=>{
    const {name,difficulty,duration,season, countries} = req.body;
    
    if(!countries.length || !duration || !season.length || !name || !difficulty) return res.status(404)
    
    try {
        const [activity, created] = await Activity.findOrCreate({
            
            where:{
            name: name,
            difficulty: difficulty,
            duration:duration,
            season: season,   
            }
        })
        //console.log
        //console.log("soy la actividad creada",activity )
        //console.log("soy los countries", countries)
        for(let pais of countries ){
            console.log("soy el pais", pais)
            console.log("soy el tipo de pais", typeof pais)

            const paisRelacion = await Country.findOne({
                where:{
                    name: pais
                }
            });

            console.log("soy el pais de la relacion", paisRelacion)
             //const newRel = await activity.addCountry(paisRelacion)
             //await activity.addCountry(paisRelacion)
             //console.log("soy el NewRel", newRel)
            await paisRelacion.addActivity(activity)
        }
        
        return res.json(activity);
    
    
  } catch (err) {
    res.status(400).send(err);
    console.log("soy el error", err)
  }
})


router.delete('/delete/:id', (req,res)=> {

    try {
        let ID = req.params.id
        Activity.destroy({
            where: {
                id: ID
            }
        })
        res.send("actividad eliminada")
    } catch (error) {
        
    }
})

router.put('/:id', async(req,res) =>{

    const { name, difficulty, duration, season, country } = req.body; 
    const activitie = await Activities.findAll();

    const id = req.params.id
    if (!id || !name || !difficulty || !duration || !season || !country) {
         return res.status(404).json({message: `No se encuentra actividad solicitada`});
    }
    else{
        let ActivitieFind = activitie.find(e => e.id === parseInt(id))

        if (ActivitieFind){
            ActivitieFind.name = name;
            ActivitieFind.difficulty = difficulty;
            ActivitieFind.season = season;
            ActivitieFind.country = country;
            res.send(ActivitieFind)
        }
        else {
            res.status(404).send("no hay activity")
        }
    }
    
})

router.get('/:id', async (req,res)=>{
    try {
        let activitie = await Activity.findAll();
        const id = req.params.id
        const SigleActivitie = activitie.filter(c => id == c.id)
        
        if (!SigleActivitie.length) {
            return res.status(404).json({message: `No se encuentra actividad solicitada con el id: ${id}`});
        }
        return res.send(SigleActivitie);
    
        } catch (error) {
            next(error)
        }
})

module.exports = router;
