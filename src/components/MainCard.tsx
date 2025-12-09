import { OpenWeatherIconsToLucide } from "@/utility/openWeatherIconsToLucide";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";


export default function MainCard({ data }: { data: any }) {
    const ConvertedIcon = OpenWeatherIconsToLucide[data.weather[0].icon]

    return (
        <Card className="h-1/2">
            <CardContent>
                <CardDescription>{new Date().toLocaleString()}</CardDescription>
            </CardContent>
            <CardHeader>
                <CardTitle className="font-bold text-3xl">{data.name}, {data.sys.country}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex gap-2">
                    <ConvertedIcon className="w-12 h-12"/>
                    <span className="text-5xl">{Math.round(data.main.temp)}°C</span>
                </div>
                <p>Feels like {Math.round(data.main.feels_like)}°C. {(data.weather[0].description).slice(0, 1).toUpperCase() + data.weather[0].description.slice(1)}</p>
            </CardContent>
            <CardFooter>
                <CardDescription>Humidity: {data.main.humidity}% | Wind: {data.wind.speed} m/s | Pressure: {data.main.pressure} hPa</CardDescription>
            </CardFooter>
        </Card>
    )
}