document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const resetButton = document.getElementById("reset-button");
  
    // Links für die Türchen
    const doorLinks = [
      "https://www.instagram.com/dannygould89/reel/DC1M_2EocmN/",
      "https://instagram.com/reel/2",
      "https://instagram.com/reel/3",
      "https://instagram.com/reel/4",
      "https://instagram.com/reel/5",
      "https://instagram.com/reel/6",
      "https://instagram.com/reel/7",
      "https://instagram.com/reel/8",
      "https://instagram.com/reel/9",
      "https://instagram.com/reel/10",
      "https://instagram.com/reel/11",
      "https://instagram.com/reel/12",
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
      "https://instagram.com/reel/24"
    ];
  
    // Lade den Status der Türchen aus dem Local Storage
    const openedDoors = JSON.parse(localStorage.getItem("openedDoors")) || [];
  
    // Aktuelles Datum
    const today = new Date();
    const currentDay = today.getDate();
  
    // Türchen erstellen (randomisierte Reihenfolge)
    const doors = Array.from({ length: 24 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  
    doors.forEach((day) => {
      const door = document.createElement("div");
      door.className = "door";
      door.textContent = day;
  
      // Wenn es Türchen 24 ist, dann goldene Farbe und größere Größe
      if (day === 24) {
        door.classList.add("door-24"); // Spezielle Klasse für Türchen 24
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
        door.style.backgroundColor = day % 2 === 0 ? "#2e7d32" : "#d32f2f"; // Grün oder Rot
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
  
          alert(`Türchen ${day} geöffnet!`);
          window.open(doorLinks[day - 1], "_blank"); // Link in neuem Tab öffnen
        } else if (day > currentDay) {
          alert("Dieses Türchen ist noch gesperrt!");
        } else if (openedDoors.includes(day)) {
          window.open(doorLinks[day - 1], "_blank"); // Bereits geöffnet, Link trotzdem verfügbar
        }
      });
  
      calendar.appendChild(door);
    });
  
    // Reset-Button
    resetButton.addEventListener("click", () => {
      localStorage.removeItem("openedDoors");
      location.reload(); // Seite neu laden
    });
  });
  