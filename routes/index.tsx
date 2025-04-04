import { Handlers, PageProps } from "$fresh/server.ts";
import  Axios  from "axios";
import Form from "../components/Form.tsx";


export type PhoneData = {
  number: string;
  country : string;
  is_valid : boolean
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url)
    const phoneNmbr = url.searchParams.get("phone") || undefined
    if(phoneNmbr){
      try{
        const check_phone_url = "https://api.api-ninjas.com/v1/validatephone?number=+"
        const data = await Axios.get(check_phone_url + phoneNmbr,
            {headers: {'X-Api-Key': Deno.env.get("API_NINJA_KEY")}})

        const fetched_phone:PhoneData ={
          number: phoneNmbr,
          country : data.data.country,
          is_valid : data.data.is_valid
        }
        if(fetched_phone.is_valid == true){
          return ctx.render(fetched_phone)
        }else{
          return ctx.render("Error, teléfono no válido")
        }

      }catch(e){
        return new Response("Api error")
      }
    }
    else{
      const fetchedPhone:PhoneData = {
        number: "",
        country: "",
        is_valid: false
      }
      return ctx.render(fetchedPhone)
    }
  }
}


export default function Home(props:PageProps) {
  return (
      <div class = "Index">
        <h1>Find Phone Location</h1>
        <Form />
        <h3>{props.data}</h3>
        <ul>
          <li>{props.data.number}</li>
          <li><a href={`/country/`+props.data.country}>{props.data.country}</a></li>
        </ul>
      </div>
  );
}
