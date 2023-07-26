import { TGeoLocation } from "@components/types";
let geoOptions = {
    timeout: 10 * 1000,
    enableHighAccuracy: true,
};

let defaultLocation = { "last_updated": 0, "latitude": 0, "longitude": 0 };

let geoSuccess = function (position: GeolocationPosition) {
    let updatedLocation = { "last_updated": Date.now(), "latitude": position.coords.latitude, "longitude": position.coords.longitude }
    localStorage.setItem("geoposition", JSON.stringify(updatedLocation));
    return updatedLocation
};

let geoError = function (error: any) {
    console.log('Error occurred. Error code: ' + error.code);
    if (localStorage.getItem("geoposition") === null) {
        localStorage.setItem("geoposition", JSON.stringify(defaultLocation));
    }
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
};


export const getLocationPromise = (): Promise<GeolocationPosition> => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => { resolve(position) },
            error => { reject(error) }
        )
    }).catch(error => error)
}

export const getLocation = async () : Promise<TGeoLocation> => {
    const location = await getLocationPromise();
    console.log(location);
    if ("code" in location) {
        geoError(location);
        return JSON.parse(localStorage.getItem("geoposition"));
    }
    return geoSuccess(location);
}
