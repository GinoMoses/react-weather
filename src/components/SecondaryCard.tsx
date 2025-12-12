import { Card } from "./ui/card";
import { Sunrise, Sunset, Sun, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ({ data }: { data: any }) {
    const { t } = useTranslation();

    return (
        <Card className="h-full">
            <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                    <Sunrise className="w-8 h-8" />
                    <div>
                        <p className="font-bold">{t("sunrise")}</p>
                        <p>
                            {new Date(
                                data.sys.sunrise * 1000
                            ).toLocaleTimeString()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Sunset className="w-8 h-8" />
                    <div>
                        <p className="font-bold">{t("sunset")}</p>
                        <p>
                            {new Date(
                                data.sys.sunset * 1000
                            ).toLocaleTimeString()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Sun className="w-8 h-8" />
                    <div>
                        <p className="font-bold">{t("hours_of_daylight")}</p>
                        <p>
                            {Math.floor(
                                (data.sys.sunset - data.sys.sunrise) / 3600
                            )}{" "}
                            h{" "}
                            {Math.floor(
                                ((data.sys.sunset - data.sys.sunrise) % 3600) /
                                    60
                            )}{" "}
                            min
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Clock className="w-8 h-8" />
                    <div>
                        <p className="font-bold">{t("timezone")}</p>
                        <p>
                            UTC{" "}
                            {data.timezone >= 0
                                ? `+${data.timezone / 3600}`
                                : `${data.timezone / 3600}`}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
