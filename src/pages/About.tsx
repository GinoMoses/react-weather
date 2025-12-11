import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Info, Wrench } from "lucide-react";
export default function About() {
    return (
        <div className="flex justify-center items-center p-4">
            <Card className="max-w-2xl w-full p-4">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center gap-2">
                        <Info size={30}/> <p>About this app</p>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <p>
                            This weather app was build as a school project using technologies like 
                            <strong> React</strong>, <strong>TypeScript</strong> and <strong>Tailwind</strong>.
                            It provides real-time weather information, forecasts, and allows to bookmark locations.
                            The slick UI was built using components provided by <strong>shadcn/ui</strong>.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mt-4 mb-2 flex items-center gap-2">
                            <Cloud size={25} /> <p>Weather</p>
                        </h2>
                        <p>
                            Weather data is sourced from the <strong>Openweather API</strong> 
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mt-4 mb-2 flex items-center gap-2">
                            <Wrench /> Technologies used
                        </h2>
                        <ul className="list-disc list-inside text-md font-bold">
                            <a href="https://react.dev/"><li>React</li></a>
                            <a href="https://www.typescriptlang.org/"><li>Typesript</li></a>
                            <a href="https://vite.dev/"><li>Vite</li></a>
                            <a href="https://tailwindcss.com/"><li>Tailwind CSS</li></a>
                            <a href="https://ui.shadcn.com/"><li>shadcn/ui</li></a>
                            <a href="https://lucide.dev/"><li>Lucide Icons</li></a>
                        </ul>
                    </div>
                    <div className="pt-4 border-t mt-6">
                        <p className="text-center text-muted-foreground">
                            Made by Damian Gorol
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
