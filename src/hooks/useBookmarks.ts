import { useEffect, useState } from "react";
import { type SearchResult } from "@/components/SearchBar";
import { useTranslation } from "react-i18next";

const BOOKMARKS_KEY = "bookmarks";
const apiKey = import.meta.env.VITE_API_KEY;

export interface Bookmark extends SearchResult {
    weather: {
        temp: number;
        feelsLike: number;
        icon: string;
        description: string;
    } | null;
    lastUpdated: number;
}

export interface useBookmarksReturn {
    bookmarks: Bookmark[];
    isBookmarked: (city: SearchResult) => Boolean;
    addBookmark: (ccity: SearchResult) => void;
    removeBookmark: (ccity: SearchResult) => void;
    updateBookmarkWeather: (city: SearchResult, weatherData: any) => void;
}

export default function useBookmarks(): useBookmarksReturn {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const { i18n } = useTranslation();

    useEffect(() => {
        const stored = localStorage.getItem(BOOKMARKS_KEY);
        if (stored) {
            setBookmarks(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }, [bookmarks]);

    function isBookmarked(city: SearchResult) {
        return bookmarks.some((c) => c.lat === city.lat && c.lon === city.lon);
    }

    function addBookmark(city: SearchResult) {
        if (!isBookmarked(city)) {
            setBookmarks((prev) => [
                ...prev,
                {
                    ...city,
                    weather: null,
                    lastUpdated: 0,
                },
            ]);

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&lang=${i18n.language}&appid=${apiKey}`;
            fetch(url)
                .then((response) => response.json())
                .then((weatherData) => {
                    updateBookmarkWeather(city, weatherData);
                })
                .catch((err) =>
                    console.error(`Bookmark weather fetch ERROR: ${err}`)
                );
        }
    }

    function removeBookmark(city: SearchResult) {
        setBookmarks((prev) =>
            prev.filter((c) => !(c.lat === city.lat && c.lon === city.lon))
        );
    }

    function updateBookmarkWeather(city: SearchResult, weatherData: any) {
        setBookmarks((prev) =>
            prev.map((b) =>
                b.lat === city.lat && b.lon === city.lon
                    ? {
                          ...b,
                          weather: {
                              temp: weatherData.main.temp,
                              feelsLike: weatherData.main.feels_like,
                              icon: weatherData.weather[0].icon,
                              description: weatherData.weather[0].description,
                          },
                          lastUpdated: Date.now(),
                      }
                    : b
            )
        );
    }

    useEffect(() => {
        if (bookmarks.length === 0) return;

        async function updateAllBookmarks() {
            const updated = await Promise.all(
                bookmarks.map(async (b) => {
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${b.lat}&lon=${b.lon}&units=metric&lang=${i18n.language}&appid=${apiKey}`;

                    try {
                        const response = await fetch(url);
                        const data = await response.json();

                        return {
                            ...b,
                            weather: {
                                temp: data.main.temp,
                                feelsLike: data.main.feels_like,
                                icon: data.weather[0].icon,
                                description: data.weather[0].description,
                            },
                            lastUpdated: Date.now(),
                        };
                    } catch (err) {
                        console.error(`Language update ERROR: ${err}`);
                        return b;
                    }
                })
            );
            setBookmarks(updated);
        }
        updateAllBookmarks();
    }, [i18n.language]);

    return {
        bookmarks,
        isBookmarked,
        addBookmark,
        removeBookmark,
        updateBookmarkWeather,
    };
}
