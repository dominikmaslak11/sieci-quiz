// Baza pytań – Sieci komputerowe (W-01, C-01, C-02, L-01, wyjściówka 1.1)
// q(temat, pytanie, poprawna(e), błędne[], wyjaśnienie, {img, src})
var TOPICS = {
  hist:  { name: "Wykład 1: dyscypliny, interfejsy, historia", icon: "🕰️" },
  klas:  { name: "Klasyfikacje i topologie sieci", icon: "🕸️" },
  okab:  { name: "Okablowanie strukturalne", icon: "🏢" },
  punkt: { name: "Punkty dystrybucyjne i abonenckie", icon: "🗄️" },
  normy: { name: "Normy, klasy i parametry kabli", icon: "📏" },
  utp:   { name: "Skrętka UTP, T568A/B, diagnostyka (lab)", icon: "🔌" },
  ip4:   { name: "Adresacja IPv4: klasy i zasady", icon: "🔢" },
  podsieci: { name: "Podsieci, nadsieci, CIDR, VLSM", icon: "✂️" },
  ip6:   { name: "Adresacja IPv6", icon: "🌐" }
};
var Q = [];
function q(t, text, c, w, e, x) {
  var o = { t: t, q: text, c: [].concat(c), w: w, e: e || "" };
  if (x) for (var k in x) o[k] = x[k];
  Q.push(o);
}

/* ================= WYKŁAD 1: DYSCYPLINY, INTERFEJSY, HISTORIA ================= */
q("hist", "Która dyscyplina informatyki analizuje stany emocjonalne użytkowników (mimika, postawa ciała, tembr głosu) oraz symuluje emocje wirtualnych postaci w grach?",
  "Informatyka afektywna", ["Informatyka medyczna", "Informatyka śledcza", "Grafika komputerowa"],
  "Informatyka afektywna wykrywa negatywne stany emocjonalne, ocenia zagrożenie i symuluje emocje postaci wirtualnych.", { src: "W-01" });
q("hist", "Przetwarzanie sygnałów EKG i EEG oraz obrazów z tomografii to domena:",
  "informatyki medycznej", ["informatyki afektywnej", "automatyki przemysłowej", "webmasteringu"],
  "Informatyka medyczna wspomaga m.in. sygnały medyczne (EKG, EEG), obrazy (tomografia), recepty, rozliczenia z NFZ.", { src: "W-01" });
q("hist", "Wizualizacja 3D w systemach CAD, efekty specjalne w filmach i gry komputerowe to obszar:",
  "grafiki komputerowej", ["informatyki bankowej", "informatyki w statystyce", "inteligencji budynkowej"], "", { src: "W-01" });
q("hist", "Obieg elektroniczny danych do GUS (zamiast papierowego) i brak wielokrotnego wprowadzania tych samych danych to cecha:",
  "informatyki w statystyce", ["informatyki śledczej", "webmasteringu", "informatyki bankowej"], "", { src: "W-01" });
q("hist", "Obieg pieniądza między bankami i klientami, kursy walut, operacje bankomatowe i bezgotówkowe – to zakres:",
  "informatyki bankowej", ["informatyki medycznej", "automatyki przemysłowej", "grafiki komputerowej"], "", { src: "W-01" });
q("hist", "Dyscyplina początkowo sterująca pojedynczymi maszynami, dziś zarządzająca całymi liniami technologicznymi i fabrykami to:",
  "automatyka przemysłowa", ["informatyka afektywna", "webmastering", "informatyka śledcza"], "", { src: "W-01" });
q("hist", "Rozpoznawanie rysów twarzy, linii papilarnych, śledzenie lokalizacji urządzeń mobilnych i wykrywanie przestępstw elektronicznych to:",
  "informatyka śledcza", ["informatyka bankowa", "inteligencja budynkowa", "informatyka w statystyce"], "", { src: "W-01" });
q("hist", "Projektowanie i publikacja serwisów i sklepów internetowych, pozycjonowanie, mailing usługowy to:",
  "webmastering", ["grafika komputerowa", "internet rzeczy", "informatyka medyczna"], "", { src: "W-01" });
q("hist", "Sterowanie oświetleniem, ogrzewaniem, klimatyzacją, nawadnianiem i ochroną budynku to:",
  "inteligencja budynkowa", ["webmastering", "informatyka śledcza", "informatyka afektywna"], "", { src: "W-01" });
q("hist", "Na czym polega koncepcja Internetu rzeczy (IoT)?",
  "Jednoznacznie identyfikowalne przedmioty mogą gromadzić, przetwarzać i wymieniać dane przez sieć",
  ["Wszystkie komputery świata łączą się w jedną sieć kablową", "Zastąpienie komputerów urządzeniami mobilnymi", "Sieć działająca tylko w obrębie jednego budynku"],
  "Do IoT należą m.in. urządzenia AGD, oświetlenie, zegarki, samochody oraz beacony.", { src: "W-01" });
q("hist", "Czym jest beacon?",
  "Urządzeniem emitującym stały, unikalny sygnał (BLE), które przypisuje cyfrowe informacje fizycznym przedmiotom",
  ["Rodzajem routera światłowodowego", "Protokołem szyfrowania Wi-Fi", "Nośnikiem danych w komputerach Odra"],
  "Beacon korzysta z energooszczędnego Bluetooth Low Energy.", { src: "W-01" });
q("hist", "Dzięki czemu beacon może działać nawet rok na małej baterii?",
  "Bluetooth Low Energy (BLE)", ["Zasilaniu przez kabel Ethernet (PoE)", "Technologii IrDA", "Wbudowanemu ogniwu słonecznemu zawsze"],
  "Nowe beacony potrafią też czerpać energię z fal elektromagnetycznych.", { src: "W-01" });
q("hist", "Ile kolumn miała karta dziurkowana w formacie IBM?",
  "80", ["40", "64", "128"], "Każda kolumna = jeden znak, więc na karcie można było zakodować 80 znaków.", { src: "W-01" });
q("hist", "Ile pozycji (miejsc na dziurki) było w jednej kolumnie karty dziurkowanej?",
  "12", ["8", "6", "10"], "Każda pozycja to pojedynczy bit informacji (przedziurkowana lub nie).", { src: "W-01" });
q("hist", "Co kodowała jedna kolumna na karcie dziurkowanej?",
  "Jeden znak", ["Jeden bajt programu", "Cały wiersz tekstu", "Jedną instrukcję procesora"], "", { src: "W-01" });
q("hist", "Po co karty dziurkowane miały obcięty narożnik (w Polsce standardowo górny lewy)?",
  "Aby łatwo dostrzec karty włożone nieprawidłowo („do góry nogami”, „na lewą stronę”)",
  ["Aby zaznaczyć pierwszą kartę programu", "Aby oznaczyć kartę uszkodzoną", "Aby zmieścić kartę w czytniku wąskim"], "", { src: "W-01" });
q("hist", "Karty dziurkowano maszyną zwaną dziurkarką. Kolejnym etapem była:",
  "weryfikacja sprawdzarką, a potem wczytanie w czytniku kart", ["od razu kompilacja programu", "kopiowanie na taśmę magnetyczną", "wydruk na ploterze"],
  "Czytnik kart był peryferyjnym urządzeniem wejścia komputera; całość wymagała obsługi operatora.", { src: "W-01" });
q("hist", "Co przedstawia zdjęcie?", "Kartę dziurkowaną", ["Taśmę magnetyczną", "Dysk twardy", "Kartę sieciową"],
  "Karta dziurkowana używana w Centrum Informatycznym Politechniki Wrocławskiej.", { img: "karta", src: "W-01" });
q("hist", "Taśma 8-ścieżkowa z komputerów Odra-1300 kodowała:",
  "7-bitowy kod ASCII, a ósma ścieżka była bitem parzystości", ["8-bitowy kod binarny bez kontroli błędów", "kod Morse’a", "kod Unicode"], "", { src: "W-01" });
q("hist", "Do czego służył pasek mniejszych dziurek na taśmie dziurkowanej?",
  "Jako perforacja dla zębatego kółka czytnika/perforatora i wskaźnik poprzecznego rzędu bitów dla czytnika fotoelektrycznego",
  ["Do zapisu bitu parzystości", "Do kodowania znaków specjalnych", "Do oznaczania końca taśmy"], "", { src: "W-01" });
q("hist", "Taśmy dziurkowane (perforowane) są znane od:", "połowy XIX wieku", ["lat 40. XX wieku", "lat 70. XX wieku", "początku XXI wieku"],
  "Z czasem zastąpiły je pojemniejsze media, np. taśmy magnetyczne.", { img: "tasma-dziurkowana", src: "W-01" });
q("hist", "Pamięć taśmowa (taśma magnetyczna) to w praktyce pamięć o dostępie:",
  "sekwencyjnym, służąca do archiwizowania dużych ilości danych", ["swobodnym, o bardzo krótkim czasie dostępu", "wyłącznie do odczytu", "skojarzeniowym"],
  "Długi czas odnajdywania bloku powoduje, że jest wydajna tylko przy czytaniu/zapisie po kolei.", { img: "tasma-mag", src: "W-01" });
