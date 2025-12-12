# react-weather - React SPA

Prosta aplikacja webowa pozwalająca sprawdzić pogodę w danym mieście, zobaczyć wykres temperatury oraz zapisać miasta.

## Funkcjionalność

-   Wyszukiwanie miast z sugestiami
-   Aktualne dane pogodowe (Openweather API)
-   Wykres z temperaturą
-   Zapisywanie miast
-   Kilka języków (Polski + Angielski)
-   Persystencja danych (Local storage)
-   Komunikacja z API

## Live Demo (Vercel)

[Link do live demo](https://react-weather-blue-mu.vercel.app/)

## Screenshoty

![Screenshot 1](/docs/sc/sc1.png)
![Screenshot 2](/docs/sc/sc2.png)
![Screenshot 3](/docs/sc/sc3.png)

## Instalacja

`Node.js` i `npm` wymagane

### 1. Git clone

```sh
git clone https://github.com/GinoMoses/react-weather
cd react-weather
```

### 2. Dependencies

```sh
npm i
```

### 3. Klucz API

Stwórz plik `.env`

```env
VITE_API_KEY=OPENWEATHER_API_KEY
```

### 4. Włącz lokalne demo

```sh
npm run dev
```

Aplikacja włącza się:
[http://localhost:5173/](http://localhost:5173/)

## Struktura plików

```
src/
 |-components/
 | |-ui/ (shadcn)
 | | └-...
 | |-MainCard.tsx
 | |-BookmarkToggle.tsx
 | |-Searchbar.tsx
 | └-...
 |-hooks/
 | |-useBookmarks.ts
 | └-use-mobile.ts (shadcn)
 |-i18n/
 | |-locales/
 | | |-en.json
 | | └-pl.json
 | └index.ts
 |-pages/
 | |-Home.tsx
 | |-Bookmarks.tsx
 | └-About.tsx
 └-utility/
   └openWeatherIconsToLucide.ts
```

## Zastosowane technologie

-   **React** - Komponenty, router
-   **Typescript** - Typowanie
-   **i18next** + **react-i18next** - Kilka języków
-   **Tailwind CSS** - Framework CSS, prosty w użyciu
-   **shadcn/ui** - Komponenty UI z możliwością stylizacji
-   **Recharts** - Wykresy
-   **Lucide-react** - Ikony, proste w użyciu
-   **Openweather API** - Dane pogodowe

## Kluczowe komponenty

### MainCard.tsx

-   Głowny komponent z informacjami o pogodzie
-   Użyty dla strony głownej oraz strony zapisanych

### SearchBar.tsx

-   Dostępny na każdej stronie
-   Do znalezienia miasta

### TemperatureChart.tsx

-   Wykres przedstawiający temperaturę na głownej stronie w 3-godzinnych interwałach
-   Potencjał zastosowania w zapisanych

## Known Issues

-   Dużo API calls (łatwo przekroczyć limit 1000/dzień)
-   Prawdopodobnie coś nie jest przetłumaczone

## Future Improvements

-   Implementacja Openweather One Call API 3.0 zamiast trzech różnych (Nie wiedziałem, że jest darmowe)
-   Wprowadzenie custom hooka do obsługi API
-   Rozszerzenie informacji dostępnych na stronie zapisanych (np. Mały wykres, ikony dla stylu)
-   Mapa przedstawiająca temperature lub inne informacje, potencjalnie pozwalająca na wybór miasta
-   Poprawna wyglądu light mode
-   Poprawa wyglądu dla ekranów innych niz 1920x1080 (PC)
