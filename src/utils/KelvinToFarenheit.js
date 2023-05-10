import { kelvinToCelcius } from "./kelvinToCelcius"

export const KelvinToFarenheit = (kelvinDegrades) => {
    const celcius = kelvinToCelcius(kelvinDegrades);
    return (celcius * 9/5) +32
}