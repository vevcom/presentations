---
title: Operativsystemer
author: Trym Sneltvedt - <trym@snelt.net>
---

# Hva skal vi lære om?

- Programmer
- Bygging / kompilering
- Prosesser
- Tråder
- Operativsystemer
- Linux-distribusjoner
- Docker

# Programmer

Maskinkode lagret i sekundærminne. Sekundærminne er lagringsenheter som ikke tømmes når du restarter datamaskinen, alså HDDer, SSDer o.l.

Primærminne er minne som slettes når du skur av datamaskinen, altså RAM, Cache o.l.

# Maskinkode?

- Kode som prosessoren din kan tolke
- Laget for å ta lite plass
- Ikke laget for at mennesker skal lese det

# Ett steg opp: Assembly

- Lavnivå programmering
- Oversettes direkte til maskinkode (linje for linje)
- Kronglete syntax, fortsatt ikke spesielt god å lese for mennesker
- Veldig pirkete, trenger _mange_ linjer for å få brukbare programmer
- Arkitekturspesifik! Assembly skrevet til en stasjonær PC (x86) må skrives på nytt om den skal kjøre på mobiltelefonen (ARM) din
- Brukes egentlig bare når man må skvise ut maksimal ytelse (f.eks. i innvevde system eller lavnivå drivere)

# Enda et steg: Høynivåspråk

