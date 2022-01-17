# loceatr

MVP az Innovatív Vállalkozásmenedzsment félév végi projektemhez. A kitalált étteremkereső alkalmazás alapelve, hogy minden étteremnek egyenlő esélyeket biztosít a megjelenésre, a felhasználóknak pedig segít új, közeli helyeket felfedezni.

## Technológia

Az alkalmazás React Native-ban készült, Expo-val, a gyorsabb tesztelhetőség kedvéért. A backend Supabase-en fut, ahol egy postgres adatbázisban vannak tárolva az adatok, itt történik az "ajánlások" generálása (plpgsql függvényekkel) és az értesítések kiküldése is (az adatbázison belül egy cron job adott időközönként meghív egy API-t). Az authentikációt szintén a Supabase biztosítja, így egyszerűen korlátozható a hozzáférés az adatbázishoz a felhasználók jogai szerint, és támogatják a magic link bejelentkezést, ami *nagyon menő*, ezért sem hagyhattam ki.

## A projekt utóélete

A projekt bemutatása óta nem fejlesztettem tovább az alkalmazást. Sok hiányossága van, elvégre csak egy MVP (és még így is bőven túlzás volt, a feladat igazi célja a vállalkozás üzleti oldalának bemutatása lett volna). A beállítások tab teljesen üres, a főoldalon néhány funkció csak dizájn szinten van implementálva, valamint az adatbázis oldalon is kell még néhány változtatást tenni, hogy megbízhatóbban működjön, de az adatok lekérése, valamint a működő UI elemek stabilan működnek, és a "végleges" verzióban is maradnának.
