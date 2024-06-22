var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const objApi = {
    url: 'https://swapi.dev/api/',
    attribute: 'vehicles/',
};
const fetchApi = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(objApi.url + objApi.attribute, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = yield response.json();
        let results = data.results;
        console.log(results);
        return results;
    }
    catch (err) {
        console.error('Resquest error: ' + err);
    }
});
export const memoize = (fnFecthApi) => {
    let memoizeCache = {};
    return (...args) => {
        const key = JSON.stringify(args);
        if (key in memoizeCache) {
            console.log('Using cached data, the request has not been sent..');
            return memoizeCache[key];
        }
        else {
            const datas = fnFecthApi(...args);
            memoizeCache[key] = datas;
            return datas;
        }
    };
};
const eventMemoize = memoize(() => {
    return fetchApi().then((datas) => {
        if (datas === undefined)
            return;
        createVehicleList(datas);
        return datas;
    });
});
const createVehicleList = (vehicles) => {
    const ulList = document.querySelector(".list-vehicles");
    if (ulList === null)
        return;
    let liNodes = '';
    vehicles.forEach((vehicle, i) => {
        liNodes +=
            `<li class="info-vehicle" >
              <span>Nº: ${i + 1}</span>
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
const initialClickEvent = () => {
    const btnList = document.querySelector('.btn-list');
    btnList.addEventListener('click', eventMemoize);
};
const init = () => {
    initialClickEvent();
};
window.addEventListener("load", init);
//# sourceMappingURL=index.js.map