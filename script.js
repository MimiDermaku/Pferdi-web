// Zugriff auf die HTML-Elemente
const output = document.getElementById("output");
const choices = document.getElementById("choices");

// Spielzustand
let spielerName = "";
let spielerGetraenk = null;
let spielerSuess = null;
let spielerSnack = null;

// Hilfsfunktion zum Text anzeigen
function schreibe(text) {
  output.innerHTML += `<p>${text}</p>`;
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
            schreibe("Oh toll, wir werden sicher viel Spaß haben!");
            schreibe("Aber lass uns zuerst was essen. Ich hab Lust auf was Grünes. Kannst du erraten, was es ist?");
            zeigeOptionen([
                {
                  text: "Ja klar, ich versuch’s!",
                  handler: szene3
                }
              ]);
            }
          },
          {
            text: "Nee, lieber nicht...",
            handler: () => {
              schreibe("Schade, dann vielleicht ein anderes Mal.");
              choices.innerHTML = "";
            }
          }
        ]);
  }

  function szene3() {
    output.innerHTML = "";
    schreibe("Was denkst du, worauf ich Lust habe? Wähle eine Zahl:");
  
    const optionen = [
      { zahl: 1, text: "Gras" },
      { zahl: 2, text: "Äpfel" },
      { zahl: 3, text: "Gurken" },
      { zahl: 4, text: "Heu" }
    ];
  
    zeigeOptionen(optionen.map(opt => ({
      text: `${opt.zahl}: ${opt.text}`,
      handler: () => {
        if (opt.zahl === 3) {
          schreibe("Jaaaa, ich liebe Gurken! 🥒");
          schreibe("Lass uns doch zum Supermarkt gehen...");
          schreibe("Jaaaa, ich liebe Gurken! 🥒");
schreibe("Lass uns doch zum Supermarkt gehen...");
szene4(); // ← HIER hinzufügen
        } else {
          schreibe("Nee nee, versuch's nochmal!");
        }
      }
    })));
  }

  function szene4() {
    output.innerHTML = "";
    schreibe("Wollen wir mit dem Auto fahren oder lieber laufen?");
    
    zeigeOptionen([
      {
        text: "1: Auto",
        handler: () => {
          output.innerHTML = ""; // alten Text weg
          schreibe(`Du bist ein richtiger Scherzkeks, ${spielerName}.`);
          schreibe("Hast du schon mal ein PFERD(i) in einem Auto gesehen?");
          schreibe("Außerdem hab ich gar keinen Führerschein! Hajde, wir laufen!");
          
          // Nächste Szene erst nach Klick
          zeigeOptionen([
            { text: "Weiter zum Supermarkt", handler: szene5 }
          ]);
        }
      },
      {
        text: "2: Laufen",
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
          { text: "1: Coke", handler: () => { spielerGetraenk = "Coke"; szene5b(); } },
          { text: "2: Eistee", handler: () => { spielerGetraenk = "Eistee"; szene5b(); } },
          { text: "3: Energydrink", handler: () => { spielerGetraenk = "Energydrink"; szene5b(); } },
          { text: "4: Nichts mitnehmen", handler: () => { spielerGetraenk = null; szene5b(); } }
        ]);
      }
  
      function szene5b() {
        output.innerHTML = "";
        schreibe("🍬 Zweite Station: Süßkram");
        zeigeOptionen([
          { text: "1: Schokoriegel", handler: () => { spielerSuess = "Schokoriegel"; szene5c(); } },
          { text: "2: Lakritze", handler: () => { spielerSuess = "Lakritze"; szene5c(); } },
          { text: "3: Gummibärchen", handler: () => { spielerSuess = "Gummibärchen"; szene5c(); } },
          { text: "4: Nichts mitnehmen", handler: () => { spielerSuess = null; szene5c(); } }
        ]);
      }
      
  
      function szene5c() {
        output.innerHTML = "";
        schreibe("🥨 Dritte Station: Snacks");
        zeigeOptionen([
          { text: "1: Chips", handler: () => { spielerSnack = "Chips"; szene6(); } },
          { text: "2: Salzstangen", handler: () => { spielerSnack = "Salzstangen"; szene6(); } },
          { text: "3: Erdnussflips", handler: () => { spielerSnack = "Erdnussflips"; szene6(); } },
          { text: "4: Nichts mitnehmen", handler: () => { spielerSnack = null; szene6(); } }
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
                { text: "1: Verstecken", handler: () => szene7a() },
                { text: "2: Um die Ecke schauen", handler: () => szene7b() }
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
        if (spielerSuess) inventarText += "🍬 Süßigkeit: " + spielerSuess + "\n";
        if (spielerSnack) inventarText += "🥨 Snack: " + spielerSnack + "\n";
        if (!spielerGetraenk && !spielerSuess && !spielerSnack) inventarText += "Nichts! Nur deine Nerven.";
      
        schreibe(inventarText);
      
        // Auswahl-Buttons erst zeigen, wenn Text fertig ist
        zeigeOptionen([
          {
            text: "Ich bin bereit, ein Item zu wählen!",
            handler: () => {
              const optionen = [];
      
              if (spielerGetraenk) optionen.push({ text: "🥤 " + spielerGetraenk, handler: () => szene7aPower(spielerGetraenk) });
              if (spielerSuess) optionen.push({ text: "🍬 " + spielerSuess, handler: () => szene7aPower(spielerSuess) });
              if (spielerSnack) optionen.push({ text: "🥨 " + spielerSnack, handler: () => szene7aPower(spielerSnack) });
      
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
          {
            text: "Schnell hinterher! 🏃‍♀️",
            handler: () => {
              szene7bFortsetzung();
            }
          }
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
          {
            text: "Augen auf – was steht in der Zeitung?",
            handler: () => szene8Teil2()
          }
        ]);
      }
      
      function szene8Teil2() {
        output.innerHTML = "";
        schreibe("Du wachst auf, reibst dir die Augen – und überlegst, ob das Alles ein Traum war. Doch dann siehst Du sie...");
        schreibe("🗞️ Die Titelseite der Lokalzeitung:");
      
        zeigeOptionen([
          {
            text: "Weiterlesen...",
            handler: () => szene8Teil3()
          }
        ]);
      }
      
      function szene8Teil3() {
        output.innerHTML = "";
        schreibe("🚨 ***PFERD UND UNBEKANNTER HELD STOPPEN RÄUBER MIT GURKE – ECHTE HELDEN MIT BISS!*** 🚨");
        schreibe("\nDarunter ein Foto von dir und Pferdi.");
         const bild = document.createElement("img");
  bild.src = "img/Pferdi-Newspaper.png"; // <– Pfad zu deinem Bild
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