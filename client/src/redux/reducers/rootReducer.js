import { //importacion por destructuring de las acciones de "actions"
    GET_RECIPES,
    GET_DETAIL,
    GET_NAME_RECIPE,
    GET_DIETS,
    ORDER_BY_NAME,
    ORDER_BY_SCORE_LIKES,
    FILTER_BY_DIET,
    GET_TYPES_OF_DIET,
    POST_RECIPE,
    REMOVE_DETAIL,
    GET_CLEAN,
    DELETE_RECIPE,
    POST_USER,
    GET_USER,
    DETAIL_USER,
    
} from '../actions/actions'
 
//Estado inicial
const initialState = {
    allRecipes: [], // array de recetas
    recipes: [],
    diets: [], // array de types o dietas
    detail: [],
    users: [],
    userId: {},
    review: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) { //evalua actyion types
        case GET_RECIPES:
            return { // nos devuelve el estado
                ...state,
                recipes: action.payload, 
                allRecipes: action.payload //traer todos los productos y cargarlos con actyon.payload
            }
        case GET_DETAIL: 
            return {
                ...state, 
                detail: action.payload
            }
        case GET_NAME_RECIPE:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                detail: action.payload
            }
        case ORDER_BY_NAME:
            let sortedRecipes =
                action.payload === "A-Z"              
                    ? state.recipes.sort(function (a, b) {
                        if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            return 1;                           
                        }
                        if (b.title.toLowerCase() > a.title.toLowerCase()) {
                            return -1;                            
                        }
                        return 0;
                    })                   
                    : state.recipes.sort(function (a, b) {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) {
                            return 1;                           
                        }
                        if (b.title.toLowerCase() < a.title.toLowerCase()) {
                            return -1;                           
                        }
                        return 0;
                    });           
            return {                   
                ...state,                
                recipes: action.payload === "default" ? state.recipes : sortedRecipes,                 
            };
        case ORDER_BY_SCORE_LIKES:
            let orderedRecipes =
                action.payload === "Desc"
                    ? state.recipes.sort((a, b) => a.aggregateLikes - b.aggregateLikes)
                    : state.recipes.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
            return {
                ...state,
                recipes: action.payload === "All" ? state.recipes : orderedRecipes,                 
            };
         case FILTER_BY_DIET:
            let allRecipes = state.allRecipes;            
            const recipesApi = allRecipes.filter((r) => !r.createdDb);
            const filteredRecipesApi = recipesApi.filter((r) =>
                r.diets.includes(action.payload)
            );
            const recipeDb = allRecipes.filter((r) => r.createdDb);
            const filteredRecipeDb = recipeDb.filter(
                (r) => r.diets.name === action.payload
            );
            const filtered = filteredRecipeDb.concat(filteredRecipesApi);
            const vegetarianApi = allRecipes.filter((r) => r.vegetarian === true);
            const vegetarianDb = recipeDb.filter(
                (r) => r.diets.name === "vegetarian"
            );
            const vegetarian = vegetarianDb.concat(vegetarianApi);
            const ternario = action.payload === "vegetarian" ? vegetarian : filtered;
                return {
                  ...state,
                  recipes: action.payload === "default" ? allRecipes : ternario,
            };
        case GET_TYPES_OF_DIET:
            return {
                ...state,
                diets: action.payload
            }
        case POST_RECIPE:
            return {
                ...state
            }
        
        case REMOVE_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
       
        default:
            return state;
        
        case GET_CLEAN:
            return {
                ...state,
                detail: action.payload
            }
        	case DELETE_RECIPE:
            return { ...state };
        
        case POST_USER:
            return {
                ...state,
            };
        
        case GET_USER:
            return {
                ...state,
                users: action.payload,
            }
        
        case DETAIL_USER:
            return {
                ...state,
                userId: action.payload,
            }
        
		
    }
}
export default rootReducer;