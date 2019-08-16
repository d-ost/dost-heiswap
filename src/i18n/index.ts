import i18n, {InitOptions} from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en } from "./locales";

const options: InitOptions = {
  interpolation: {
    escapeValue: false,
  },
  // FIXME: Read this boolean from env variables.
  debug: true,
  resources: {
    en: {
      common: en
    }
  },
  ns: ["common"],
  defaultNS: "common",
  fallbackLng: "en",
};

i18n.use(LanguageDetector).init(options);
i18n.changeLanguage(navigator.language, (err, t) => {
  if (err) return console.log("Something went wrong during loading of i18n");
});

export default i18n;