q("hist", "Do czego na taśmie magnetycznej służy znacznik pliku (file mark)?",
  "Do organizowania bloków w struktury – rozdziela grupy bloków tworzące pliki logiczne", ["Do zabezpieczenia taśmy przed zapisem", "Do wskazania prędkości przewijania", "Do szyfrowania danych"], "", { src: "W-01" });
q("hist", "Co się dzieje po zapisaniu bloku na taśmie magnetycznej?",
  "Logicznie niszczone są wszystkie bloki zapisane dalej na taśmie", ["Blok trafia na początek taśmy", "Taśma jest automatycznie przewijana i weryfikowana", "Nic – bloki dalsze pozostają dostępne"], "", { src: "W-01" });
q("hist", "Które z urządzeń to urządzenia WEJŚCIA?",
  ["skaner", "mikrofon", "joystick"], ["ploter", "drukarka", "głośniki"],
  "Wejścia: klawiatura, mysz, skaner, joystick, mikrofon, odbiornik GPS, czytnik linii papilarnych, kamera internetowa.", { src: "W-01" });
q("hist", "Które z urządzeń to urządzenie WYJŚCIA?", "ploter", ["skaner", "mikrofon", "mysz"],
  "Wyjścia: monitor, drukarka, głośniki, słuchawki, ploter.", { src: "W-01" });
q("hist", "Które z urządzeń to urządzenie WEJŚCIA-WYJŚCIA?", "karta sieciowa", ["monitor", "klawiatura", "ploter"],
  "Wejścia-wyjścia: karta sieciowa, modem, ekran dotykowy, moduł Bluetooth, IrDA, urządzenie USB.", { src: "W-01" });
q("hist", "Pierwsze komputery zbudowano w:", "latach 40. XX wieku", ["latach 20. XX wieku", "latach 60. XX wieku", "latach 80. XX wieku"], "", { src: "W-01" });
q("hist", "W jakiej dekadzie powstały tranzystory i układy scalone (wg wykładu)?", "w latach 50.", ["w latach 30.", "w latach 70.", "w latach 90."], "", { src: "W-01" });
q("hist", "Standardem w latach 60. była zdalna praca na terminalu tekstowym. Wtedy Departament Obrony USA utworzył sieć:",
  "ARPANET", ["Ethernet", "NSFNET", "Token Ring"], "", { src: "W-01" });
q("hist", "Przełom w historii sieci przyniosła nowa klasa komputerów:", "PC (Personal Computer)", ["mainframe", "superkomputery", "terminale tekstowe"], "", { src: "W-01" });
q("hist", "Jak zestawiane jest połączenie w sieci telefonicznej (wg wykładu)?",
  "Centrale (węzły) wybierają optymalne łącze do najbliższej centrali na czas trwania połączenia",
  ["Rozmowa dzielona jest na pakiety wysyłane różnymi trasami", "Każdy telefon łączy się bezpośrednio z każdym", "Rozmowa przechodzi zawsze przez jeden centralny serwer"], "", { src: "W-01" });
q("hist", "Co znajduje się w węzłach sieci WAN o topologii siatki niepełnej (w odróżnieniu od sieci telefonicznej)?",
  "Routery – pakiety, na które podzielono wiadomość, docierają do adresata każdy drogą optymalną w danej chwili",
  ["Centrale telefoniczne", "Koncentratory (huby)", "Modemy analogowe"], "", { src: "W-01" });

/* ================= KLASYFIKACJE I TOPOLOGIE ================= */
q("klas", "Który skrót oznacza sieć kampusową?", "CAN", ["PAN", "MAN", "WAN"], "PAN – osobista, LAN – lokalna, CAN – kampusowa, MAN – miejska, WAN – rozległa.", { src: "W-01" });
q("klas", "Który skrót oznacza sieć miejską (metropolitalną)?", "MAN", ["CAN", "LAN", "PAN"], "", { src: "W-01" });
q("klas", "Który skrót oznacza sieć rozległą?", "WAN", ["LAN", "MAN", "CAN"], "", { src: "W-01" });
q("klas", "Ułóż sieci od najmniejszego do największego zasięgu – poprawna kolejność to:",
  "PAN – LAN – CAN – MAN – WAN", ["LAN – PAN – MAN – CAN – WAN", "PAN – LAN – MAN – CAN – WAN", "WAN – MAN – CAN – LAN – PAN"],
  "Klasyfikacja według rozległości: PAN, LAN, CAN, MAN, WAN.", { src: "W-01" });
q("klas", "Sieć klient–serwer a peer to peer (P2P). Które zdanie jest prawdziwe?",
  "W P2P komputery są równorzędne, w klient–serwer wydzielony serwer udostępnia zasoby klientom",
  ["W P2P zawsze istnieje centralny serwer plików", "W klient–serwer wszystkie komputery są równorzędne", "Obie nazwy oznaczają to samo"], "", { src: "W-01" });
q("klas", "Czym różni się sieć dedykowana od niededykowanej?",
  "W dedykowanej serwer pełni wyłącznie rolę serwera; w niededykowanej komputer może być jednocześnie serwerem i stacją roboczą",
  ["Dedykowana działa tylko bezprzewodowo", "Niededykowana nie ma żadnych serwerów ani klientów", "Dedykowana jest zawsze siecią WAN"],
  "(Uzupełnienie – na wykładzie podano same nazwy klasyfikacji.)", { src: "W-01" });
q("klas", "Topologia, w której wszystkie elementy poza skrajnymi są połączone z dwoma sąsiadami, a brak wspólnej szyny i zamknięcia, to:",
  "liniowa", ["pierścienia", "gwiazdy", "siatki"], "Topologia liniowa (ang. Line).", { img: "topo-liniowa", src: "W-01" });
q("klas", "Jaka to topologia?", "magistrali (szyny)", ["pierścienia", "gwiazdy", "hierarchiczna"],
  "Wszystkie elementy są podłączone do jednej magistrali (Bus).", { img: "topo-magistrala", src: "W-01" });
q("klas", "Jaka to topologia?", "pierścienia", ["magistrali", "gwiazdy", "liniowa"],
  "Elementy połączone odcinkami kabla tworzą zamknięty pierścień (Ring).", { img: "topo-pierscien", src: "W-01" });
q("klas", "Jaka to topologia?", "podwójnego pierścienia", ["pierścienia", "siatki", "gwiazdy rozszerzonej"],
  "Dwa zamknięte pierścienie – zwiększa to niezawodność.", { img: "topo-pierscien2", src: "W-01" });
q("klas", "Jaka to topologia?", "gwiazdy", ["magistrali", "pierścienia", "siatki"],
  "Komputery podłączone do jednego punktu centralnego – koncentratora lub przełącznika (Star).", { img: "topo-gwiazda", src: "W-01" });
q("klas", "Jaka to topologia?", "gwiazdy rozszerzonej", ["gwiazdy", "hierarchiczna", "siatki"],
  "Punkt centralny + punkty poboczne – jedna z najczęstszych fizycznych topologii Ethernetu.", { img: "topo-gwiazda-rozsz", src: "W-01" });
q("klas", "Jaka to topologia?", "hierarchiczna (drzewa)", ["gwiazdy rozszerzonej", "magistrali", "pierścienia"],
  "Kombinacja gwiazdy i magistrali, budowa podobna do drzewa binarnego.", { img: "topo-drzewo", src: "W-01" });
q("klas", "Jaka to topologia?", "siatki", ["gwiazdy", "pierścienia", "hierarchiczna"],
  "Oprócz koniecznych połączeń są połączenia nadmiarowe.", { img: "topo-siatka", src: "W-01" });
q("klas", "Ile połączeń (linii) zawiera sieć narysowana na obrazku?", "9", ["6", "12", "15"],
  "6 krawędzi sześciokąta + 3 przekątne łączące przeciwległe węzły = 9. To siatka niepełna (pełna dla 6 węzłów miałaby 15 połączeń).", { img: "topo-siatka", src: "W-01" });
q("klas", "Ile połączeń ma sieć o pełnej topologii siatki z n węzłami?", "n(n−1)/2", ["n", "n−1", "2n"],
  "Np. dla 6 węzłów: 6·5/2 = 15. (Uzupełnienie matematyczne.)", { src: "W-01" });
q("klas", "Która topologia jest często stosowana tam, gdzie wymagana jest wysoka bezawaryjność?",
  "siatki", ["liniowa", "magistrali", "gwiazdy"], "Połączenia nadmiarowe zapewniają alternatywne trasy.", { src: "W-01" });
q("klas", "Koncentrator (hub) tworzy topologię:", "fizyczną gwiazdy, a logiczną magistrali", ["fizyczną i logiczną magistrali", "fizyczną siatki", "fizyczną pierścienia i logiczną gwiazdy"],
  "Przełącznik (switch) w odróżnieniu od huba rozdziela ruch.", { src: "W-01" });
q("klas", "Która topologia jest kombinacją gwiazdy i magistrali?", "hierarchiczna (drzewa)", ["pierścienia", "liniowa", "gwiazdy rozszerzonej"], "", { src: "W-01" });
q("klas", "Topologia liniowa od magistrali różni się tym, że:",
  "w liniowej każdy węzeł łączy się tylko z dwoma sąsiadami, w magistrali wszystkie są na wspólnej szynie",
  ["w liniowej jest punkt centralny", "magistrala ma zamknięty obwód", "nie różnią się wcale"], "", { src: "W-01" });
