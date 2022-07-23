const initialState = {
    countries: [],  //stado para renderizar, se usa para hacer el filtrado
    allCountries: [],  // Estado soporte que siempre tiene todos los paise
    activities : [],
  
    
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case 'GET_NAME_COUNTRIES':
            return{
                ...state,
                countries: action.payload
            }

        

            case 'ORDER_BY_NAME':
                let sortedArr = action.payload === 'asc'?
                    state.countries.sort(function(a,b){
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }) :
                    state.countries.sort(function(a,b){
                        if(a.name > b.name){
                            return - 1;
                        }
                        if(b.name > a.name){
                            return 1;
                        }
                        return 0;
                    })

                return {
                    ...state,
                    countries: sortedArr
                }


                
            case "POST_COUNTRIES":
                return {
                    ...state,
                }

            case 'GET_ACTIVITIES':
                                
                return {
                    ...state,
                    activities: action.payload
                }

                case 'ADD_ACTIVITIES':
                    return {
                        ...state,
                        activities: [...state.activities, action.payload]
                    }

            case 'FILTER_BY_REGION':
                const allCountries = state.allCountries
                const regionFilter = action.payload === 'All'? allCountries : allCountries.filter(p => p.continents === action.payload)
                return{
                    ...state,
                    countries: regionFilter
                }
                              

            case 'FILTER_CREATED':
                let filter = action.payload === 'all'?state.allCountries : state.allCountries.filter((country)=>{
                    const activities= country.activities.map((a)=>a.name)
                    return activities.includes(action.payload)
                })
                                      
                return {
                    ...state,
                    countries: filter
                }
                
                case 'FILTER_POPULATION':
                    const filterPopulation = action.payload === "asc" ?
                    state.allCountries.sort(function (a, b){                                  //Ordena elementos de acuerdo a su valor.
                        return a.population - b.population
                    }) : 
                    state.allCountries.sort(function (a, b){
                        return b.population - a.population
                    })
                return{
                    ...state,
                    countries: filterPopulation
                }

            // case "GET_DETAILS":
            //     return{
            //         ...state,
            //         detail: action.payload 
            //     }
            //     case 'SET_DETAIL':
            //         return{
            //             ...state,
            //             stateDetail: {}
            //         }         

            default: 
            return state;
    }
}
export default rootReducer;