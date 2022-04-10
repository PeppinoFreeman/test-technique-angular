import { TranslationLang } from "src/app/enums/translation-languages";

const contentFr = {
  MALE: "homme",
  FEMALE: "femme",
  GENDER: "genre",
  EMAIL: "email",
  FIRSTNAME: "prénom",
  LASTNAME: "nom",
};
const contentEn = {
  MALE: "male",
  FEMALE: "female",
  GENDER: "gender",
  EMAIL: "email",
  FIRSTNAME: "firstName",
  LASTNAME: "lastName",
};

export const translatedContent = {
  [TranslationLang.FR]: contentFr,
  [TranslationLang.EN]: contentEn,
};
