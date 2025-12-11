import MainCard from "@/components/MainCard"
import { type useBookmarksReturn } from "@/hooks/useBookmarks"
import { useOutletContext } from "react-router-dom"

export default function Favorites() {
    const { bookmarks } = useOutletContext<useBookmarksReturn>()

    return(
        <div className="flex flex-wrap w-full">
            {!!bookmarks && bookmarks.map(city => (
                <div className="m-2 w-full : md:w-32/100">  
                    <MainCard key={`${city.lat} ${city.lon}`} bookmark={city} />
                </div>
            ))}
        </div>
    )
}