q("klas", "W sieci WAN stosuje się często topologię:", "siatki niepełnej", ["pierścienia podwójnego", "magistrali", "gwiazdy z hubem"], "", { src: "W-01" });

/* ================= OKABLOWANIE STRUKTURALNE ================= */
q("okab", "Co to jest okablowanie strukturalne?",
  "Całość pasywnych elementów sieci (kable, gniazda, panele, szafy), które tylko transportują sygnał, bez ingerencji w niego",
  ["Zbiór wszystkich przełączników i routerów w sieci", "Tylko kable światłowodowe w budynku", "Oprogramowanie zarządzające siecią"],
  "To odpowiedź na pytanie C1 z wyjściówki. Elementy pasywne nie ingerują w sygnał (w przeciwieństwie do aktywnych).", { src: "C-01" });
q("okab", "Z jakich części składa się okablowanie strukturalne?",
  ["okablowanie poziome", "okablowanie pionowe", "okablowanie kampusowe", "punkty rozdzielcze", "punkty abonenckie"],
  ["przełączniki zarządzalne", "serwery plików", "routery brzegowe"],
  "Elementy aktywne (przełączniki, routery, serwery) NIE należą do okablowania strukturalnego.", { src: "C-01" });
q("okab", "Okablowanie poziome łączy:", "punkty abonenckie (gniazdka) z punktem dystrybucyjnym na piętrze",
  ["różne budynki kampusu", "kolejne kondygnacje budynku", "serwery z routerem brzegowym"], "", { img: "okab-proste", src: "C-01" });
q("okab", "Okablowanie pionowe łączy:", "poszczególne kondygnacje budynku", ["gniazdko z komputerem", "budynki między sobą", "przełącznik z serwerem"],
  "Stanowi szkielet sieci i zbiera cały ruch, dlatego powinno mieć większą przepustowość niż poziome.", { img: "okab-pionowe", src: "C-01" });
q("okab", "Okablowanie kampusowe (międzybudynkowe) stosuje się:", "w dużych sieciach w kilku budynkach (np. uczelnie)", ["tylko w domach jednorodzinnych", "wyłącznie wewnątrz szafy RACK", "tylko w sieciach bezprzewodowych"],
  "", { img: "okab-kampus", src: "C-01" });
q("okab", "Jaka jest maksymalna długość toru okablowania poziomego (skrętka, FastEthernet/GigabitEthernet)?",
  "100 m (90 m kabla stałego + patchcordy)", ["55 m", "185 m", "500 m"],
  "Na kabel w korytku/ścianie przypada 90 m, na patchcordy po 5 m z każdej strony.", { img: "okab-poziome", src: "C-01" });
q("okab", "Jak rozkłada się 100 m toru poziomego?", "90 m kabel stały + 2 × 5 m patchcordy", ["80 m + 2 × 10 m", "95 m + 5 m", "100 m kabla stałego, patchcordy nie wchodzą w skład"], "", { img: "okab-poziome", src: "C-01" });
q("okab", "Jaki maksymalny zasięg należy projektować dla sieci 10GigabitEthernet na skrętce?",
  "55 m", ["100 m", "185 m", "2000 m"],
  "Odpowiedź na C2 z wyjściówki. Dotyczy zarówno poziomego, jak i pionowego okablowania miedzianego w materiałach (pełne 100 m dopiero dla kat. 6A i wyżej).", { src: "C-01" });
q("okab", "Maksymalna długość okablowania pionowego dla skrętki i FastEthernet/GigabitEthernet to:", "90 m", ["55 m", "100 m", "2000 m"], "", { src: "C-01" });
q("okab", "Maksymalna długość okablowania pionowego dla światłowodu (wg materiałów) to:", "do 2000 m", ["55 m", "90 m", "500 m"], "", { src: "C-01" });
q("okab", "Niektórzy producenci zalecają, by odległość gniazdko–panel krosowniczy nie przekraczała:", "60 m", ["30 m", "90 m", "100 m"],
  "Stosowanie normy (90 m) nie jest jednak błędem.", { src: "C-01" });
q("okab", "Dlaczego okablowanie pionowe projektuje się z większą przepustowością niż poziome?",
  "Zbiera cały ruch sieciowy z pięter", ["Bo jest zawsze krótsze", "Bo używa tańszych kabli", "Bo łączy tylko dwa komputery"], "", { src: "C-01" });
q("okab", "Co to są patchcordy (kable połączeniowe/stacyjne)?",
  "Gotowe kable z zaciśniętymi końcówkami RJ45 łączące np. gniazdko z komputerem lub przełącznik z panelem",
  ["Kable łączące budynki", "Kable zasilające szafę RACK", "Przewody uziemiające"], "", { img: "patchcord", src: "C-01" });
q("okab", "Patchcordy ekranowane i nieekranowane oznacza się odpowiednio:", "F/UTP i U/UTP", ["U/UTP i F/UTP", "STP i FTP", "S/UTP i F/FTP"], "", { src: "C-01" });
q("okab", "Jaki jest minimalny prawidłowy rozmiar (długość) patchcordu i z czego to wynika?",
  "Ok. 0,5–1 m; zbyt krótki kabel nie wytłumia odbić i przesłuchów (return loss, NEXT) powstających na złączach RJ-45",
  ["Brak ograniczeń – im krócej tym lepiej", "10 m, bo tyle wynika z normy dla tłumienia", "Min. 3 m, bo wymaga tego szafa RACK"],
  "C3 z wyjściówki. Uwaga: dokładnej wartości nie podano w skrypcie C-01 – w odpowiedzi na wyjściówkę przyjęto 1 m. W kanale łącznie max ok. 10 m patchcordów (po ok. 5 m).", { src: "wyjściówka" });
q("okab", "Jeśli zdecydowano się na kat. 5e, to w danym segmencie również patchcordy, gniazdka i panele muszą być:",
  "w tym samym standardzie (kat. 5e)", ["dowolnej kategorii", "wyższej o jedną kategorię", "zawsze światłowodowe"],
  "Można mieszać standardy między segmentami (np. pion kat. 6, poziom 5e), ale w obrębie segmentu wszystko ma być spójne.", { src: "C-01" });
q("okab", "Którą sekwencję żył (A czy B) najczęściej się stosuje w okablowaniu strukturalnym i co trzeba zachować?",
  "Najczęściej B – i konsekwentnie stosować ją we wszystkich elementach", ["Zawsze A – B jest zakazana", "Mieszać A i B naprzemiennie", "Sekwencja nie ma znaczenia"], "", { src: "C-01" });
q("okab", "Do czego służy szafa dystrybucyjna (RACK)?", "Do montażu sprzętu sieciowego w punkcie rozdzielczym", ["Do chłodzenia kabli światłowodowych", "Do układania kabli kampusowych w ziemi", "Do ochrony przed zalaniem"],
  "", { img: "szafa", src: "C-01" });
q("okab", "Gdzie można zastosować okablowanie strukturalne?",
  ["sieć komputerowa", "telefonia", "CCTV", "BMS (inteligentny budynek)"], ["wyłącznie sieć komputerowa", "tylko radio FM"],
  "Także instalacje alarmowe i inteligentne sterowanie urządzeniami.", { src: "C-01" });
q("okab", "Z jakich mediów zwykle buduje się okablowanie strukturalne?",
  ["skrętka 4-parowa", "kabel koncentryczny 75 Ω", "światłowód"], ["kabel zasilający 230 V", "kabel szeregowy RS-232"], "", { src: "C-01" });
q("okab", "Typowe gniazdo abonenckie to zwykle:", "2 gniazda 8P8C (RJ-45)", ["1 gniazdo BNC", "4 gniazda USB", "gniazdo SC"], "", { src: "C-01" });
q("okab", "Co to są połączenia systemowe w okablowaniu strukturalnym?",
  "Połączenie okablowania strukturalnego z systemami komputerowymi (kable krosowe do urządzeń aktywnych)", ["Połączenia między budynkami", "Gniazda w pomieszczeniach", "Kable zasilania"], "", { src: "C-01" });

/* ================= PUNKTY DYSTRYBUCYJNE I ABONENCKIE ================= */
q("punkt", "Jak rozwija się skrót PCS?", "Punkt centralny sieci", ["Punkt centralny serwera", "Pierwszy centralny skrzyżownik", "Panel centralnego skrosowania"],
  "Przechowywane są tam serwery, rutery; realizowany jest dostęp do Internetu.", { src: "C-01" });
q("punkt", "Jak rozwija się skrót CPD?", "Centralny punkt dystrybucyjny", ["Centralny punkt danych", "Czołowy punkt dostępowy", "Cyfrowy punkt dystrybucji"], "Często fizycznie PCS i CPD to to samo miejsce.", { src: "C-01" });
q("punkt", "Jak rozwija się skrót BPD?", "Budynkowy punkt dystrybucyjny", ["Bazowy punkt danych", "Brzegowy punkt dostępowy", "Buforowy punkt dystrybucyjny"], "Zbiera okablowanie z danego budynku.", { src: "C-01" });
q("punkt", "Jak rozwija się skrót KPD?", "Kondygnacyjny punkt dystrybucyjny", ["Kampusowy punkt dostępowy", "Kablowy punkt dystrybucyjny", "Krosowniczy punkt danych"],
  "Zbiera okablowanie z danego piętra i przechowuje urządzenia aktywne tego piętra.", { src: "C-01" });