- Høynivå programmering
- Oversettes til Assembly av en **compiler**/**kompilator**
- Eller tolkes i sanntid av en **interpreter** uten å kompileres
- Arkitekturuavhengig: Samme kode kan kjøres på forskjellige arktitekturer

# C

- Kompileres til maskinkode, lager grusomt raske programmer
- Programmer hvor ytelsen er kritisk skrives ofte i C (eks. operativsystemer)
- Gammelt, men fortsatt mye brukt

## Andre nevneverdige kompilerte språk

- _Rust_ (moderne og sikrere enn C, utvikles av Mozilla)
- _Go_ (også moderne, utvikles av Google)
- _C++_ (C men med masse ekstra features, dere lærer om det i emnet objektorientert programmering) 

# La oss skrive litt C!

Skrive...
```c
#include <stdio.h>

int main() {
  printf("Hello World!");
  return 0;
}
```

Kompilere...
```bash
gcc hello.c -o hello
```

Og kjøre!
```bash
./hello
```

Enkelt og gøy! 

# Men...

- En del merkelige designvalg
- Ikke like ille som Assembly, men krever fortsatt en del kode for å gjøre relativt enkle ting
- Slitsomt å skrive større programmer

# Javascript

- Interpreted
- Raskt (til å være interpreted)
- Forholdsvis enkelt å lære
- "Må" brukes til nettsider
- Nettlesere har innebygd interpreter
- Man må laste ned en egen interpreter for å kjøre Javascript på ens egen maskin (native).
- Vi bruker Node.js på serveren (back end)

## Andre nevneverdige interpreta språk

- _Python_ (dere lærer det i ITGK, veldig lett å lære, kraftig)

# La oss skrive litt Javascript!

Skrive...
```javascript
console.log("Hello World!");
```

Og kjøre!
```bash
node hello.js
```

Merk at vi ikke trenger å kompilere, vi bare kjører kildekoden direkte

# Hvorfor bruker vi Node.js?

- Javascript i nettleseren har ikke tilgang på operativsystemressurser (nettverksporter, filsystem osv.)

# Hvorfor ikke Python til back end?

- Dere lærer jo Python, hvorfor ikke bare bruke det?
- Vi må uansett bruke Javascript til front end
- Fint hvis alle i Vevcom kan ha en viss forståelse for koden
- Sunt å lære flere språk! 

# Prosesser

Maskinkode lastet inn i primærminne (kjørende)

# Tråder

Lar oss kjøre kode parallelt.

- Mange operasjoner en prosess kan utføre er _blocking_, dvs. prosessen må vente på at de skal fullføre før de kan fortsette
- Lesing/skriving til filsystemet er et godt eksempel (ofte kalt I/O)
- Veldig lite effektivt, trist hvis brukeren ikke får oppdatert vinduet sitt mens prosessen skriver til en fil
- Tråder lar oss ha flere programflyter kjørene samtidig
- Knyttet til prosesser, man har ikke tråder istedenfor prosesser, de er en del av de
- Når man starter en prosess starter man også en tråd
- Tråder deler minne, setter man en variabel i èn prosess kan man lese den nye verdien i en annen

# Kjipe ting med tråder

Det at tråder kan dele minne høres kanskje ut som en fin ting, men det gir opphav til en haug med grusomme problemer, og vi må bruke spesielle mekanismer for ikke å få ekle bugs. Vanlige problemer er _deadlock_, som oppstår når flere tråder venter evig på hverandre, og _race conditions_ som vil si at det ikke er deterministisk hva slags verdi man får når man leser/skriver til minnet. Dette skjer når f.eks. en tråd skriver til en variaber samtidig som en annen leser fra den. Det høres kanskje banalt ut, men dette er veldig slitsomme problemer. Anbefaler sterkt å ta faget _Sanntidsprogrammering_ hvis dere vil lære mer om det.

## Men...

Vi trenger heldigvis ikke å tenke på dette i Javascript. I Node.js kan vi starte flere programflyter med _cluster_-modulen, men de startes i individuelle prosesser, så de har ikke tilgang til det samme minnet.

# Operativsystemer

- Et program som ligger mellom maskinvaren og programmene du skriver
- Gjør livet til oss programmerere mye lettere
- Hvordan snakker man med et tastatur? Operativsystemet gjør det for deg, programmet trenger bare spørre hvilke taster som blir holdt nede
- Lar også flere programmer kjøre "samtidig". Selv om prosessoren bare kan utføre èn instruksjon av gangen kan vi raskt bytte mellom forskjellige programmer, sånn at det for oss brukere virker som de kjører samtidig.
- Tar seg også av ting som brukerrettigheter, minnehåndtering og styring av flere prosessorkjerner (hvis tilgjengelig)

# Flerkjernede systemer

- På tidlig 2000-tallet fant man ut at å bare øke klokkehastigheten på prosessorene våre ikke var bærekraftig, de blir rett og slett for varme
- Vi måtte finne andre måter å gjøre det på, dermed flerkjernede prosessorer
- Vi har flere prosessorer på samme chip, som kan kommunisere veldig effektivt
- Lar oss gjøre flere ting helt samtidig

# GNU/Linux

- Kalles vanligvis bare for Linux
- Men! Linux er bare _kernelen_ (tar seg av lavnivå operasjoner)
- De grunnleggende programmene som lar brukeren faktisk bruke operativsystemet er en del av GNU-prosjektet (f.eks. `sh`, `cd` og `ls`)

# GNU/Linux Distribusjoner

_Distribusjoner_ (ofte forkortet til _distro_) er utgaver av GNU/Linux med ytterligere programmer installert (sånn som _package managers_ og _window managers_/_skrivebordsmiljøer_). Noen av de vanligste distribusjonene er:

- _Debian_ (Kjøres på serveren vår, veldig vanlig distribusjon)
- _Ubuntu_ (basert på Debian, enda enklere å komme igang med)
- _Arch Linux_ (Veldig liten og nett, lite "bloat". Lærer deg masse, men kan være litt ustabil)
- _Manjaro_ (basert på Arch Linux, mindre ustabil, kommer med mer programvare forhåndsinnstallert)
- _Kali Linux_ (basert på Debian, laget for hacking)

# Docker

- _Containerized processes_
- Lar oss kjøre prosesser i et forhåndsbygd miljø (vi styrer hvilke programmer som er installert og hva som er i filsystemet)
- Vanlig problem: Koden jeg skriver kjører på min egen pc, men Gnomulf har bare Node.js versjon 1, så det vil ikke kjøre der (eller værre, kjører på min maskin, men ikke på serveren)
- Dette er ikke et problem med Docker, hvis det kjører i en konteiner i Docker hos meg, så kjører det i en konteiner overalt (nesten, må ha samme prosessorarkitektur)
- Lar oss også gjøre andre kule ting, som å styre hvor mye minne/prosessorkraft enkelte prosesser får bruke, og kjøre mange av den samme programmet for å avlaste hverandre

# Docker er litt komplisert

- En _Docker container_ startes fra et _Docker image_
- Et _Docker image_ bygges av en _Dockerfile_
- En _Dockerfile_ brukes til å beskrive miljøet
- Vi kan _komponere_ flere _Docker containers_ med _Docker compose_
- _Docker compose_ bruker (vanligvis) en fil kalt `docker-compose.yml`

Vanlig å ha flere kontainere kjørende, f.eks. en webserver og en database. Det er derfor vi bruker Docker compose (kan gjøre det uten også, men tungvindt).

# Docker up and running

1. Skriv Dockerfile

```Dockerfile
# Eksempel på enkel Dockerfile for et Node.js-program
FROM node:latest

COPY . .

CMD node index.js
```

2. Bygg et bilde fra Dockerfilen med `docker build -t testimage .`
3. Kjør bildet med `docker run testimage`
4. List alle kjørende kontainere med `docker ps`
5. Stopp kontaineren med `docker stop <navn på kontainer>`
6. Slett bildet med `docker rm testimage`
