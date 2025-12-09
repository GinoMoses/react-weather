import { 
    Sun, Moon, Cloud, CloudSun, CloudMoon, Cloudy, CloudRain, CloudSunRain, CloudMoonRain, CloudLightning, Snowflake, CloudFog
 } from "lucide-react"

interface OpenWeatherIconsToLucideType {
    [key: string]: typeof Sun
}

export const OpenWeatherIconsToLucide: OpenWeatherIconsToLucideType = {
        '01d': Sun,
        '01n': Moon,
        '02d': CloudSun,
        '02n': CloudMoon,
        '03d': Cloud,
        '03n': Cloud,
        '04d': Cloudy,
        '04n': Cloudy,
        '09d': CloudRain,
        '09n': CloudRain,
        '10d': CloudSunRain,
        '10n': CloudMoonRain,
        '11d': CloudLightning,
        '11n': CloudLightning,
        '13d': Snowflake,
        '13n': Snowflake,
        '50d': CloudFog,
        '50n': CloudFog,
    }