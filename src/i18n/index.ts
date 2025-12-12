import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import pl from "./locales/pl.json";

export default i18n.use(initReactI18next).init({
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",

    resources: {
        en: { translation: en },
        pl: { translation: pl },
    },
});
