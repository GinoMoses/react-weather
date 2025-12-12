import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface SearchResult {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

interface SearchBarProps {
    apiKey: string;
    onSelectLocation: (loc: SearchResult) => void;
}

export default function SearchBar({
    apiKey,
    onSelectLocation,
}: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
                );
                const data: SearchResult[] = await res.json();
                setSuggestions(data);
            } catch (err) {
                console.error("Geocoding API ERROR: ", err);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    function handleSelect(item: SearchResult) {
        const localData = {
            name: item.name,
            country: item.country,
            state: item.state,
            lat: item.lat,
            lon: item.lon,
        };

        setQuery(`${item.name}, ${item.country}`);
        setSuggestions([]);

        if (location.pathname === "/") {
            onSelectLocation(localData);
        } else {
            navigate("/", { state: { location: localData } });
        }
    }

    return (
        <div className="w-1/2 relative flex justify-center">
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                placeholder={t("search_placeholder")}
                className="max-w-sm w-full"
            />
            {isFocused && suggestions.length > 0 && (
                <Card className="absolute left-0 right-0 top-full mt-2 z-50 max-h-60 overflow-y-auto p-2">
                    {suggestions.map((item) => (
                        <button
                            key={`${item.lat}-${item.lon}`}
                            onClick={() => handleSelect(item)}
                            className="w-full text-left p-2 rounded-md hover:bg-accent"
                        >
                            <div className="font-medium">
                                {item.name},{" "}
                                {item.state ? `${item.state}, ` : ""}
                                {item.country}
                            </div>
                        </button>
                    ))}
                </Card>
            )}
        </div>
    );
}
