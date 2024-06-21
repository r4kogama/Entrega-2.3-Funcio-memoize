interface ApiUrl{
    url: string,
    attribute : string,
}
  
  
const objApi: ApiUrl = { 
    url : 'https://swapi.dev/api/',
    attribute : 'vehicles/',
} 

type Vehicle<T> = {
    "name": T, 
    "model": T, 
    "manufacturer": T, 
    "cost_in_credits": T, 
    "length": T, 
    "max_atmosphering_speed": T, 
    "crew": T, 
    "passengers": T, 
    "cargo_capacity": T, 
    "consumables": T, 
    "vehicle_class": T, 
    "pilots": T[], 
    "films": T[], 
    "created": T, 
    "edited": T, 
    "url": T
}

export type Args <T extends any[], E> = (...args : T) => E | undefined;


const fetchApi =  async <T>() =>{
    try{
        const response = await fetch(objApi.url+objApi.attribute, {
            method: 'GET', 
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers:{
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        let results: Vehicle<T>[] = data.results;
        console.log(results);
        return results;
    }catch(err){
        console.error('Resquest error: '+ err);
    }
}



export const memoize = <T extends any[], E>( fnFecthApi : Args<T, E> ): Args <T, E> =>{
    let memoizeCache: Record<string, E | undefined> = {};//Record declaracion de un objeto clave valor
    console.log(memoizeCache)
    return (...args : T) => {
        const key: string = JSON.stringify(args);
        if(key in memoizeCache){//si existe independiente de su valor
            // si lo encuentra  devuelve la cache almacenada
            return memoizeCache[key];
        }else{
            //sino pasa los argumentos a la funcion 
            const datas: E | undefined = fnFecthApi(...args);
            //y los almacena en la cache
            memoizeCache[key] = datas;
            return datas;
        }
    }
}

const eventMemoize = memoize ( () => {
    return fetchApi().then(<T>(datas: Vehicle<T>[] | undefined) =>{
        if(datas === undefined)return;
        createVehicleList(datas);
        return datas;
    })
});
   



const createVehicleList = <T>(vehicles:  Vehicle<T>[]): void => {
    const ulList = document.querySelector(".list-vehicles") as  HTMLUListElement | null;
    if(ulList === null )return;
    let liNodes = '' as string;
    vehicles.forEach((vehicle: Vehicle<T>, i: number) => {
        liNodes +=
          `<li class="info-person" >
              <span>Nº: ${i+1}</span>
              <span>${vehicle.name}</span>
              <span>Model: ${vehicle.model}</span>
              <span>Enterprise: ${vehicle.manufacturer}</span>
              <span>Cost: ${vehicle.cost_in_credits}</span>
              <span>Longth: ${vehicle.length}</span>
              <span>Speed: ${vehicle.max_atmosphering_speed}</span>
              <span>Nº crew: ${vehicle.crew}</span>
              <span>Nº passengers: ${vehicle.passengers}</span>
              <span>Cargo capacity: ${vehicle.cargo_capacity}</span>
              <span>Consumables: ${vehicle.consumables}</span>
              <span>Vehicle class: ${vehicle.vehicle_class}</span>
              <span>Link data vehicle: ${vehicle.url}</span>          
          </li>`;
    });

    ulList.innerHTML = liNodes;
  };


const initialClickEvent = () =>{
    const btnList = document.querySelector('.btn-list') as HTMLButtonElement | null;
    btnList!.addEventListener('click', eventMemoize);
}


const init = (): void => {
    initialClickEvent();
};

window.addEventListener("load", init);