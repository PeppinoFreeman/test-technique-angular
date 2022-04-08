import { Pipe, PipeTransform } from "@angular/core";
import { TranslationLang } from "src/app/enums/translation-languages";
import { translatedContent } from "src/assets/data/translated-content";

@Pipe({
  name: "translate",
})
export class TranslatePipe implements PipeTransform {
  transform(
    data: string,
    language: TranslationLang = TranslationLang.FR
  ): string {
    // No data input
    if (!data) {
      return "";
    }
    // Check if language is valid
    if (!Object.values(TranslationLang).includes(language)) {
      return translatedContent[TranslationLang.FR][data];
    }

    return translatedContent[language][data];
  }
}
