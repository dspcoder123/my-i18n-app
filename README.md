# Multilingual Next.js App with i18next

This Next.js application includes multilingual support using React i18next with dynamic language switching.

## Features

- 🌍 Multi-language support (English, Spanish, French)
- 🔄 Dynamic language switching with dropdown
- 📱 Responsive language switcher component
- 🎯 Client-side translation management
- 🚀 Next.js App Router compatible

## Languages Supported

- **English (en)** - Default language
- **Spanish (es)** - Español
- **French (fr)** - Français

## Project Structure

```
my-i18n-app/
├── app/
│   ├── layout.tsx          # Root layout with i18n provider
│   ├── page.tsx            # Home page with translations
│   └── ...
├── components/
│   ├── I18nProvider.tsx    # i18n context provider
│   └── LanguageSwitcher.tsx # Language dropdown component
├── lib/
│   └── i18n.ts            # i18n configuration
├── public/
│   └── locales/
│       ├── en/
│       │   └── common.json # English translations
│       ├── es/
│       │   └── common.json # Spanish translations
│       └── fr/
│           └── common.json # French translations
├── next-i18next.config.js # i18n configuration
└── next.config.ts          # Next.js config with i18n
```

## How to Use

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Switch languages:**
   - Use the language dropdown in the header
   - Select from English, Spanish, or French
   - The page content will update immediately

3. **Add new translations:**
   - Edit the JSON files in `public/locales/{lang}/common.json`
   - Add new keys to all language files
   - Use the `t()` function in components: `t('yourKey')`

## Adding New Languages

1. Create a new directory in `public/locales/{new-lang}/`
2. Add `common.json` with translations
3. Update `next-i18next.config.js` to include the new locale
4. Add the language option to `LanguageSwitcher.tsx`

## Translation Keys

The following translation keys are available:

- `title` - Page title
- `description` - Page description
- `getStarted` - "Get started by editing"
- `saveAndSee` - "Save and see your changes instantly"
- `deployNow` - "Deploy now"
- `readDocs` - "Read our docs"
- `learn` - "Learn"
- `examples` - "Examples"
- `goToNextjs` - "Go to nextjs.org →"
- `language` - "Language"
- `selectLanguage` - "Select Language"

## Dependencies

- `next-i18next` - Next.js i18n integration
- `react-i18next` - React i18n library
- `i18next` - Core i18n framework

## Development

The app automatically reloads translations in development mode. Changes to translation files will be reflected immediately without restarting the server.