q("punkt", "Jak rozwija się skrót LPD?", "Lokalny punkt dystrybucyjny", ["Liniowy punkt danych", "Łącznikowy punkt dostępowy", "Logiczny punkt dystrybucyjny"], "", { src: "C-01" });
q("punkt", "Kiedy stosuje się lokalny punkt dystrybucyjny (LPD)?",
  "Jako przedłużenie segmentu, np. gdy piętro jest dłuższe niż 100 m, a używana jest skrętka", ["Gdy w budynku jest tylko jedno piętro", "Zawsze w każdym pokoju", "Gdy łączymy dwa budynki światłowodem"], "", { src: "C-01" });
q("punkt", "Ile rodzajów punktów dystrybucyjnych wyróżnia metoda polska?", "5", ["2", "3", "7"], "PCS, CPD, BPD, KPD, LPD.", { src: "C-01" });
q("punkt", "Metoda angielska rozróżnia punkty:", "główny (Main) i pośredni (Intermediate) punkt dystrybucyjny", ["tylko główny", "centralny, budynkowy i lokalny", "pierwszy, drugi i trzeci"],
  "Nazwa angielska jest lepsza dla małych i średnich sieci. MDF / IDF = Main / Intermediate Distribution Facility.", { img: "mdf-idf", src: "C-01" });
q("punkt", "W którym punkcie (wg metody angielskiej) przechowuje się serwery i rutery?", "w głównym punkcie dystrybucyjnym (MDF)", ["w pośrednim punkcie dystrybucyjnym (IDF)", "w punkcie abonenckim", "w gniazdku"],
  "W pośrednich punktach zbiega się okablowanie z pięter, są panele krosownicze i przełączniki.", { img: "mdf-idf", src: "C-01" });
q("punkt", "Jakie minimalne wymiary powinno mieć pomieszczenie punktu dystrybucyjnego wg rysunku?",
  "220 cm × 300 cm, wysokość 260 cm", ["100 cm × 100 cm, wysokość 200 cm", "500 cm × 500 cm, wysokość 300 cm", "150 cm × 200 cm, wysokość 220 cm"],
  "Drzwi: min. 90 cm szerokości i 200 cm wysokości.", { img: "pomieszczenie", src: "C-01" });
q("punkt", "Jakie minimalne wymiary drzwi do pomieszczenia punktu dystrybucyjnego podaje rysunek?", "90 cm × 200 cm (szer. × wys.)", ["60 cm × 180 cm", "120 cm × 220 cm", "80 cm × 190 cm"], "", { img: "pomieszczenie", src: "C-01" });
q("punkt", "Ile punktów abonenckich wymaga norma na powierzchnię biurową?", "1 punkt z dwoma portami na każde 10 m²", ["1 port na 100 m²", "1 punkt z 4 portami na 50 m²", "2 punkty z jednym portem na 5 m²"], "", { src: "C-01" });
q("punkt", "Czym różni się gniazdo gotowe od modułowego?",
  "Modułowe składa się z modułów KEYSTONE, puszek i pokryw; gotowe jest kompletnym gniazdkiem", ["Gotowe jest światłowodowe", "Modułowe nie ma żadnych portów", "Różnią się tylko kolorem"], "", { img: "gniazda", src: "C-01" });
q("punkt", "Po co oznacza się gniazda abonenckie i porty patchpanelu?", "Ułatwia to odnalezienie przewodów w trakcie funkcjonowania sieci", ["Wymaga tego producent switchy ze względów gwarancyjnych", "Zwiększa to prędkość transmisji", "Wyłącznie dla estetyki"],
  "Przykład oznaczenia: numer kondygnacji, oznaczenie pomieszczenia, numer gniazdka, numer portu.", { img: "oznakowanie", src: "C-01" });
q("punkt", "Co oznacza zasada, że okablowanie poziome tworzy tor transmisyjny 1:1?",
  "Każdy przewód w gnieździe ma swoje zakończenie w panelu krosowniczym", ["Jedno gniazdo obsługuje jeden komputer", "Jeden przełącznik na jedno piętro", "Połączenie 1 Gb/s"], "", { src: "C-01" });
q("punkt", "Co mówi norma PN-EN 50174 o punktach dystrybucyjnych?", "Każde piętro budynku powinno mieć punkt dystrybucyjny", ["Wystarczy jeden na cały budynek", "Mają być tylko w piwnicy", "Są opcjonalne w każdej sieci"], "", { src: "C-01" });
q("punkt", "Zgodnie z PN-EN 50174 każdy przewód, nawet nieużywany, powinien:", "posiadać zakończenie", ["być obcięty przy gnieździe", "być uziemiony", "być zaizolowany taśmą"], "", { src: "C-01" });
q("punkt", "Maksymalny rozplot kabla UTP w końcówce RJ45 wg PN-EN 50174 to:", "13 mm", ["5 mm", "30 mm", "50 mm"], "To samo co 1,3 cm w laboratorium.", { src: "C-01" });
q("punkt", "Minimalny promień gięcia dla UTP / STP / światłowodu w luźnej tubie wynosi odpowiednio:", "4D / 6D / 20D", ["2D / 4D / 10D", "8D / 8D / 8D", "4D / 4D / 4D"], "D – średnica kabla.", { src: "C-01" });

/* ================= NORMY, KLASY, PARAMETRY ================= */
q("normy", "Którą normą obowiązującą w Polsce posługujemy się przy projektowaniu okablowania?", "PN-EN 50174", ["EIA/TIA-568-A", "ISO/IEC 27001", "IEEE 802.11"], "", { src: "C-01" });
q("normy", "Norma ISO/IEC 11801 jest normą:", "międzynarodową", ["amerykańską", "europejską", "polską"], "Amerykańskie: EIA/TIA-568; europejskie: EN 50173/50174; polskie: PN-EN 50173/50174.", { src: "C-01" });
q("normy", "Normy EIA/TIA-568-A i 568-B są normami:", "amerykańskimi", ["europejskimi", "polskimi", "japońskimi"], "", { src: "C-01" });
q("normy", "Jak rozwija się IEEE?", "The Institute of Electrical and Electronics Engineers", ["International Ethernet and Electronics Engineering", "Institute of Embedded Electronic Equipment", "Internet Electrical Engineers Entity"], "", { src: "C-01" });
q("normy", "Jak rozwija się ETSI?", "The European Telecommunications Standards Institute", ["European Technical Standards Institute", "Electronic Telecommunications Standards Industry", "Euro-Ethernet Systems Institute"], "", { src: "C-01" });
q("normy", "Jak rozwija się IETF?", "Internet Engineering Task Force", ["International Ethernet Task Force", "Institute of Electronic Telecommunication Fiber", "Internet Equipment Technology Forum"], "", { src: "C-01" });
q("normy", "Jak rozwija się ANSI?", "American National Standards Institute", ["Association of Network Standards International", "American Networking Standard Interface", "Applied National Systems Institute"], "", { src: "C-01" });
q("normy", "Klasa D okablowania odpowiada kategorii:", "5 (do 100 MHz)", ["6 (250 MHz)", "6A (500 MHz)", "7 (600 MHz)"], "", { src: "C-01" });
q("normy", "Klasa E to kategoria:", "6 – pasmo do 250 MHz", ["5 – 100 MHz", "7 – 600 MHz", "6A – 500 MHz"], "", { src: "C-01" });
q("normy", "Klasa EA to kategoria:", "6A – pasmo do 500 MHz", ["6 – 250 MHz", "7 – 600 MHz", "7A – 1000 MHz"], "", { src: "C-01" });
q("normy", "Klasa F to kategoria:", "7 – pasmo do 600 MHz", ["6A – 500 MHz", "7A – 1000 MHz", "8 – 2000 MHz"], "Najczęściej złącze GG45 (zgodne wstecznie z 8P8C) lub TERA.", { src: "C-01" });
q("normy", "Klasa FA to kategoria:", "7A – pasmo do 1000 MHz", ["7 – 600 MHz", "8.1 – 2000 MHz", "6A – 500 MHz"], "Najczęściej złącze ARJ45.", { src: "C-01" });
q("normy", "Do jakiej częstotliwości określa się parametry kategorii 8 (klasy I i II)?", "do 2000 MHz", ["do 600 MHz", "do 1000 MHz", "do 250 MHz"],
  "Kategorie 8.1/8.2 przeznaczone dla centrów danych, na połączenia 30–36 m.", { src: "C-01" });
q("normy", "Kategoria 8 jest przeznaczona dla:", "centrów danych (serwerowni) – połączenia do 30–36 m", ["sieci domowych o zasięgu 100 m", "okablowania kampusowego", "sieci telefonicznych"], "", { src: "C-01" });
q("normy", "Klasa I (kat. 8.1) wykorzystuje:", "okablowanie U/FTP lub F/UTP i złącza 8P8C (zgodne z klasą EA)", ["złącza GG45 i TERA", "wyłącznie światłowód", "kabel koncentryczny"],
  "Klasa II (8.2) – F/FTP lub S/FTP i złącza GG45/TERA, współdziała z klasą FA.", { src: "C-01" });
