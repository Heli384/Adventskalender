document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const resetButton = document.getElementById("reset-button");
  
    // Farben für die Türchen
    const colors = ["#d32f2f", "#388e3c", "#d4af37"]; // Rot, Grün, Gold
  
    // Links für die Türchen
    const links = [
      "https://www.instagram.com/dannygould89/reel/DC1M_2EocmN/",
      "https://www.instagram.com/reel/Link2",
      "https://www.instagram.com/reel/Link3",
      // ... bis Link 24
      "https://www.instagram.com/reel/Link24"
    ];
  
    // Speicher für geöffnete Türchen
    const openedDoors = JSON.parse(localStorage.getItem("openedDoors")) || [];
  
    // Funktion, um die Türchen zufällig anzuordnen
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    // Zufällige Reihenfolge für die Türchen erstellen
    const doorIndices = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]
    shuffleArray(doorIndices);
  
    // Türchen dynamisch erstellen
    doorIndices.forEach((index, i) => {
      const door = document.createElement("div");
      door.classList.add("door");
      door.setAttribute("data-link", links[index]);
      door.textContent = index + 1;
  
      // Zufällige Farbe
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      door.style.backgroundColor = randomColor;
  
      // Türchen 24 ist etwas größer
      if (index === 23) {
        door.style.width = "100px";
        door.style.height = "100px";
        door.style.fontSize = "20px";
        door.style.fontWeight = "bold";
      }
  
      // Markiere geöffnete Türchen
      if (openedDoors.includes(index)) {
        door.classList.add("opened");
        door.style.backgroundColor = "#e0e0e0"; // Grau
        door.style.color = "#a0a0a0"; // Graue Schrift
      }
  
      // Event Listener für Türchen
      door.addEventListener("click", () => {
        const link = door.getAttribute("data-link");
  
        // Wenn das Türchen noch nicht geöffnet wurde
        if (!openedDoors.includes(index)) {
          openedDoors.push(index);
          localStorage.setItem("openedDoors", JSON.stringify(openedDoors));
          door.classList.add("opened");
          door.style.backgroundColor = "#e0e0e0"; // Grau
          door.style.color = "#a0a0a0"; // Graue Schrift
        }
  
        // Weiterleitung zum Link
        if (link) {
          window.open(link, "_blank");
        }
      });
  
      calendar.appendChild(door);
    });
  
    // Reset-Button Funktion
    resetButton.addEventListener("click", () => {
      resetCalendar();
    });
  
    function resetCalendar() {
      localStorage.removeItem("openedDoors");
      location.href = location.href + "?reset=" + new Date().getTime(); // Seite neu laden, Cache umgehen
    }
  });
  