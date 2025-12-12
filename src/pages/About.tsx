import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Info, Wrench } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";

export default function About() {
    const { t } = useTranslation();

    return (
        <div className="flex justify-center items-center p-4">
            <Card className="max-w-2xl w-full p-4">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center gap-2">
                        <Info size={30} /> {t("about.title")}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <p>
                            <Trans i18nKey="about.section1" />
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mt-4 mb-2 flex items-center gap-2">
                            <Cloud size={25} /> <p>{t("about.weather")}</p>
                        </h2>
                        <p>
                            <Trans i18nKey="about.weather.content" />
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mt-4 mb-2 flex items-center gap-2">
                            <Wrench /> <p>{t("about.technologies")}</p>
                        </h2>
                        <ul className="list-disc list-inside text-md font-bold">
                            <a href="https://react.dev/">
                                <li>React</li>
                            </a>
                            <a href="https://www.typescriptlang.org/">
                                <li>Typesript</li>
                            </a>
                            <a href="https://vite.dev/">
                                <li>Vite</li>
                            </a>
                            <a href="https://tailwindcss.com/">
                                <li>Tailwind CSS</li>
                            </a>
                            <a href="https://ui.shadcn.com/">
                                <li>shadcn/ui</li>
                            </a>
                            <a href="https://lucide.dev/">
                                <li>Lucide Icons</li>
                            </a>
                        </ul>
                    </div>
                    <div className="pt-4 border-t mt-6">
                        <p className="text-center text-muted-foreground">
                            {t("about.author")}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