q("normy", "Na czym polega unikalność gniazda GG45 (kat. 7)?",
  "Ma 8 pinów zgodnych z RJ45 oraz 4 dodatkowe piny w narożnikach dla pracy w kat. 7; jest wstecznie kompatybilne",
  ["Ma 24 piny i działa tylko ze światłowodem", "Jest gniazdem wyłącznie dla kabla koncentrycznego", "Nie jest kompatybilne z RJ45"],
  "Moduł pracuje w dwóch modach: 8 pinów dolnych (kat. 6) lub 4 pary pinów skrajnych (kat. 7).", { img: "gg45-pin", src: "C-01" });
q("normy", "Rezystancja kabla to:", "opór, jaki stawia przewód sygnałowi, w omach [Ω]", ["prędkość impulsu względem prędkości światła, w %", "zakłócenie z sąsiedniej pary", "stosunek napięcia wyjściowego do wejściowego"], "", { src: "C-01" });
q("normy", "Propagacja w skrętce to:", "prędkość impulsu elektrycznego względem prędkości światła, wyrażona w %", ["opór przewodu", "średnica zewnętrzna", "przesłuch zdalny"], "", { src: "C-01" });
q("normy", "Tłumienie kabla wyraża się najczęściej w:", "dB na 100 m", ["Ω na metr", "% prędkości światła", "MHz"], "Stosunek napięcia wyjściowego do wejściowego.", { src: "C-01" });
q("normy", "NEXT to:", "przesłuch zbliżony – zakłócenie na jednej parze wywołane transmisją w sąsiedniej parze", ["przesłuch zdalny mierzony na drugim końcu", "suma zakłóceń ze wszystkich par", "tłumienie na 100 m"], "", { src: "C-01" });
q("normy", "PS NEXT to:", "suma zakłóceń z pozostałych par oddziałujących na jedną parę", ["przesłuch zdalny", "opór pary", "przesłuch zbliżony tylko jednej pary"], "", { src: "C-01" });
q("normy", "FEXT to:", "przesłuch zdalny – mierzony na przeciwnym końcu przewodu niż źródło zakłócenia, zależny od długości kabla", ["przesłuch zbliżony", "tłumienie sygnału", "rezystancja"], "", { src: "C-01" });
q("normy", "Powłoki LS0H i LSFR0H są stosowane, ponieważ:", "nie wydzielają dymu podczas spalania (zgodność z ochroną przeciwpożarową)", ["zwiększają prędkość transmisji", "chronią przed przesłuchami", "obniżają rezystancję"], "", { src: "C-01" });
q("normy", "Który standard: kabel koncentryczny („cienki Ethernet”), zasięg 185 m, 10 Mb/s?", "10BASE2", ["10BASE5", "10BASE-T", "100BASE-TX"], "", { src: "C-01" });
q("normy", "Który standard: kabel koncentryczny („gruby Ethernet”), zasięg 500 m, 10 Mb/s?", "10BASE5", ["10BASE2", "10BASE-T", "1000BASE-T"], "", { src: "C-01" });
q("normy", "10Base-T i 100BASE-TX to standardy na:", "skrętce, zasięg 100 m", ["kablu koncentrycznym 185 m", "światłowodzie 2 km", "kablu koncentrycznym 500 m"], "", { src: "C-01" });
q("normy", "Który standard wykorzystuje światłowód i przepustowość 100 Mb/s?", "100BASE-FX", ["10BASE-F", "1000BASE-T", "100BASE-TX"], "", { src: "C-01" });
q("normy", "1000BASE-T na kat. 5 przesyła dane:", "czterema parami jednocześnie, po 250 Mb/s każda", ["jedną parą z prędkością 1000 Mb/s", "dwiema parami po 500 Mb/s", "światłowodem"], "Każde urządzenie musi mieć cztery moduły nadawczo-odbiorcze.", { src: "C-01" });
q("normy", "Wg materiałów, na każde 10 m² powierzchni biurowej, oprócz 2 gniazd RJ-45 przewiduje się także:", "specjalne gniazdo elektryczne do zasilania stacji roboczej", ["szafę RACK", "dodatkowy punkt dystrybucyjny", "port światłowodowy"], "", { src: "C-01" });

/* ================= SKRĘTKA UTP, T568, DIAGNOSTYKA ================= */
q("utp", "Które pary i jakie kolory przewodów są używane w sieci 10Base-T?",
  "Para nr 2 (biało-pomarańczowy/pomarańczowy, piny 1 i 2) oraz para nr 3 (biało-zielony/zielony, piny 3 i 6)",
  ["Para niebieska i brązowa (piny 4,5 i 7,8)", "Wszystkie cztery pary", "Tylko para pomarańczowa"],
  "L1 z wyjściówki. Pozostałe pary (niebieska – piny 4,5; brązowa – piny 7,8) nie są obcinane, tylko podłączone.", { img: "lab-t568b", src: "L-01 / wyjściówka" });
q("utp", "Co robi się z nieużywanymi parami w sieci 10Base-T?", "Są podłączone do wtyku (nie obcina się ich)", ["Obcina się je przy płaszczu", "Zwiera się je ze sobą", "Uziemia się je"],
  "Zgodnie z PN-EN 50174 każdy przewód ma mieć zakończenie.", { src: "L-01" });
q("utp", "Do jakich pinów RJ-45 podłączona jest para nr 1 (biało-niebieski/niebieski)?", "4 i 5", ["1 i 2", "3 i 6", "7 i 8"], "", { src: "L-01" });
q("utp", "Do jakich pinów RJ-45 podłączona jest para nr 4 (biało-brązowy/brązowy)?", "7 i 8", ["4 i 5", "1 i 2", "3 i 6"], "", { src: "L-01" });
q("utp", "Który kolor jest na pinie 1 w sekwencji T568B?", "biało-pomarańczowy", ["biało-zielony", "pomarańczowy", "biało-niebieski"], "T568B: 1 b-pom, 2 pom, 3 b-ziel, 4 nieb, 5 b-nieb, 6 ziel, 7 b-brąz, 8 brąz.", { src: "L-01" });
q("utp", "Który kolor jest na pinie 1 w sekwencji T568A?", "biało-zielony", ["biało-pomarańczowy", "zielony", "brązowy"], "T568A: 1 b-ziel, 2 ziel, 3 b-pom, 4 nieb, 5 b-nieb, 6 pom, 7 b-brąz, 8 brąz.", { src: "L-01" });
q("utp", "Który kolor jest na pinie 6 w T568B?", "zielony", ["pomarańczowy", "niebieski", "biało-zielony"], "", { src: "L-01" });
q("utp", "Który kolor jest na pinie 3 w T568B?", "biało-zielony", ["biało-pomarańczowy", "zielony", "niebieski"], "", { src: "L-01" });
q("utp", "Który kolor jest na pinie 4 w obu standardach (A i B)?", "niebieski", ["zielony", "brązowy", "pomarańczowy"], "Piny 4,5,7,8 są takie same w A i B.", { src: "L-01" });
q("utp", "Czym różnią się T568A i T568B?", "Zamienione są pary zielona i pomarańczowa (piny 1,2 ↔ 3,6)", ["Zamienione są pary niebieska i brązowa", "A jest dla światłowodu, B dla miedzi", "Różnią się liczbą par"], "", { src: "L-01" });
q("utp", "Którą sekwencję przedstawia rysunek (pary od lewej)?", "T568B", ["T568A", "kabel odwrotny", "kabel koncentryczny"], "Kolejność: b-pom, pom, b-ziel, nieb, b-nieb, ziel, b-brąz, brąz.", { img: "lab-t568b", src: "L-01" });
q("utp", "Jaki to kabel?", "krosowany (crossover) – zamienione pary zielona i pomarańczowa", ["prosty", "odwrotny (telefoniczny)", "koncentryczny"],
  "Jeden koniec wg T568A, drugi wg T568B.", { img: "lab-cross", src: "L-01" });
