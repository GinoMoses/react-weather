import { useEffect, useState } from "react";
import {
  Card,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import '../index.css'
import MainCard from "@/components/MainCard";
import { OpenWeatherIconsToLucide } from "@/utility/openWeatherIconsToLucide";

const units = "metric"
const key = `7e780ac4265fd768b39167e356d06bfa`
const city = "katowice"
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${key}`
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${key}`

export default function Home() {
    const [data, setData] = useState<any>(null)
    const [forecastData, setForecastData] = useState<any>(null)

    function fetchData() {
        fetch(url)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(err => console.error(`ERROR: ${err}`))
            
        fetch(urlForecast)
            .then(response => response.json())
            .then(json => setForecastData(json))
            .catch(err => console.error(`ERROR: ${err}`))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const chartData = forecastData ? forecastData.list.slice(0, 8).map((entry: any) => ({
        time: (entry.dt_txt).slice(8, 16),
        value: entry.main.temp,
        icon: OpenWeatherIconsToLucide[entry.weather[0].icon],
    })) : []

    if(!data) return null
    
    return (
        <div className="flex gap-4 p-2">
            <div className="flex flex-col gap-4">
                <MainCard data={data} />
                <MainCard data={data} />
            </div>
                <Card className="w-6/8">
                    <ChartContainer
                        config={{
                            value: {
                                label: "Temp",
                            },
                        }}
                        className="h-full"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="1 1" opacity={1} stroke="var(--chart-grid)" />
                            <XAxis dataKey="time" />
                            <YAxis tickFormatter={value => `${value}°C`} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="var(--chart-3)"
                                strokeWidth={1}
                                dot={false}
                            />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </Card>
        </div>
    )
}