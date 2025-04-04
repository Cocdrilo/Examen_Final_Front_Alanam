import { Handlers, PageProps } from "$fresh/server.ts";
import  Axios  from "axios";
import {PhoneData} from "../index.tsx";

type CityData = {
    name:string,
    capital : string,
}

export const handler: Handlers = {
    async GET(req, ctx) {
        const url = new URL(req.url)
        const country = ctx.params.country

        try{
            const country_url = "https://api.api-ninjas.com/v1/country?name="
            const data = await Axios.get(country_url + country,
                {headers: {'X-Api-Key': Deno.env.get("API_NINJA_KEY")}})
            const city:CityData = {
                name:country,
                capital:data.data[0].capital
            }
            console.log(city)
            return ctx.render(city)

        }catch{
            return new Response("Error Api")
        }

    }
}




export default function GreetPage(props: PageProps) {

    return (
        <div>
            <p>{props.data.name}</p>
            <p><a href={`/Capital/`+props.data.capital}>{props.data.capital}</a></p>
        </div>
    );
}