q("utp", "Kabel prosty (zgodny) to taki, w którym:", "końcówka 1 jest połączona z 1, 2 z 2 itd. (ta sama sekwencja na obu końcach)", ["1 do 8, 2 do 7 itd.", "jeden koniec A, drugi B", "tylko dwie żyły są podłączone"], "", { src: "L-01" });
q("utp", "Kabel odwrotny (1→8, 7→2…) stosuje się w:", "kablach telefonicznych", ["łączeniu komputera z switchem", "łączeniu dwóch komputerów", "Gigabit Ethernet"], "", { src: "L-01" });
q("utp", "Do połączenia komputera z koncentratorem/przełącznikiem stosuje się kabel:", "prosty (A–A lub B–B)", ["krosowany", "odwrotny", "koncentryczny"], "", { src: "L-01" });
q("utp", "Do połączenia dwóch komputerów bez koncentratora stosuje się kabel:", "krosowany (A na jednym końcu, B na drugim)", ["prosty", "odwrotny", "światłowodowy zawsze"], "Krosowany stosuje się też między koncentratorami.", { src: "L-01" });
q("utp", "W kablu krosowanym względem prostego zamienione są piny:", "1,2 ↔ 3,6 (pary 2 i 3); pozostałe bez zmian", ["4,5 ↔ 7,8", "1,2 ↔ 7,8", "wszystkie piny odwrócone"], "", { src: "L-01" });
q("utp", "Minimalny promień zgięcia kabla kat. 5 wynosi:", "4 × średnica kabla", ["2 × średnica", "10 × średnica", "1 × średnica"], "", { src: "L-01" });
q("utp", "Jaki maksymalny rozplot par przy wtyczce RJ-45 dopuszcza instrukcja laboratoryjna?", "1,3 cm", ["5 cm", "3 cm", "0,3 cm"], "", { src: "L-01" });
q("utp", "Jak daleko od przewodów zasilających powinien biec kabel sieciowy (wg lab.)?", "ponad 30,5 cm", ["5 cm", "ponad 1,02 m", "ponad 6,4 cm"], "Od transformatorów i silników – 1,02 m. W metalowym korytku od przewodów zasilających min. 6,4 cm.", { src: "L-01" });
q("utp", "Jaką odległość zachować od transformatorów i silników?", "1,02 m", ["30,5 cm", "6,4 cm", "10 cm"], "", { src: "L-01" });
q("utp", "Min. odległość od przewodów zasilających, gdy skrętka leży w metalowym korytku prowadzącym:", "6,4 cm", ["30,5 cm", "1,02 m", "0 cm"], "", { src: "L-01" });
q("utp", "Jak należy krzyżować kabel zasilający ze skrętką?", "prostopadle do siebie", ["równolegle", "splecione", "pod kątem 45° przez 1 m"], "", { src: "L-01" });
q("utp", "Dlaczego nie należy mocować kabla „na sztywno” ani nadmiernie dociskać „krawatek”?", "Kabel powinien mieć pewien luz, a nadmierny nacisk i naciąganie pogarsza parametry", ["Bo krawatki przewodzą prąd", "Bo kabel się nagrzewa", "Bo wymaga tego producent wtyków"], "", { src: "L-01" });
q("utp", "Które to zalety skrętki?", ["najtańsze medium (cena za metr)", "łatwa instalacja i diagnozowanie uszkodzeń", "awaria kabla zwykle unieruchamia tylko jeden komputer"],
  ["bardzo duża odporność na zakłócenia (nieekranowana)", "odporność na uszkodzenia mechaniczne"],
  "Wady: mała odporność na zakłócenia (UTP) i na uszkodzenia mechaniczne (potrzebne listwy/korytka).", { src: "L-01" });
q("utp", "Skąd pochodzi nazwa programu ping?", "Od odgłosu echa sonarowego", ["Od skrótu Packet INternet Groper w pierwszej wersji RFC", "Od nazwiska autora", "Od portu 1234"],
  "Ping sprawdza dostępność komputera w sieci.", { src: "L-01" });
q("utp", "Jaki komunikat zobaczysz, gdy pingowany komputer jest wyłączony lub sieć nie działa?", "Upłynął limit czasu żądania", ["Wystąpił błąd systemu 53", "Dostęp zabroniony", "Brak karty sieciowej"], "", { src: "L-01" });
q("utp", "Które polecenie pokazuje adres IP komputera?", "ipconfig", ["net view", "ping", "tracert -a"], "", { src: "L-01" });
q("utp", "Jak za pomocą polecenia ipconfig sprawdzić adresy MAC kart sieciowych?",
  "ipconfig /all – pozycja „Adres fizyczny” (Physical Address)", ["ipconfig bez żadnych przełączników", "ipconfig /release", "ipconfig /flushdns"],
  "L2 z wyjściówki. Adres MAC ma 6 bajtów zapisanych szesnastkowo (np. 00-1A-2B-3C-4D-5E). Alternatywnie: getmac. Samo ipconfig adresu MAC nie pokazuje.", { src: "wyjściówka" });
q("utp", "Alternatywne polecenie wyświetlające adresy MAC w Windows:", "getmac", ["net view", "ping -mac", "ipconfig /ip"], "", { src: "wyjściówka" });
q("utp", "Co robi polecenie net view nazwa_komputera?", "Wyświetla informacje o komputerze w sieci i zasobach, które udostępnia", ["Wysyła pakiety ICMP", "Pokazuje adres MAC karty", "Restartuje kartę sieciową"], "", { src: "L-01" });
q("utp", "Co oznacza komunikat „Wystąpił błąd systemu 53” po net view?", "Komputer o podanej nazwie jest niedostępny (np. wyłączony)", ["Błędne hasło", "Brak uprawnień", "Zbyt długi kabel"], "", { src: "L-01" });
q("utp", "Co sprawdza tester kabla UTP przy ocenie patchcordu?", "Ciągłość i kolejność wszystkich 8 żył (1-1 … 8-8)", ["Tylko, czy kabel jest żółty", "Tylko prędkość 10 Mb/s", "Napięcie w żyłach"], "L3 z wyjściówki: ocenia się staranność, zgodność z regułami i wynik testu testerem.", { src: "wyjściówka" });

/* ================= IPv4: KLASY I ZASADY ================= */
q("ip4", "Adres MAC działa w warstwie:", "łącza danych (adresacja fizyczna)", ["sieci", "transportowej", "aplikacji"], "Adres IP – adresacja logiczna, warstwa sieci.", { src: "C-02" });
q("ip4", "Adres IP jest adresem:", "logicznym, w warstwie sieci", ["fizycznym, w warstwie łącza danych", "fizycznym, w warstwie fizycznej", "aplikacyjnym"], "", { src: "C-02" });
q("ip4", "Która organizacja obecnie przydziela adresy IP (pierwotnie InterNIC)?", "IANA", ["IEEE", "ISO", "ETSI"], "IANA – Internet Assigned Numbers Authority.", { src: "C-02" });
q("ip4", "Ile bitów ma adres IPv4 i ile jest możliwych adresów?", "32 bity, 2³² adresów", ["64 bity, 2⁶⁴ adresów", "128 bitów, 2¹²⁸ adresów", "48 bitów, 2⁴⁸ adresów"], "", { src: "C-02" });
q("ip4", "Z czego składa się adres IPv4?", ["identyfikator sieci", "identyfikator hosta", "maska sieciowa (netmaska)"], ["adres MAC", "numer portu"], "", { src: "C-02" });
q("ip4", "Dwa podejścia do adresacji IP to:", "adresacja klasowa i bezklasowa", ["adresacja fizyczna i logiczna", "adresacja statyczna i fizyczna", "adresacja prywatna i sieciowa"], "", { src: "C-02" });
q("ip4", "Zakres pierwszego oktetu klasy A (wg tabeli w wykładzie) to:", "1–126", ["128–191", "192–223", "224–239"], "Bity wiodące: 0; 8 bitów identyfikatora sieci; domyślna maska 255.0.0.0.", { img: "ip-klasy-zakres", src: "C-02" });
q("ip4", "Zakres pierwszego oktetu klasy B to:", "128–191", ["1–126", "192–223", "224–239"], "Bity wiodące: 10; 16 bitów sieci; maska 255.255.0.0.", { img: "klasa-b", src: "C-02" });
q("ip4", "Zakres pierwszego oktetu klasy C to:", "192–223", ["128–191", "224–239", "1–126"], "Bity wiodące: 110; 24 bity sieci; maska 255.255.255.0.", { img: "klasa-c", src: "C-02" });
q("ip4", "Zakres pierwszego oktetu klasy D (multicast) to:", "224–239", ["192–223", "240–255", "128–191"], "Bity wiodące: 1110.", { img: "ip-klasy-tab", src: "C-02" });
q("ip4", "Bity najbardziej znaczące klasy A / B / C / D to odpowiednio:", "0 / 10 / 110 / 1110", ["1 / 10 / 100 / 1000", "00 / 01 / 10 / 11", "0 / 1 / 11 / 111"], "", { img: "ip-klasy-tab", src: "C-02" });
q("ip4", "Do której klasy należy adres 10.20.30.40?", "A", ["B", "C", "D"], "Pierwszy oktet 1–126.", { src: "C-02" });
q("ip4", "Do której klasy należy adres 172.16.5.4?", "B", ["A", "C", "D"], "Pierwszy oktet 128–191.", { src: "C-02" });
q("ip4", "Do której klasy należy adres 192.168.1.10?", "C", ["A", "B", "D"], "", { src: "C-02" });
q("ip4", "Do której klasy należy adres 224.0.0.5?", "D (multicast)", ["A", "B", "C"], "", { src: "C-02" });
q("ip4", "Do której klasy należy adres 191.255.1.1?", "B", ["A", "C", "D"], "191 mieści się w 128–191.", { src: "C-02" });
q("ip4", "Do której klasy należy adres 223.1.1.1?", "C", ["B", "D", "A"], "", { src: "C-02" });
q("ip4", "Domyślna maska klasy B to:", "255.255.0.0", ["255.0.0.0", "255.255.255.0", "255.255.255.128"], "", { src: "C-02" });
q("ip4", "Domyślna maska klasy C to:", "255.255.255.0 (/24)", ["255.255.0.0", "255.0.0.0", "255.255.255.192"], "", { src: "C-02" });
q("ip4", "Ile bitów identyfikatora sieci ma klasa A / B / C?", "8 / 16 / 24", ["16 / 24 / 32", "4 / 8 / 16", "8 / 8 / 8"], "", { img: "klasa-a", src: "C-02" });
q("ip4", "Ile adresów użytecznych (hostów) jest w typowej sieci klasy C?", "254", ["256", "255", "126"], "2⁸ − 2 = 254.", { src: "C-02" });
q("ip4", "Ile hostów można zaadresować w sieci klasy B?", "65 534", ["65 536", "16 777 214", "254"], "2¹⁶ − 2.", { src: "C-02" });
q("ip4", "Ile hostów można zaadresować w sieci klasy A?", "16 777 214", ["16 777 216", "65 534", "8 388 606"], "2²⁴ − 2.", { src: "C-02" });
q("ip4", "Które zasady adresowania są prawdziwe?",
  ["pierwszą liczbą identyfikatora nie może być 127", "identyfikator hosta nie może składać się z samych zer", "identyfikator hosta nie może składać się z samych jedynek (255)", "identyfikator hosta nie może się powtórzyć w sieci"],
  ["identyfikator hosta musi być parzysty", "adres musi kończyć się na 1"], "", { src: "C-02" });
