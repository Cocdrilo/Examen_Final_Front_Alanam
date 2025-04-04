import { Handlers } from "$fresh/server.ts";
import { FunctionalComponent } from "preact/src/index.d.ts";
import Axios from "axios"
import header from "./Header.tsx";

const Form:FunctionalComponent =() =>{
    return(
        <div class="Form Container">
            <form method="GET" action="/">
                <input type="text" name="phone" placeholder="teléfono a buscar" required/>
                <button type="submit">Buscar Teléfono</button>
            </form>
        </div>
    )
}


export default Form