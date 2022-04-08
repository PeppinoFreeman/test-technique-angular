import { TranslationLang } from "src/app/enums/translation-languages";

const contentFr = {
  MALE: "homme",
  FEMALE: "femme",
};
const contentEn = {
  MALE: "male",
  FEMALE: "female",
};

export const translatedContent = {
  [TranslationLang.FR]: contentFr,
  [TranslationLang.EN]: contentEn,
};
