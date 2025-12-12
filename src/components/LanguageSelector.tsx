import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
    const { i18n } = useTranslation();

    const languages = [
        { code: "en", label: "English" },
        { code: "pl", label: "Polski" },
    ];

    function changeLang(lang: string) {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    }

    const currentLabel =
        languages.find((l) => l.code === i18n.language)?.label || "English";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex items-center justify-bewteen px-3 py-2 rounded-md hover:bg-accent">
                <div className="flex items-center gap-2">
                    <Globe size={18} />
                    <span>{currentLabel}</span>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" side="right">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => changeLang(lang.code)}
                    >
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
