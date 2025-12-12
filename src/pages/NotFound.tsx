import { Link } from "react-router-dom";
import {
    FileQuestionMark,
    CloudRainWind,
    Snowflake,
    Sun,
    Moon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex justify-center align-middle space-x-4 mb-8">
                <Sun size={48} className="text-gray-400" />
                <CloudRainWind size={48} className="text-gray-400" />
                <FileQuestionMark size={64} className="text-gray-400" />
                <Snowflake size={48} className="text-gray-400" />
                <Moon size={48} className="text-gray-400" />
            </div>
            <h1 className="text-2xl">404 - {t("not_found")}</h1>
            <p className="text-gray-500">{t("not_exist")}</p>
            <Link to="/">{t("back_home")}</Link>
        </div>
    );
}
