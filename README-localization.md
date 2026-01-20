# Contributing for Localization

## Simple
If you wish to contribute but do not know how to code or use GitHub, you can download the [`en-US.json`](./src/locale/en-US.json) file, translate it into your desired language, and send it to me via Discord (@lezzthanthree).

## Advanced
To contribute to the localization of the project, please follow these steps:
1. Fork the repository and clone it to your local machine.
2. Translate the [`en-US.json`](./src/locale/en-US.json) file into your desired language. This is located at [`src/locale`](./src/locale) folder. Save this file with the appropriate locale code (eg: `ja-JP.json`).
3. At [`src/utils/i18ninit.tsx`](./src/utils/i18ninit.tsx), import the locale file. For example, if you are adding Japanese, you would add the following line:
   ```ts
   import ja from '../locale/ja-JP.json';
   ```
4. On the same file, add the locale to the `resources` object.
   ```ts
    resources: {
         en: { translation: en },
         ja: { translation: ja },
    },
    ```
5. Also on the same file, add the language name to the `languageNames` array:
    ```ts
    export const languageNames = {
        en: "English",
        ja: "日本語",
        es: "Español",
        ...
    };
    ```
6. Open a pull request with your changes. 

#### Optional
For creativity, you can translate the flavor texts or add your own at [`src/components/FlavorText.tsx`](./src/components/FlavorText.tsx). **Make sure not to add any offensive or inappropriate texts**.

## List of languages translated
| Language               | Locale Code | Translator/s                          | Completeness  |
|------------------------|-------------|---------------------------------------|---------------|
| Spanish                | es-ES       | GatoMago                              | 94.35%        |
| Filipino               | fil-PH      | lezzthanthree                         | 100.00%       | 
| French                 | fr-FR       | 39Choko                               | 99.70%        | 
| Malay                  | ms-MY       | fab144                                | 86.01%        | 
| Polish                 | pl-PL       | counter185, KrajeQQ                   | 92.26%        |
| Thai                   | th-TH       | aungpaos                              | 99.70%        |
| S. Chinese             | zh-CN       | MiddleRed, SteveLF, emptylight370     | 99.70%        |
| T. Chinese (Hong Kong) | zh-HK       | lmaodick1239                          | 95.24%        |
| T. Chinese (Taiwan)    | zh-TW       | lmaodick1239                          | 95.24%        |

You can run the [`_check_missing.py`](./src/locale/_check_missing.py) Python script to check for missing keys in your translation. 

## About fonts
Currently, the project uses FOT-RodinNTLG Pro for English and Japanese locale and Noto Sans via Google Fonts for other languages.

If the font is not supported in the language, I'll be adding an additional font that would fit the language and aesthetic of the project.