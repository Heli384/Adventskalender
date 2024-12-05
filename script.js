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
      "https://instagram.com/reel/6",
      "https://instagram.com/reel/7",
      "https://instagram.com/reel/8",
      "https://instagram.com/reel/9",
      "https://instagram.com/reel/10",
      "https://instagram.com/reel/11",
      "https://www.champeimassage.com/behandlungen",
      "https://instagram.com/reel/13",
      "https://instagram.com/reel/14",
      "https://instagram.com/reel/15",
      "https://instagram.com/reel/16",
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
  