q("ip4", "Do czego służy adres 127.0.0.1?", "To adres pętli zwrotnej (loopback) – nie można go przydzielić hostowi w sieci", ["To adres bramy domyślnej", "To adres rozgłoszeniowy", "To pierwszy adres klasy A dla hostów"], "", { src: "C-02" });
q("ip4", "Wzór na liczbę użytecznych adresów hostów w sieci, gdy n bitów to identyfikator hosta:", "2ⁿ − 2", ["2ⁿ", "2ⁿ − 1", "2ⁿ + 2"], "Pierwszy adres to identyfikator sieci, ostatni – rozgłoszeniowy (broadcast).", { src: "C-02" });
q("ip4", "Pierwszy adres w sieci (host=same zera) oznacza:", "identyfikator (adres) sieci", ["adres broadcast", "bramę domyślną", "adres loopback"], "", { src: "C-02" });
q("ip4", "Ostatni adres w sieci (host=same jedynki) oznacza:", "adres rozgłoszeniowy (broadcast)", ["adres sieci", "adres bramy", "adres DNS"], "", { src: "C-02" });
q("ip4", "Ograniczeniem adresacji klasowej jest m.in.:",
  ["nadmiarowość adresów w organizacjach z małą liczbą hostów (np. 25)", "braki adresów w organizacjach z dużą liczbą hostów (np. 300)", "duże tablice routingu"],
  ["zbyt mała liczba klas", "brak możliwości adresacji hostów"], "", { src: "C-02" });
q("ip4", "Firma ma 300 komputerów i dostaje sieć klasy C. Co jest problemem?", "Klasa C pozwala zaadresować tylko 254 hosty – za mało", ["Klasa C ma zbyt wiele adresów", "Klasa C nie obsługuje hostów", "Brak problemu"], "Z kolei klasa B (65 534 hostów) byłaby ogromną nadmiarowością.", { src: "C-02" });
q("ip4", "Które z rozwiązań problemu niedoboru adresów IPv4 wprowadzono w 1985 r.?", "podsieci", ["CIDR", "NAT", "VLSM"], "1985 – podsieci; 1987 – podsieci o zróżnicowanej długości (VLSM); 1993 – CIDR.", { src: "C-02" });
q("ip4", "W którym roku wprowadzono bezklasowy routing międzydomenowy CIDR?", "1993", ["1985", "1987", "1999"], "", { src: "C-02" });
q("ip4", "Podsieci o zróżnicowanej długości adresów (VLSM) wprowadzono w:", "1987 r.", ["1985 r.", "1993 r.", "1999 r."], "", { src: "C-02" });
q("ip4", "Które to metody ograniczania niedoboru adresów IPv4?",
  ["adresy prywatne", "NAT", "automatyczne przydzielanie adresów (DHCP)", "CIDR"], ["zwiększenie liczby klas do 10", "zakaz używania maski"], "", { src: "C-02" });
q("ip4", "Które zakresy to adresy prywatne?", ["10.0.0.0 – 10.255.255.255", "172.16.0.0 – 172.31.255.255", "192.168.0.0 – 192.168.255.255"], ["172.32.0.0 – 172.40.255.255", "192.169.0.0 – 192.169.255.255"], "", { src: "C-02" });
q("ip4", "Który z adresów jest prywatny?", "172.20.1.1", ["172.32.1.1", "192.169.1.1", "11.0.0.1"], "Prywatne 172.16.0.0–172.31.255.255.", { src: "C-02" });
q("ip4", "Który z adresów NIE jest prywatny?", "172.32.0.5", ["10.200.1.1", "172.31.255.254", "192.168.77.1"], "172.32.x.x leży poza zakresem 172.16–172.31.", { src: "C-02" });
q("ip4", "Do czego służy NAT?", "Do translacji adresów sieciowych – wiele hostów z adresami prywatnymi korzysta z jednego adresu publicznego", ["Do szyfrowania ruchu", "Do przydzielania adresów MAC", "Do tworzenia kabli krosowanych"], "", { src: "C-02" });

/* ================= PODSIECI, NADSIECI, CIDR, VLSM ================= */
q("podsieci", "Jak tworzy się podsieci?", "Pożyczając bity z części identyfikatora hosta na identyfikator sieci", ["Pożyczając bity z części sieciowej na adresację hostów", "Zmieniając adres MAC", "Zmieniając klasę adresu"], "", { src: "C-02" });
q("podsieci", "Jak tworzy się nadsieci?", "Pożyczając bity z części sieciowej na adresację hostów", ["Pożyczając bity z hosta na sieć", "Dodając bity do adresu", "Zmieniając bramę domyślną"], "Nadsieć jest potrzebna, gdy w jednej sieci logicznej ma być więcej hostów niż pozwala klasa.", { src: "C-02" });
q("podsieci", "Po co administratorzy dzielą sieć na mniejsze segmenty?", "Aby zmniejszyć liczbę komunikatów rozgłoszeniowych w domenach", ["Aby zwiększyć zasięg Wi-Fi", "Aby zmienić klasę adresu", "Aby uniknąć stosowania routerów"], "", { src: "C-02" });
q("podsieci", "Ile bitów trzeba pożyczyć z części hosta, by uzyskać 8 podsieci?", "3", ["2", "4", "8"], "2³ = 8.", { src: "C-02" });
q("podsieci", "Sieć 192.168.1.0 trzeba podzielić na 8 pracowni po max 30 komputerów. Jaka będzie maska?", "255.255.255.224 (/27)", ["255.255.255.192 (/26)", "255.255.255.240 (/28)", "255.255.255.128 (/25)"],
  "3 bity pożyczone: /24 + 3 = /27. W każdej podsieci 2⁵ − 2 = 30 hostów.", { src: "C-02" });
q("podsieci", "Ile hostów można zaadresować w podsieci /27?", "30", ["32", "62", "14"], "2⁵ − 2.", { src: "C-02" });
q("podsieci", "Ile hostów można zaadresować w podsieci /26?", "62", ["64", "30", "126"], "2⁶ − 2.", { src: "C-02" });
q("podsieci", "Ile hostów można zaadresować w podsieci /25?", "126", ["128", "62", "254"], "2⁷ − 2.", { src: "C-02" });
q("podsieci", "Ile hostów można zaadresować w podsieci /28?", "14", ["16", "30", "6"], "2⁴ − 2.", { src: "C-02" });
q("podsieci", "Ile hostów można zaadresować w podsieci /29?", "6", ["8", "14", "2"], "2³ − 2.", { src: "C-02" });
q("podsieci", "Ile hostów można zaadresować w podsieci /30 (np. łącze WAN między routerami)?", "2", ["4", "6", "1"], "2² − 2.", { src: "C-02" });
q("podsieci", "Maska /26 w zapisie dziesiętnym to:", "255.255.255.192", ["255.255.255.224", "255.255.255.128", "255.255.255.240"], "", { src: "C-02" });
q("podsieci", "Maska /28 w zapisie dziesiętnym to:", "255.255.255.240", ["255.255.255.224", "255.255.255.248", "255.255.255.192"], "", { src: "C-02" });
q("podsieci", "Maska /29 w zapisie dziesiętnym to:", "255.255.255.248", ["255.255.255.240", "255.255.255.252", "255.255.255.224"], "", { src: "C-02" });
q("podsieci", "Maska /30 w zapisie dziesiętnym to:", "255.255.255.252", ["255.255.255.248", "255.255.255.254", "255.255.255.240"], "", { src: "C-02" });
q("podsieci", "Maska /23 w zapisie dziesiętnym to:", "255.255.254.0", ["255.255.252.0", "255.255.255.128", "255.254.0.0"], "", { src: "C-02" });
q("podsieci", "Maska /25 w zapisie dziesiętnym to:", "255.255.255.128", ["255.255.255.192", "255.255.254.0", "255.255.255.0"], "", { src: "C-02" });
q("podsieci", "Maska 255.255.255.224 to prefiks:", "/27", ["/26", "/28", "/25"], "224 = 11100000 → 3 bity.", { src: "C-02" });
q("podsieci", "Maska 255.255.255.240 to prefiks:", "/28", ["/27", "/29", "/26"], "240 = 11110000 → 4 bity.", { src: "C-02" });
q("podsieci", "Podsieci 192.168.1.0/27 mają adresy sieci co:", "32", ["16", "64", "30"], "Rozmiar bloku = 2⁵ = 32: .0, .32, .64, .96, .128, .160, .192, .224.", { src: "C-02" });
q("podsieci", "Który z adresów jest adresem broadcast sieci 192.168.1.32/27?", "192.168.1.63", ["192.168.1.64", "192.168.1.62", "192.168.1.31"], "", { src: "C-02" });
q("podsieci", "Jaki jest pierwszy użyteczny adres hosta w 192.168.1.96/27?", "192.168.1.97", ["192.168.1.96", "192.168.1.98", "192.168.1.95"], "", { src: "C-02" });
q("podsieci", "Jaki jest adres broadcast sieci 192.168.1.224/27?", "192.168.1.255", ["192.168.1.224", "192.168.1.223", "192.168.1.254"],
  "Uwaga: w skrypcie C-02 w liście adresów broadcastowych błędnie wpisano 192.168.1.224 – poprawnie jest .223 dla podsieci .192, a .255 dla .224.", { src: "C-02" });
