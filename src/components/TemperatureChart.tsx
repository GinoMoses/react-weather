import {
    Card
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
} from "recharts"

export default function TemperatureChart({chartData}: {chartData: any[]}) {
    return (
        <Card className="w-full h-full">
            <ChartContainer
                config={{
                    value: {
                        label: "Temp",
                    },
                }}
                className="text-md p-0 md:p-4 w-full h-full"
            >
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
            </ChartContainer>
        </Card>
    )    
}