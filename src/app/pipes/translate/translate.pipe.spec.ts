import { TranslationLang } from 'src/app/enums/translation-languages';
import { TranslatePipe } from "./translate.pipe";

describe("TranslatePipe", () => {
  it("create an instance", () => {
    const pipe = new TranslatePipe();
    expect(pipe).toBeTruthy();
  });
});

describe("With undefined/empty data ", () => {
  it("should return empty string", () => {
    const pipe = new TranslatePipe();
    const str = "";
    const str2: string = undefined;

    expect(pipe.transform(str)).toEqual("");
    expect(pipe.transform(str2)).toEqual("");
  });
});

describe("With defined data and undefined/invalid language argument", () => {
  it("should return default translated", () => {
    const pipe = new TranslatePipe();
    const str = "MALE";

    const incorrectLang = "incorrect";

    expect(pipe.transform(str)).toEqual("homme");
    expect(pipe.transform(str, incorrectLang as TranslationLang)).toEqual("homme");
  });
});

describe("With defined data and defined language argument", () => {
  it("should return correct translated", () => {
    const pipe = new TranslatePipe();
    const str = "MALE";
    const lang = TranslationLang.EN; 

    expect(pipe.transform(str, lang)).toEqual("male");
  });
});