q("podsieci", "Jaki jest adres broadcast sieci 192.168.1.192/27?", "192.168.1.223", ["192.168.1.224", "192.168.1.255", "192.168.1.222"], "", { src: "C-02" });
q("podsieci", "W sieci potrzeba 500 hostów. Ile bitów hosta jest potrzebnych i jaki będzie prefiks (dla przykładu 192.168.0.0)?", "9 bitów hosta → /23 (255.255.254.0)", ["8 bitów → /24", "10 bitów → /22", "7 bitów → /25"], "2⁹ = 512 ≥ 500 (+2). Bit pożyczamy z części sieciowej (nadsieć).", { src: "C-02" });
q("podsieci", "Dla sieci 192.168.0.0/23: pierwszy użyteczny adres hosta to:", "192.168.0.1", ["192.168.1.1", "192.168.0.0", "192.168.1.0"], "", { src: "C-02" });
q("podsieci", "Dla sieci 192.168.0.0/23: adres rozgłoszeniowy to:", "192.168.1.255", ["192.168.0.255", "192.168.0.254", "192.168.2.0"], "Zakres 192.168.0.0–192.168.1.255 (512 adresów).", { src: "C-02" });
q("podsieci", "Po co przy tworzeniu nadsieci (CIDR) wybiera się adresy sieci sąsiadujących o takich samych bitach znaczących?",
  "Umożliwia to agregację tras przez routery", ["Aby zwiększyć liczbę adresów MAC", "Aby przejść na IPv6", "Aby wyłączyć NAT"], "Router rozgłasza wtedy jedną zagregowaną trasę.", { src: "C-02" });
q("podsieci", "ISP dał pulę 32 adresów: 192.168.132.224/27. Jaki prefiks pozwoli zaadresować 14 hostów w jednej z lokalizacji?", "/28 (255.255.255.240)", ["/27", "/29", "/26"], "4 bity hosta: 2⁴ − 2 = 14.", { img: "przyklad2", src: "C-02" });
q("podsieci", "Pierwsza lokalizacja dostaje 192.168.132.224/28. Jaki jest adres broadcast i pierwszy host?", "broadcast 192.168.132.239, pierwszy host 192.168.132.225", ["broadcast 192.168.132.240, pierwszy host 192.168.132.224", "broadcast 192.168.132.255, pierwszy host 192.168.132.226", "broadcast 192.168.132.231, pierwszy host 192.168.132.225"], "", { img: "przyklad2", src: "C-02" });
q("podsieci", "Druga lokalizacja (max 6 hostów) dostaje 192.168.132.240/29. Jaki jest broadcast?", "192.168.132.247", ["192.168.132.255", "192.168.132.243", "192.168.132.248"], "Pierwszy host: .241.", { img: "przyklad2", src: "C-02" });
q("podsieci", "Łącza WAN między routerami adresuje się zwykle sieciami:", "/30 – dwa adresy użyteczne", ["/24", "/28", "/29"], "Przykład: 192.168.132.248/30 (hosty .249, .250, broadcast .251) oraz 192.168.132.252/30 (hosty .253, .254, broadcast .255).", { img: "przyklad2", src: "C-02" });
q("podsieci", "Co jest adresem broadcast sieci 192.168.132.248/30?", "192.168.132.251", ["192.168.132.250", "192.168.132.252", "192.168.132.255"], "", { img: "przyklad2", src: "C-02" });
q("podsieci", "Adres 192.168.132.29/29 – jaki zakres ma ta sieć?", "192.168.132.24 – 192.168.132.31 (6 adresów użytecznych)", ["192.168.132.0 – 192.168.132.31", "192.168.132.28 – 192.168.132.35", "192.168.132.16 – 192.168.132.31"], "32 − 29 = 3 bity hosta → 8 adresów, 6 użytecznych.", { src: "C-02" });
q("podsieci", "Na obrazku podsieć 172.16.14.0/24 jest podzielona na mniejsze podsieci. Jaki prefiks mają podsieci z jedną maską?", "/27", ["/28", "/26", "/30"], "Jedna nieużywana podsieć /27 jest dalej podzielona na trzy podsieci /30.", { img: "vlsm", src: "C-02" });
q("podsieci", "Na czym polega zastosowanie VLSM na obrazku?", "Jedna z podsieci /27 podzielona jest dalej na trzy podsieci /30 (łącza routerów)", ["Wszystkie podsieci mają /30", "Użyto tylko jednej maski /24", "Podsieć zamieniono na nadsieć"], "Netmaski o zmiennej długości pozwalają dopasować rozmiar podsieci do potrzeb.", { img: "vlsm", src: "C-02" });
q("podsieci", "Ile podsieci /27 mieści się w sieci /24?", "8", ["4", "16", "32"], "2^(27−24) = 8.", { src: "C-02" });
q("podsieci", "Ile podsieci /30 mieści się w jednej podsieci /27?", "8", ["4", "16", "2"], "32 / 4 = 8.", { src: "C-02" });

/* ================= IPv6 ================= */
q("ip6", "Ile bitów ma adres IPv6?", "128", ["32", "64", "256"], "Liczba adresów 2¹²⁸.", { src: "C-02" });
q("ip6", "W jakiej postaci zapisuje się adres IPv6?", "w systemie szesnastkowym, grupy po 16 bitów oddzielone dwukropkami", ["w systemie dziesiętnym, oddzielone kropkami", "w systemie ósemkowym", "w systemie binarnym bez separatorów"], "", { src: "C-02" });
q("ip6", "Ile 16-bitowych grup szesnastkowych ma pełny adres IPv6?", "8", ["4", "6", "16"], "8 × 16 = 128.", { src: "C-02" });
q("ip6", "Jakie są typy adresów IPv6?", ["unicast (kierowany)", "anycast (uniwersalny)", "multicast (grupowy)"], ["broadcast", "loopback"], "W IPv6 nie ma broadcastu.", { src: "C-02" });
q("ip6", "Adres pętli zwrotnej IPv6 to:", "::1/128 (0:0:0:0:0:0:0:1)", ["::/128", "fe80::/10", "ff00::/8"], "Odpowiednik 127.0.0.1 z IPv4.", { src: "C-02" });
q("ip6", "Co oznacza adres ::/128?", "Adres zerowy, wykorzystywany tylko w oprogramowaniu", ["Pętla zwrotna", "Adres multicast", "Adres link-local"], "", { src: "C-02" });
q("ip6", "Adresy typu link-local (autokonfiguracja w sieci lokalnej) mają prefiks:", "fe80::/10", ["ff00::/8", "::1/128", "::ffff:0:0/96"], "", { src: "C-02" });
q("ip6", "Adresy multicast w IPv6 mają prefiks:", "ff00::/8", ["fe80::/10", "::/96", "::1/128"], "", { src: "C-02" });
q("ip6", "Do czego służy pula ::ffff:0:0/96?", "To adresy kompatybilne z adresem IPv4 hosta korzystającego wyłącznie z IPv4 (32 najmniej znaczące bity jak w IPv4)", ["Adresy prywatne", "Adresy multicast", "Adres pętli zwrotnej"], "", { src: "C-02" });
q("ip6", "Jak obecnie przesyła się ruch IPv6 przez sieć opartą na IPv4?", "Tuneluje się go w IPv4", ["Zamienia adresy MAC", "Używa wyłącznie NAT", "Nie da się tego zrobić"], "", { src: "C-02" });
q("ip6", "Jak skrócić adres 2001:0db8:0000:0000:0000:0000:0000:0001?", "2001:db8::1", ["2001:db8:1", "2001:db8:::1", "2001::0db8::1"], "Ciąg zer można zastąpić „::” tylko raz; zera wiodące w grupach można pominąć. (Uzupełnienie)", { src: "C-02" });
q("ip6", "Ile razy w adresie IPv6 można użyć skrótu „::”?", "Tylko raz", ["Dowolnie wiele razy", "Dwa razy", "Wcale"], "(Uzupełnienie)", { src: "C-02" });
