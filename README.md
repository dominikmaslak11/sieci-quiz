# Sieci komputerowe – Quiz na kolokwium

Aplikacja do nauki na kolokwium z przedmiotu **Sieci komputerowe** (materiały: wykład 1, ćwiczenia 1–2, laboratorium 1, wyjściówka 1.1).

- 245 pytań w 9 tematach, z wyjaśnieniami i źródłem
- grafiki z materiałów (topologie, okablowanie, T568A/B, klasy IP, VLSM)
- egzamin próbny (20 pytań, ocena orientacyjna), nauka według tematu, powtórka błędów
- generator zadań z adresacji IP, kalkulator podsieci, fiszki (w tym wyjściówka), ściąga

## Pobieranie

Gotowe pliki są w zakładce **Releases**:

| Plik | Platforma |
|------|-----------|
| `SieciQuiz.apk` | Android 7.0+ (zezwól na instalację z nieznanych źródeł) |
| `SieciQuiz-desktop.jar` | Windows / Linux / macOS, wymaga Javy 11+ (`java -jar SieciQuiz-desktop.jar`) |

Wersja desktopowa uruchamia lokalny serwer (`http://localhost:8765`) i otwiera quiz w przeglądarce.

## Struktura

- `zrodlo/` – projekt Androida (Kotlin, WebView) wraz z quizem w `assets/www` (`questions.js` – baza pytań)
- `zrodlo-desktop/` – launcher w Javie (Swing + wbudowany serwer HTTP)
- `build.sh` – skrypt budujący APK bez Gradle (ścieżki są ustawione pod środowisko autora – trzeba je dostosować)

## Uwagi

Niektóre wartości w materiałach źródłowych zawierały literówki (np. adres broadcast w C-02) – w pytaniach użyto wartości poprawnych. Odpowiedź na pytanie o minimalną długość patchcordu (C3) pochodzi z wyjściówki, a nie wprost ze skryptu – warto ją zweryfikować.
