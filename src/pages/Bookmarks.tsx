import MainCard from "@/components/MainCard";
import { type useBookmarksReturn } from "@/hooks/useBookmarks";
import { useOutletContext } from "react-router-dom";
import { BookDashed } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Favorites() {
    const { bookmarks } = useOutletContext<useBookmarksReturn>();
    const { t } = useTranslation();

    return bookmarks.length !== 0 ? (
        <div className="flex flex-wrap w-full">
            {bookmarks.map((city) => (
                <div className="m-2 w-full md:w-32/100">
                    <MainCard key={`${city.lat} ${city.lon}`} bookmark={city} />
                </div>
            ))}
        </div>
    ) : (
        <div className="flex flex-col justify-center items-center gap-2 p-10">
            <BookDashed size={35} className="text-muted-foreground" />
            <p className="text-muted-foreground">{t("empty_bookmarks")}</p>
        </div>
    );
}
