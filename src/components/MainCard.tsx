import { OpenWeatherIconsToLucide } from "@/utility/openWeatherIconsToLucide";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { MapPinned } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import BookmarkToggle from "./BookmarkToggle";
import { type Bookmark } from "@/hooks/useBookmarks";
import { useTranslation } from "react-i18next";

interface MainCardProps {
    data?: any;
    location?: any;
    bookmark?: Bookmark;
}

export default function MainCard({ data, location, bookmark }: MainCardProps) {
    const isBookmarkMode = !!bookmark;
    const isMobile = useIsMobile();

    const { t } = useTranslation();

    const ConvertedIcon =
        OpenWeatherIconsToLucide[
            isBookmarkMode ? bookmark.weather?.icon : data.weather[0].icon
        ];

    const information = {
        name: isBookmarkMode ? bookmark.name : location.name,
        country: isBookmarkMode ? bookmark.country : data.sys.country,
        temperature: isBookmarkMode ? bookmark.weather?.temp : data.main.temp,
        feelsLike: isBookmarkMode
            ? bookmark.weather?.feelsLike
            : data.main.feels_like,
        description: isBookmarkMode
            ? bookmark.weather?.description
            : data.weather[0].description,
        humidity: isBookmarkMode ? null : data.main.humidity,
        windSpeed: isBookmarkMode ? null : data.wind.speed,
        pressure: isBookmarkMode ? null : data.main.pressure,
        lat: isBookmarkMode ? bookmark.lat : data.coord.lat,
        lon: isBookmarkMode ? bookmark.lon : data.coord.lon,
    };

    return (
        <Card className="relative min-h-full">
            {!isBookmarkMode && (
                <CardContent>
                    <CardDescription>
                        {new Date().toLocaleString()}
                    </CardDescription>
                </CardContent>
            )}
            <CardHeader>
                <CardTitle className="font-bold text-3xl">
                    <div className="flex gap-2 items-center">
                        <MapPinned />
                        <span>
                            {information.name}, {information.country}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex gap-2">
                    <ConvertedIcon className="w-12 h-12" />
                    <span className="text-5xl">
                        {Math.round(information.temperature)}°C
                    </span>
                </div>
                <p>
                    {t("feels_like")} {Math.round(information.feelsLike)}°C.{" "}
                    {information.description.slice(0, 1).toUpperCase() +
                        information.description.slice(1)}
                    .
                </p>
            </CardContent>
            {!isMobile && !isBookmarkMode && (
                <CardFooter>
                    <CardDescription>
                        <p>
                            {t("humidity")}: {information.humidity}%{" "}
                        </p>
                        <p>
                            {t("wind")}: {information.windSpeed} m/s{" "}
                        </p>
                        <p>
                            {t("pressure")}: {information.pressure} hPa
                        </p>
                        <p>
                            Lat: {information.lat} Lon: {information.lon}
                        </p>
                    </CardDescription>
                </CardFooter>
            )}
            <div className="absolute right-4 top-4">
                <BookmarkToggle
                    location={isBookmarkMode ? bookmark : location}
                />
            </div>
        </Card>
    );
}
