// Zugriff auf die HTML-Elemente
const output = document.getElementById("output");
const choices = document.getElementById("choices");

// Spielzustand
let spielerName = "";
let spielerGetraenk = null;
let spielerSuess = null;
let spielerSnack = null;

// Zusatzstate für Szene 3
let falscheVersucheSzene3 = 0;
let gurkeGeraten = false; // signalisiert, dass in Szene 3 "Gurke" korrekt gewählt wurde

// Hilfsfunktion zum Text anzeigen (append)
function schreibe(text) {
  output.innerHTML += `<p>${text}</p>`;
  output.scrollTop = output.scrollHeight;
}

// Ein einziges Feedback-Feld unter dem aktuellen Szenentext (kein Spam)
function setzeFeedback(text) {
  let box = document.getElementById("quizFeedback");
  if (!box) {
    box = document.createElement("div");
    box.id = "quizFeedback";
    box.style.marginTop = "8px";
    output.appendChild(box);
  }
  box.innerHTML = `<p>${text}</p>`;
  output.scrollTop = output.scrollHeight;
}

// Auswahlmöglichkeit anzeigen
function zeigeOptionen(optionen) {
  choices.innerHTML = ""; // vorherige Buttons löschen
  optionen.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = opt.handler;
    choices.appendChild(btn);
  });
}

function szene1() {
  output.innerHTML = ""; // Ausgabe leeren
  schreibe("Hi, mein Name ist Pferdinant – aber meine Freunde nennen mich Pferdi.");
  schreibe("Wie heißt du denn?");

  choices.innerHTML = ""; // auch Buttons leeren
  const input = document.createElement("input");
  input.placeholder = "Dein Name...";
  const btn = document.createElement("button");
  btn.textContent = "Weiter";
  btn.onclick = () => {
    spielerName = input.value.trim();
    if (spielerName === "") return;
    szene2();
  };
  choices.appendChild(input);
  choices.appendChild(btn);
}

function szene2() {
  output.innerHTML = "";
  schreibe(`Schön, dich kennenzulernen, ${spielerName}!`);
  schreibe("Hast du Lust, mich auf ein Abenteuer zu begleiten?");

  zeigeOptionen([
    {
      text: "Ja, klar!",
      handler: () => {
        output.innerHTML = "";
        schreibe("Oh toll, wir werden sicher viel Spaß haben!");
        schreibe("Aber lass uns zuerst was essen. Ich hab Lust auf was Grünes. Kannst du erraten, was es ist?");
        zeigeOptionen([
          { text: "Ja klar, ich versuch’s!", handler: szene3 }
        ]);
      }
    },
    {
      text: "Nee, lieber nicht...",
      handler: () => {
        output.innerHTML = "";
        schreibe("Schade, dann vielleicht ein anderes Mal.");
        choices.innerHTML = "";
      }
    }
  ]);
}

function szene3() {
  output.innerHTML = "";
  falscheVersucheSzene3 = 0;       // Reset bei Eintritt in die Szene
  gurkeGeraten = false;            // Reset der Erfolgsmeldung
  schreibe("Was denkst du, worauf ich Lust habe?");

  const optionen = [
    { text: "Gras",    correct: false },
    { text: "Äpfel",   correct: false },
    { text: "Gurken",  correct: true  },
    { text: "Heu",     correct: false }
  ];

  zeigeOptionen(optionen.map(opt => ({
    text: opt.text,
    handler: () => {
      if (opt.correct) {
        gurkeGeraten = true; // merken für die nächste Szene
        output.innerHTML = "";
        // Hier lassen wir die alte „Jaaaa, ich liebe Gurken!“-Zeile weg,
        // weil du wolltest, dass die Anerkennung in Szene 4 erfolgt.
        szene4();
      } else {
        falscheVersucheSzene3 += 1;
        if (falscheVersucheSzene3 === 1) {
          setzeFeedback("Nee nee, versuch's nochmal!");
        } else if (falscheVersucheSzene3 === 2) {
          setzeFeedback("Nein, das war's auch nicht! Versuch's doch nochmal");
        } else {
          setzeFeedback("Das auch nicht, aber jetzt bleibt ja nur noch Eins übrig!");
        }
      }
    }
  })));
}

