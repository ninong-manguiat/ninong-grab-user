const GOOGLE_API_KEY = 'AIzaSyCLMHif6cuDU8xgbvBNpBHMC218KFdjueo'
const URL = "https://maps.googleapis.com/maps/api/staticmap?center="
const SETTINGS ="&zoom=14&size=600x500&maptype=roadmap&markers=color:red%7Clabel:C%7C"
const KEY = "&key=" + GOOGLE_API_KEY

const URL_ROUTE = "https://maps.googleapis.com/maps/api/directions/json?origin="
const URL_ROUTE_DEST = "&destination="

const URL_GEO_CODE = "https://maps.googleapis.com/maps/api/geocode/json?latlng="

export const getPreviewMap = (lat, long) => {
    let url = `${URL}${lat},${long}${SETTINGS}${lat},${long}${KEY}`

    return url
}

export const getRouteMap = (origin, destination) => {
    console.log('getRouteMap', origin, destination)

    let url = `${URL_ROUTE}${origin.lat},${origin.lng}${URL_ROUTE_DEST}${destination.lat},${destination.lng}${KEY}`

    return url
}

export const getAddress = async(lat, lng) => {
    let url = `${URL_GEO_CODE}${lat},${lng}${KEY}`

    const res = await fetch(url)

    if(!res.ok){
        throw new Error('Failed to fetch Address')
    }

    const data = await res.json()
    const address = data.results[0].formatted_address;

    return address;
}