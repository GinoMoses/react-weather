import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import "../index.css";
import MainCard from "@/components/MainCard";
import { OpenWeatherIconsToLucide } from "@/utility/openWeatherIconsToLucide";
import SecondaryCard from "@/components/SecondaryCard";
import TemperatureChart from "@/components/TemperatureChart";
import { type SearchResult } from "@/components/SearchBar";
import type { useBookmarksReturn } from "@/hooks/useBookmarks";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";

const units = "metric";
const key = import.meta.env.VITE_API_KEY;

export default function Home() {
    const { i18n } = useTranslation();

    const [data, setData] = useState<any>(null);
    const [forecastData, setForecastData] = useState<any>(null);

    const { isBookmarked, updateBookmarkWeather } =
        useOutletContext<useBookmarksReturn>();
    const { selectedLocation } = useOutletContext<{
        selectedLocation: SearchResult | null;
    }>();
    const routerState = useLocation().state as { location?: SearchResult };

    const isMobile = useIsMobile();

    const defaultCity: SearchResult = {
        name: "Warsaw",
        country: "PL",
        lat: 52.2297,
        lon: 21.0122,
    };

    const activeLocation =
        selectedLocation || routerState?.location || defaultCity;

    useEffect(() => {
        if (activeLocation) {
            const redirectedUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${activeLocation.lat}&lon=${activeLocation.lon}&units=${units}&lang=${i18n.language}&appid=${key}`;
            const redirectedUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${activeLocation.lat}&lon=${activeLocation.lon}&units=${units}&lang=${i18n.language}&appid=${key}`;

            fetch(redirectedUrl)
                .then((response) => response.json())
                .then((json) => {
                    setData(json);

                    if (isBookmarked(activeLocation)) {
                        updateBookmarkWeather(activeLocation, json);
                    }
                })
                .catch((err) => console.error(`ERROR: ${err}`));

            fetch(redirectedUrlForecast)
                .then((response) => response.json())
                .then((json) => setForecastData(json))
                .catch((err) => console.error(`ERROR: ${err}`));
            return;
        }
    }, [selectedLocation, routerState, i18n.language]);

    const chartData = forecastData
        ? forecastData.list.slice(0, 8).map((entry: any) => ({
              time: entry.dt_txt.slice(isMobile ? 10 : 8, 16),
              value: entry.main.temp,
              icon: OpenWeatherIconsToLucide[entry.weather[0].icon],
          }))
        : [];

    if (!data) return null;

    return !isMobile ? (
        <div className="flex gap-4 p-2">
            <div className={`flex flex-col gap-4 min-w-2/8`}>
                <div className="h-1/2">
                    <MainCard data={data} location={activeLocation} />
                </div>
                <div className="h-1/2">
                    <SecondaryCard data={data} />
                </div>
            </div>
            <div className="w-full">
                <TemperatureChart chartData={chartData} />
            </div>
        </div>
    ) : (
        <div className="flex flex-col gap-4 p-2">
            <div className={`flex flex-col gap-4 min-h-1/2`}>
                <div className="">
                    <MainCard data={data} location={activeLocation} />
                </div>
                <div className="">
                    <SecondaryCard data={data} />
                </div>
            </div>
            <div className="">
                <TemperatureChart chartData={chartData} />
            </div>
        </div>
    );
}