function szene4() {
  output.innerHTML = "";

  if (gurkeGeraten) {
    schreibe("Yeah! Gurken! 🥒");
  }
  schreibe("Wollen wir mit dem Auto fahren oder lieber laufen?");
  
  zeigeOptionen([
    {
      text: "Auto",
      handler: () => {
        output.innerHTML = "";
        schreibe(`Du bist ein richtiger Scherzkeks, ${spielerName}.`);
        schreibe("Hast du schon mal ein PFERD(i) in einem Auto gesehen?");
        schreibe("Außerdem hab ich gar keinen Führerschein! Hajde, wir laufen!");
        zeigeOptionen([
          { text: "Weiter zum Supermarkt", handler: szene5 }
        ]);
      }
    },
    {
      text: "Laufen",
      handler: () => {
        output.innerHTML = "";
        schreibe(`Keine Sorge, ${spielerName}, der Supermarkt ist gleich um die Ecke.`);
        schreibe("Da vorne ist er auch schon.");
        zeigeOptionen([
          { text: "Okay, los geht’s!", handler: szene5 }
        ]);
      }
    }
  ]);
}

function szene5() {
  output.innerHTML = "";
  schreibe("Du betrittst den Supermarkt und begibst dich auf die Gurkenjagd...");
  zeigeOptionen([
    { text: "Weiter zur Getränkeabteilung", handler: szene5a }
  ]);
}

function szene5a() {
  output.innerHTML = "";
  schreibe("🧃 Erste Station: Getränke");
  zeigeOptionen([
    { text: "Coke",             handler: () => { spielerGetraenk = "Coke";        szene5b(); } },
    { text: "Eistee",           handler: () => { spielerGetraenk = "Eistee";      szene5b(); } },
    { text: "Energydrink",      handler: () => { spielerGetraenk = "Energydrink"; szene5b(); } },
    { text: "Nichts mitnehmen", handler: () => { spielerGetraenk = null;          szene5b(); } }
  ]);
}

function szene5b() {
  output.innerHTML = "";
  schreibe("🍬 Zweite Station: Süßkram");
  zeigeOptionen([
    { text: "Schokoriegel",     handler: () => { spielerSuess = "Schokoriegel";  szene5c(); } },
    { text: "Lakritze",         handler: () => { spielerSuess = "Lakritze";      szene5c(); } },
    { text: "Gummibärchen",     handler: () => { spielerSuess = "Gummibärchen";  szene5c(); } },
    { text: "Nichts mitnehmen", handler: () => { spielerSuess = null;            szene5c(); } }
  ]);
}

function szene5c() {
  output.innerHTML = "";
  schreibe("🥨 Dritte Station: Snacks");
  zeigeOptionen([
    { text: "Chips",            handler: () => { spielerSnack = "Chips";        szene6(); } },
    { text: "Salzstangen",      handler: () => { spielerSnack = "Salzstangen";  szene6(); } },
    { text: "Erdnussflips",     handler: () => { spielerSnack = "Erdnussflips"; szene6(); } },
    { text: "Nichts mitnehmen", handler: () => { spielerSnack = null;           szene6(); } }
  ]);
}

function szene6() {
  output.innerHTML = "";
  schreibe("Du erreichst das Gemüse-Regal...");
  schreibe("In der Mitte liegt sie... leuchtend grün, saftig, knackig:");
  schreibe("🥒  🥒  🥒  **DIE GURKE**  🥒  🥒  🥒");

  zeigeOptionen([
    {
      text: "Ich greife zu!",
      handler: () => {
        output.innerHTML = "";
        schreibe("Du greifst zu... und plötzlich hörst du Geräusche aus dem Kassenbereich.");
        schreibe("Was machst du?");
        zeigeOptionen([
          { text: "Verstecken",          handler: () => szene7a() },
          { text: "Um die Ecke schauen", handler: () => szene7b() }
        ]);
      }
    }
  ]);
}

function szene7a() {
  output.innerHTML = "";
  schreibe("🕵️ Du duckst dich hinter eine Kiste mit Avocados.");
  schreibe("Der Räuber steht an der Kasse und stopft Geld in eine Tüte.");
  schreibe("Du spürst, wie dein Herz klopft...");

  let inventarText = "Du hast mitgebracht:\n";
  if (spielerGetraenk) inventarText += "🥤 Getränk: " + spielerGetraenk + "\n";
  if (spielerSuess)   inventarText += "🍬 Süßigkeit: " + spielerSuess + "\n";
  if (spielerSnack)   inventarText += "🥨 Snack: " + spielerSnack + "\n";
  if (!spielerGetraenk && !spielerSuess && !spielerSnack) inventarText += "Nichts! Nur deine Nerven.";

  schreibe(inventarText);

  zeigeOptionen([
    {
      text: "Ich bin bereit, ein Item zu wählen!",
      handler: () => {
        const optionen = [];
        if (spielerGetraenk) optionen.push({ text: "🥤 " + spielerGetraenk, handler: () => szene7aPower(spielerGetraenk) });
        if (spielerSuess)    optionen.push({ text: "🍬 " + spielerSuess,    handler: () => szene7aPower(spielerSuess) });
        if (spielerSnack)    optionen.push({ text: "🥨 " + spielerSnack,    handler: () => szene7aPower(spielerSnack) });

        if (optionen.length === 0) {
          output.innerHTML = "";
          schreibe("Dir bleibt nichts übrig – du stürmst einfach los!");
          zeigeOptionen([{ text: "Losstürmen!", handler: () => szene7b() }]);
        } else {
          output.innerHTML = "";
          schreibe("Welches Item willst du nutzen, um Mut zu tanken?");
          zeigeOptionen(optionen);
        }
      }
    }
  ]);
}

