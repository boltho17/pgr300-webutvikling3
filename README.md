This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

## Nettsiden krever at newsAPI kjører på https://localhost:5001/

Funksjonalitet:
- CRUD mot database fungerer som tiltenkt. Delete og Update gjøres fra fremvisning av en egenopprettet post.
- Nettsiden oppdateres(re-renders) automatisk når en post slettes eller redigeres.
##

Ekstra funksjonalitet: 
- Filtrer mellom nyheter fra Norge, Usa, Kina. (Fungerer kun i root /, ikke under hver kategori)
- Søkefelt hvor man kan søke etter hvilke som helst nøkkelord i en artikkel. (Søker kun i US news)
- Dynamisk "Input field validation" på Tittel, Beskrivelse og Innhold når man oppretter ny post under Create New.
- Mulighet til å laste opp et bildefil og få dette fremvist i et lite preview vindu. (Dessverre blir det ikke sendt til API selvom endepunkt er satt og fungerer med Postman. ImageURL fungerer fint.)
##

Hvis jeg hadde hatt mer tid ville jeg:
- Sjekket for feil ved innlastning av data fra hvert API, selvom et feiler ville fremdeles data fra det andre blitt vist.
- Gjort "category" på egenopprettede posts til query parameter slik at disse kunne blitt sortert og presentert i riktig kategori slik som posts fra newsAPI.org.
- Endret søkefunksjon til å filtrere posts som er hentet fra API og satt til App.js state, fremfor å gjøre nytt API-kall.
- Rettet opp i bug som gjør at Carousel ikke vises når man sletter eller oppdaterer en post.
- Implementert bruker innlogging med "authorization", f.eks med Google Oauth.
- Flyttet all state ut i Redux Store.
- Oppdatert "featured newsposts" i Carousel når man navigerer seg til en annen kategori eller språk.
- Gjort Carousel klikkbar slik at man kunne åpnet "featured newspost" i NewsPostDisplay.
##
