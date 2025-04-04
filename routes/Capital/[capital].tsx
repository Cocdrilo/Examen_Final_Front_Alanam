import { Handlers, PageProps } from "$fresh/server.ts";
import  Axios  from "axios";
import {PhoneData} from "../index.tsx";

type CapitalData = {
    name:string,
    country : string,
    temperature : number
}

export const handler: Handlers = {
    async GET(req, ctx) {
        const url = new URL(req.url)
        const country = ctx.params.capital

        try{
            const country_url = "https://api.api-ninjas.com/v1/city?name="
            const temp_url = "https://api.api-ninjas.com/v1/weather?lat="
            const lat_url = "https://api.api-ninjas.com/v1/geocoding?city="
            console.log(country)
            const data = await Axios.get(country_url + country,
                {headers: {'X-Api-Key': Deno.env.get("API_NINJA_KEY")}})
            const data3 =await Axios.get(lat_url + country,
                {headers: {'X-Api-Key': Deno.env.get("API_NINJA_KEY")}})
            console.log(temp_url + data3.data[0].latitude + "&lon" +data3.data[0].longitude)
            const data2 = await Axios.get(temp_url + data3.data[0].latitude + "&lon=" +data3.data[0].longitude,
                {headers: {'X-Api-Key': Deno.env.get("API_NINJA_KEY")}})
            console.log(data2)
            const city:CapitalData = {
                name:country,
                country:data.data[0].country,
                temperature : data2.data.temp

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
            <p><a href={`/country/`+props.data.country}>{props.data.country}</a></p>
            <p>{props.data.temperature}</p>
        </div>
    );
}