function szene7aPower(itemName) {
  output.innerHTML = "";
  schreibe("Du gönnst dir " + itemName + "...");
  schreibe("💥 Plötzlich fühlst du dich stark, energiegeladen und mutig!");
  schreibe("Die Gurke in deiner Hand wirkt jetzt wie ein Schwert.");

  zeigeOptionen([
    { text: "Los geht's!", handler: () => szene7b() }
  ]);
}

function szene7b() {
  output.innerHTML = "";
  schreibe("🏃‍♂️ Mit der Gurke wie ein Schwert rennst du los.");
  schreibe("„Hände hoch und stehen bleiben!“ rufst du.");
  schreibe("Der Räuber dreht sich erschrocken um – und ZACK, die Gurke trifft ihn an der Schulter!");
  schreibe("Er rutscht auf einer Gummibärchentüte aus und stolpert Richtung Ausgang...");

  zeigeOptionen([
    { text: "Schnell hinterher! 🏃‍♀️", handler: () => { szene7bFortsetzung(); } }
  ]);
}

function szene7bFortsetzung() {
  output.innerHTML = "";
  schreibe("🚪 Du rennst hinterher – raus auf den Parkplatz...");
  schreibe("Und da sitzt er schon...");
  schreibe("🐴 **PFERDI.**");
  schreibe("Mit stoischer Ruhe – **AUF DEM RÄUBER.**");
  schreibe("„Hat ja lang genug gedauert“, sagt er grinsend.");

  schreibe("🚓 Die Polizei trifft ein – die Kassiererin hatte sie bereits gerufen.");
  schreibe("Diese ruft: „Danke ihr Helden – der Einkauf geht heute auf uns!“");
  schreibe("🥒 Pferdi schmatzt bereits zufrieden auf seiner Gurke.");
  schreibe("Du und Pferdi schauen euch an... und wisst: Das war erst der Anfang...");

  zeigeOptionen([
    { text: "Weiter zur Finalszene 📰", handler: () => szene8() }
  ]);
}

function szene8() {
  output.innerHTML = "";
  schreibe("🛌 Am nächsten Morgen...");

  zeigeOptionen([
    { text: "Augen auf – was steht in der Zeitung?", handler: () => szene8Teil2() }
  ]);
}

function szene8Teil2() {
  output.innerHTML = "";
  schreibe("Du wachst auf, reibst dir die Augen – und überlegst, ob das Alles ein Traum war. Doch dann siehst Du sie...");
  schreibe("🗞️ Die Titelseite der Lokalzeitung:");

  zeigeOptionen([
    { text: "Weiterlesen...", handler: () => szene8Teil3() }
  ]);
}

function szene8Teil3() {
  output.innerHTML = "";
  schreibe("🚨 ***PFERD UND UNBEKANNTER HELD STOPPEN RÄUBER MIT GURKE – ECHTE HELDEN MIT BISS!*** 🚨");
  schreibe("\nDarunter ein Foto von dir und Pferdi.");

  const bild = document.createElement("img");
  bild.src = "img/Pferdi-Newspaper.png";
  bild.alt = "Zeitung mit Pferdi";
  bild.style.width = "100%";
  bild.style.maxWidth = "600px";
  bild.style.marginTop = "20px";
  output.appendChild(bild);

  schreibe("Er trägt Sonnenbrille 😎, du hältst die Gurke wie ein Schwert 🥒.");
  schreibe("Die Bildunterschrift: „Heldenduo des Monats – der Mut war knackig.“");
  schreibe("\n🌍 Jetzt seid ihr Weltbekannt.");
  schreibe("Und du weißt: Das war erst der Anfang eurer Abenteuer...");

  zeigeOptionen([
    { text: "🎮 Nochmal spielen", handler: () => location.reload() },
    { text: "🚪 Spiel beenden", handler: () => spielBeenden() }
  ]);
}

function spielBeenden() {
  output.innerHTML = "";
  schreibe("Bis bald, Held! 🐴🥒✨");
  choices.innerHTML = "";
}

window.onload = () => {
  szene1();
};
