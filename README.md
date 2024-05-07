# LV 3 zadatak - HTML DOM i JavaScript u HTML-u

U ovoj vježbi zadatak je nadodati dinamičke fukncionalnosti u web stranicu koristeći znanja JavaScripta i HTML-a iz prethodnih vježbi. U repozitoriju se nalaze datoteke `index.html` i `style.css` u kojima se nalazi osnovni kostur stranice za web trgovinu. U datoteci `script.js` nalazi se početna točka za JavaScript koji ćete pisati. Potrebno je koristiti JavaScript i HTML DOM kako biste ostvarili funkcionalnosti.

## Kako funkcionira DOM

Opisom trenutnog koda možemo razumjeti kako funkcionira HTML DOM i dodavanje dinamike u web stranicu. **Ovi koraci su za vas već napravljeni u repozitoriju, ali ovaj opis služi da razumijete interakciju između JavaScripta, HTML-a i CSS-a.** U `index.html` postoji sljedeći HTML:

```html
    <h1>Web Shop</h1>
    (...)
    <div class="items-grid">
    </div>
```

`.items-grid` je trenutno potpuno prazan element kojeg ćemo popuniti elementima koristeći JavaScript.

Nakon što kreiramo datoteku `script.js`, potrebno je u `index.html` dodati referencu na tu datoteku. To se radi na sljedeći način:

```html
<body>
    (... ostatak body sadržaja ...)
    <script src="script.js"></script>
</body>
```

Dodavanjem `script` taga na dno `body` taga osiguramo da su elementi učitani u trenutku kad se skripta izvede.

Dalje, možemo urediti `script.js` kako bismo dodali sadržaj u `.items-grid` element. To se radi na sljedeći način:

```javascript
const itemsGrid = document.querySelector('.items-grid');
```

Kad JavaScript pokrećemo iz browsera, postoji ugrađena globalna varijabla `document` koja sadržava HTML DOM. DOM je standardiziran način na koji browser prevede sve HTML elemente web stranice u JavaScript objekte. DOM objekti na sebi imaju metode za pretraživanje, uređivanje i dodavanje elemenata. **Svaki HTML element možemo potpuno izmijeniti ili kreirati unutar JavaScripta.**

U gornjem kodu, pozivamo metodu `querySelector` na `document` objektu. `querySelector` je metoda koja prima CSS selektor i vraća prvi element koji odgovara tom selektoru. U ovom slučaju, vraća `.items-grid` element kojeg smo definirali u HTML-u. Sada možemo dodati sadržaj u `.items-grid` element:

```javascript
// 1
for (const item of items) {
    // 2
    let itemElement = document.createElement('div');
    itemElement.classList.add('item');
    // 3
    itemElement.innerHTML = `
        <img src="https://picsum.photos/200/300?random=${item.id}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>$${item.price}</p>
        <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
    `;
    // 4
    itemsGrid.appendChild(itemElement);
}
```

Evo što se događa u gornjem kodu:

1. `items` je polje objekata koji sadržavaju informacije o proizvodima. Ovo polje je definirano u `script.js` datoteci.
2. Kreiramo novi `div` element kojeg ćemo dodati u `.items-grid` element. `div` elementu dodajemo klasu `item` kako bismo ga mogli stilizirati u CSS-u.
3. Dodajemo sadržaj u `itemElement`. `innerHTML` je svojstvo koje sadržava HTML sadržaj elementa. U ovom slučaju, dodajemo slike, naslove, cijene i gumb za dodavanje u košaricu. `item.id` je jedinstveni identifikator proizvoda koji koristimo za dodavanje u košaricu.
4. Dodajemo `itemElement` u `.items-grid` element kojeg smo pronašli ranije.

Ovdje vidite primjer korištenja HTML DOM metoda za dohvaćanje, kreiranje, mijenjanje i dodavanja elemenata u HTML. **Na ovaj način rade sve web aplikacije**, bile programirane u JavaScriptu, Reactu, Angularu, Knockout.js-u ili bilo čemu drugom.

## Zadaci

1. [ ] 1. Dodati mogućnost dodavanja artikala u košaricu kad se klikne gumb za kupovinu artikla. Proširiti trenutni modalni ekran tako da se prikažu svi elementi u košarici. Dodati mogućnost brisanja artikala iz košarice i prikaz ukupne cijene košarice. Razmislite o tome kako prikazati slučaj kad se isti artikal u košaricu doda više puta.
2. [ ] 2. Dodati mogućnost "kupovine" artikala u košarici. Kupovina se odvija tako da se prikaže poruka da je kupovina uspješna i da se košarica isprazni. Obratite pozornost na korisničko iskustvo. Može li korisnik kupiti artikle u košarici ako je prazna? Što se treba u tom slučaju dogoditi?
3. [ ] 3. Osvježiti gumb za prikaz košarice tako da dinamički prikazuje broj artikala u košarici.
4. [ ] 4. Modificirati HTML, CSS i artikle po želji kako bi se dobio web shop po vašem ukusu. Urediti dizajn web shopa sa marginama, paddingom i ostalim CSS atributima kako bi stranica bolje izgledala.
5. [ ] 5. **Za 3 boda** dodati barem jednu dodatnu mogućnost u stranicu po uzoru na kod kojeg ste pisali u prijašnjoj vježbi. Npr. pretraga, sortiranje i sl. Budite kreativni!

## Resursi

HTML DOM:

- Uvod - JavaScript u HTML-u: https://www.w3schools.com/html/html_scripts.asp
- HTML DOM (Mozilla): https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
- HTML DOM (w3schools): https://www.w3schools.com/js/js_htmldom.asp
