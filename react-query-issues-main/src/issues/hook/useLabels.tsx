import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { sleep } from "../../helpers/sleep";

const getLabels = async (): Promise<Label[]> => {

    await sleep(2);//2seg 

    const { data } = await githubApi.get<Label[]>(`/labels`)
    console.log(data);
    return data;
}

export const useLabels = () => {

    const labelsQuery = useQuery({
        queryKey: ['labels'],//nombre del espacio en cacha, nombre NO relevante pero arg necesario 
        queryFn: getLabels, // funcion que traera al peticion

        // { 
        //     staleTime: 1000 * 60 * 60, dar un tiempo en la peticion sin necesidad de recargar el navegador (tener data fresca)
        //     initianData: [], manejan un diferencia  es la ultima data que se debe mostrar 
               //placeholderData:[debe ir el objeto que recibe la peticion]; mientras se hace la peticion muestre la data del objeto, Nos permite mostrar informacion antes que de la peticion se realice, ejemplo la data tarde 5seg ejecutando el placeholderData permite ver la data antes de esos 5 seg 
        // }
        
    })


    return labelsQuery
}
