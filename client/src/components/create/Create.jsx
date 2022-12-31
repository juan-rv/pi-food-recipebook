import { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { postRecipe } from "../../redux/actions/actions"
import { getTypesOfDiet } from "../../redux/actions/actions"
import { useDispatch, useSelector } from "react-redux"
import {useAuth0} from '@auth0/auth0-react'
import AllLogin from "../login/AllLogin/AllLogin"

import './Create.css'

function validate(input) {

    const regexTitle = /^[a-zA-Z ]+$/;
    const {
        title,
        aggregateLikes,
    } = input
    const numbers = [aggregateLikes]
    
    const checkNegatives = (arr) => {
        return arr.filter((el) => Number(el) < 0).length;
    };

    const checkZero = (arr) => {
        return arr.find((el) => Number(el) === 0)
    }

    const checkNaN = (arr) => {
        return arr.filter((el) => isNaN(Number(el))).length;
    };

    const checkLimit = (arr, limit) => {
        return arr.filter((el) => el > limit).length;
    }



    let errors = {};

    //check Title
    if (!regexTitle.test(title)) {
        errors.title = "Titulo de receta invalido";
    } else if (title.length < 5) {
        errors.title = "Debe ingresar un titulo de receta mas largo"
    } else if (title[0] !== title[0].toUpperCase()) {
        errors.title = "El titulo de la receta debe empezar con mayuscula"
    } else if (title.length === 0) {
        errors.title = "Ingrese el Titulo de su receta"
    }
    
    //check negatives
    if (checkNegatives(numbers)) {
        errors.negatives = "No son permitidos los numeros negativos"
    }

    //check 0
    if (checkZero(numbers)) {
        errors.zero = "No se permiten valores iguales a 0"
    }

    //check number type
    else if (checkNaN(numbers)) {
        errors.nan = "Solo se reciben valores numericos"
    }

    // check limit 
    if (checkLimit([aggregateLikes], 10000)) {
        errors.limit = "El score no debe superar los 10000 puntos"
    }


    input.summary
        ? (errors.summary = "")
        : (errors.summary = "");
    
    input.diets.length < 1
        ? (errors.diets = "Choose at least one diet")
        : (errors.diets = "");
    
    
    if (!input.image.includes("https://" || "http://") && !input.image.includes("http://" || "http://")) {
        errors.image = ""
    } else {
        errors.image = "";   
    }
    return errors;
}

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({});
    const { isAuthenticated } = useAuth0()
    
    useEffect(() => {
        dispatch(getTypesOfDiet());
    }, [dispatch]);

    const [input, setInput] = useState({
        title: "",
        summary: "",
        aggregateLikes: "",
        healthScore: 0,
        analyzedInstructions: "",
        image: "",
        diets: [],
    });
    
    function handleChange(e) {
        setInput((input) => ({
            ...input,
            [e.target.name]: e.target.value,
        }));
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }
    

    function handleSelectDiet(e) {
        setInput((input) => ({
            ...input,
            diets: [...input.diets, e.target.value],
        }));
        setErrors(
            validate({
                ...input,
                diets: [...input.diets, e.target.value],
            })
        );
    }
    

    function handleSubmit(e) {

        if (input.title && input.summary && input.diets.length > 0) {
            e.preventDefault();
            dispatch(postRecipe(input));
            alert("Receta creada con éxito!!");
            setInput({
                title: "",
                summary: "",
                aggregateLikes: "",
                healthScore: 0,
                analyzedInstructions: "",
                image: "",
                diets: [],
            });
            history.push("/home");
        } else {
            e.preventDefault();
            alert("You must complete every field!!");
        }
    }
    
    function handleDelete(e, d) {
        e.preventDefault();
        setInput({
            ...input,
            diets: input.diets.filter((diet) => diet !== d),
        });
    }

    return (
        <div>
            {isAuthenticated ? (
                <div className="content_create">
                    <div>
                        <div className="nav_create">
                            <Link to="/home">
                                <button className="button_home">Todas las recetas</button>
                            </Link> 
                            
                            <div>
                                <AllLogin />
                            </div>
                        </div>

                            <div>
                                <h1 className="title_create">Crea tu receta</h1>
                            </div>
                        <div className="great_form" >
                            <div className="content_form">
                                <form onSubmit={(e) => handleSubmit(e)}>

                                    <div className="title_score">
                                        <div className="plate_create">
                                        <input                            
                                            placeholder="Nombre de la receta"
                                            type="text"
                                            value={input.title}
                                            name="title"
                                            onChange={(e) => handleChange(e)}
                                        />
                                        {errors.title && <h6>{errors.title}</h6>}
                                    </div>

                                    <div className="score_create">
                                        <input  
                                            placeholder="Score"
                                            type="number"   
                                            value={input.aggregateLikes}  
                                            name="aggregateLikes" 
                                            onChange={(e) => handleChange(e)}  
                                        /> 
                                        {errors.negatives && <h6>{errors.negatives}</h6>}
                                        {errors.zero && <h6>{errors.zero}</h6>}
                                        {errors.nan && <h6>{errors.nan}</h6>}
                                        {errors.limit && <h6>{errors.limit}</h6>}
                                    </div>

                                    </div>

                                    

                                    <div className="summary_create">
                                        <input
                                            placeholder="Resumen corto"     
                                            type="text"   
                                            value={input.summary}
                                            name="summary"
                                            onChange={(e) => handleChange(e)}
                                        />
                                        {errors.summary && <p>{errors.summary}</p>}
                                    </div>

                                    <div className="instructions_create">
                                        <textarea
                                            type="text"
                                            placeholder="Instrucciones"
                                            rows="5"
                                            value={input.analyzedInstructions}
                                            name="analyzedInstructions"
                                            onChange={(e) => handleChange(e)}  
                                        />    
                                    </div>

                                    <div className="image_create">
                                        <input
                                            type="text"
                                            placeholder=" Ejemplo de imagen https://"
                                            value={input.image}
                                            name="image"
                                            onChange={(e) => handleChange(e)}  
                                        />
                                        {errors.image && <p>{errors.image}</p>}     
                                    </div>
                    
                                    <button className="button_create" type="submit">
                                        Crear receta
                                    </button>
                                    
                                </form>
                                <div className="diets_create">
                                    
                                    <span>Type of Diet:</span>   
                                    <select onChange={(e) => handleSelectDiet(e)}> 
                                        {diets.map((d) => (
                                            <option value={d.name} key={d.name}>
                                                {d.name}
                                            </option>
                                        ))};
                                    </select>
                                    
                                    {input.diets.map((d, i) => (
                                        <ul className="d" key={i}>
                                            <li >{d}</li>
                                            <button classname='delette_button' onClick={(e) => handleDelete(e, d)}>x</button>
                                        </ul>
                                    ))}
                                    {errors.diets && <p>{errors.diets}</p>}
                                    </div>
                                
                            </div>  
                            <div className="card_create">
                                <div className="card_container">
                                    <div className="card_title">
                                        {input.title.length > 0 ? 
                                            <h1>{input.title}</h1>
                                            : <h1>Title</h1>}
                                    </div>
                                    
                                    <div className="img_contain">
                                        <img
                                            src={
                                                input.image.length
                                                    ? input.image 
                                                    : 'https://st2.depositphotos.com/3309423/5690/i/600/depositphotos_56904173-stock-photo-fork-and-a-knife-with.jpg'
                                            }
                                            alt="imagen de la receta"
                                            className="card_img"
                                        />
                                        <div className="score_card">
                                        {input.aggregateLikes.length > 0 ?
                                            <h1>{input.aggregateLikes} score</h1>
                                            : <h1>Score</h1>}
                                    </div>
                                    </div>
                                    
                                </div>
                                <div>
                                    <h2>
                                        Tipo de dietas:
                                    </h2>
                                    </div>

                                <div className="die"> 
                                    {input.diets.map((diets) => (
                                        <p key={diets}>{diets}</p>
                                    ))}
                                </div>
                            </div>   
                        </div>
                    </div> 
                
                </div>
                
            ) : (
                    <div className="content_create">
                <div className="nav_create">
                    <Link to="/home">
                        <button className="button_home">Todas las recetas</button>
                    </Link> 
                    <div>
                            <AllLogin />
                            </div>
                    </div>
                    
                    <div className="alert_inicio">
                    <h1> Debes de crear una cuenta o iniciar sesión para poder acceder a todas las funcionabilidades de la pagina</h1>
                    </div>

                    </div>
                    
            )}
            
        </div>
        
    )
}