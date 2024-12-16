document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const resetButton = document.getElementById("reset-button");
  
    // Links für die Türchen
    const doorLinks = [
      "https://www.otto.de/p/kangaroos-buegel-bikini-top-anita-im-angesagten-blockstreifendesign-509826288/#variationId=536205062",
      "https://www.instagram.com/lebzelterei_rosenheim/",
      "https://www.instagram.com/reel/DCChm9fN6y-/?igsh=MXVkbjlwbTNicnpldQ==",
      "https://www.instagram.com/reel/DB3lZHMRea9/?igsh=MXQ5eTJuYmN0aDd6dg==",
      "https://www.instagram.com/p/COEi3JTn22B/?igsh=Ymh5MjdoN3RvNWZ1",
      "https://raw.githubusercontent.com/Heli384/Adventskalender/c6eaad75671a1c06332d71ef46d2a740d8941e14/Nikolaus.jpg",
      "https://www.instagram.com/reel/COK6k3cIWyB/?igsh=MXd4Y3AxMXJiYnZ4MQ==",
      "https://www.instagram.com/reel/C-8o4Poyb3m/?igsh=MzJwc2hwd2l2a3I1",  //08. Dez. Lustiges Reel
      "https://www.instagram.com/reel/DCj7Cr7oxBt/?igsh=ejA3czJwcDg5YXk2",  //09. Dez. Lustiges Reel
      "https://www.instagram.com/reel/C_2VBTWMENI/?igsh=ZjUxbG5kYjBxZTI=",  //10. Dez Meditation u Ruhe -> Geschenk
      "https://www.instagram.com/reel/DCXO75YtM3y/?igsh=ZzE0cnBqZHRzbGw=",  //11. Dez Cats
      "https://www.champeimassage.com/behandlungen",   //12. Dez ->Geschenk
      "https://github.com/Heli384/Adventskalender/blob/main/haserl.jpg?raw=true",  //13. Dez Lieblingsmensch -> Geschenk
      "https://www.instagram.com/reel/DDPbzHLpiou/?igsh=ZnJqc3pmdjU1OHRk",  //14. Dez
      "https://www.instagram.com/reel/DDW7jKrIx1T/?igsh=MXBudjJzanQ0aHdvcQ==",  //15. Dez
      "https://www.instagram.com/reel/DCjfFUiSQMD/?igsh=MTE2N25iZm15NTJyNQ==",  //16. Dez
      "https://instagram.com/reel/17",
      "https://instagram.com/reel/18",
      "https://instagram.com/reel/19",
      "https://instagram.com/reel/20",
      "https://instagram.com/reel/21",
      "https://instagram.com/reel/22",
      "https://instagram.com/reel/23",
      "https://www.therme-erding.de/"
    ];
  
    // Lade den Status der Türchen aus dem Local Storage
    const openedDoors = JSON.parse(localStorage.getItem("openedDoors")) || [];
  
    // Aktuelles Datum
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // Monate in JavaScript sind 0-indexiert, daher +1
  
    // Türchen erstellen (randomisierte Reihenfolge)
    const doors = Array.from({ length: 24 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  
    // Wenn der Monat nicht Dezember ist, alle Türchen sperren
    if (currentMonth !== 12) {
      doors.forEach((day) => {
        const door = document.createElement("div");
        door.className = "door locked"; // Türchen wird gesperrt
        door.textContent = day;
  
        // Türchen 24 speziell behandeln
        if (day === 24) {
          door.classList.add("door-24");
          door.style.backgroundColor = "#d4af37"; // Gold für Türchen 24
        } else {
          door.style.backgroundColor = day % 2 === 0 ? "#2e7d32" : "#d32f2f"; // Grün oder Rot
        }
  
        calendar.appendChild(door);
      });
    } else {
      // Türchen erstellen und zugänglich machen, wenn Dezember ist
      doors.forEach((day) => {
        const door = document.createElement("div");
        door.className = "door";
        door.textContent = day;
  
        // Wenn es Türchen 24 ist, dann goldene Farbe und größere Größe
        if (day === 24) {
          door.classList.add("door-24");
          door.style.backgroundColor = "#d4af37"; // Gold für Türchen 24
        } else if (openedDoors.includes(day)) {
          door.classList.add("opened");
          door.style.backgroundColor = "#d3d3d3"; // Ausgegraute Fläche
          door.style.color = "#7a7a7a"; // Graue Schrift
          door.style.cursor = "not-allowed"; // Sperre das Türchen für nochmaliges Öffnen
        } else if (day > currentDay) {
          door.classList.add("locked");
          door.style.backgroundColor = "#b71c1c"; // Rot für gesperrte Türchen
          door.style.color = "white";
        } else {
          door.style.backgroundColor = day % 2 === 0 ? "#2e7d32" : "#2e7d32"; // Grün oder Rot
          door.style.color = "white";
        }
  
        // Klick-Event für Türchen
        door.addEventListener("click", () => {
          if (day <= currentDay && !openedDoors.includes(day)) {
            openedDoors.push(day);
            localStorage.setItem("openedDoors", JSON.stringify(openedDoors));
  
            // Sofortiges Ausgrauen des Türchens
            door.classList.add("opened");
            door.style.backgroundColor = "#d3d3d3"; // Ausgegraute Fläche
            door.style.color = "#7a7a7a"; // Graue Schrift
            door.style.cursor = "not-allowed"; // Sperre das Türchen für nochmaliges Öffnen
  
            //alert(`Türchen ${day} geöffnet!`);
            window.open(doorLinks[day - 1], "_blank"); // Link in neuem Tab öffnen
          } else if (day > currentDay) {
            alert("Dieses Türchen ist noch gesperrt!");
          } else if (openedDoors.includes(day)) {
            window.open(doorLinks[day - 1], "_blank"); // Bereits geöffnet, Link trotzdem verfügbar
          }
        });
  
        calendar.appendChild(door);
      });
    }
  
    // Reset-Button
    resetButton.addEventListener("click", () => {
      localStorage.removeItem("openedDoors");
      location.reload(); // Seite neu laden
    });
  });
  