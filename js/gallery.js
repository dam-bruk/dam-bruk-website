// document.addEventListener("DOMContentLoaded", function () {
//   const yearList = document.getElementById("year-list");
//   const monthGallery = document.getElementById("month-gallery");
//   const monthDisplay = document.getElementById("month-display");

//   let data = {};
//   let currentYear = null;
//   let viewMode = 'years';

//   function loadData() {
//     fetch("./data/projects.json")
//       .then((response) => response.json())
//       .then((jsonData) => {
//         data = jsonData;
//         generateYearList();
//       })
//       .catch((error) => console.error("Błąd ładowania danych:\n", error));
//   }

//   function loadMonthGallery(year, month) {
//     monthGallery.innerHTML = "";
//     monthDisplay.textContent = `${getMonthName(month)} ${year}`;
//     if (data[year] && data[year][month]) {
//       data[year][month].forEach((fileName) => {
//         let img = document.createElement("img");
//         img.src = `images/${year}/${month}/${fileName}`;
//         img.alt = "Zdjęcie projektu";
//         monthGallery.appendChild(img);
//       });
//     } else {
//       monthGallery.innerHTML = "<p>Brak zdjęć w tym miesiącu.</p>";
//     }
//   }

//   function generateYearList() {
//     yearList.innerHTML = ""; // Wyczyszczenie listy lat
//     const backButton = document.createElement("button");
//     backButton.textContent = "Powrót";
//     backButton.className = "backButton";
//     backButton.style.display = "none"; // Ukrywa przycisk na początku
//     backButton.onclick = () => {
//       monthDisplay.textContent = "";
//       monthGallery.innerHTML = "";
//       generateYearList();
//     };
//     yearList.appendChild(backButton);

//     Object.keys(data).forEach((year) => {
//       let button = document.createElement("button");
//       button.textContent = year;
//       button.onclick = () => {
//         currentYear = year;
//         generateMonthList(year);
//       };
//       yearList.appendChild(button);
//     });
//   }

//   function generateMonthList(year) {
//     yearList.innerHTML = ""; // Wyczyszczenie listy miesięcy
//     const backButton = document.createElement("button");
//     backButton.textContent = "Powrót";
//     backButton.className = "backButton";
//     backButton.onclick = () => {
//       monthDisplay.textContent = "";
//       monthGallery.innerHTML = "";
//       generateYearList();
//     };
//     yearList.appendChild(backButton);

//     const months = data[year];
//     Object.keys(months).forEach((month) => {
//       let button = document.createElement("button");
//       button.textContent = `${getMonthName(month)} ${year}`;
//       button.onclick = () => loadMonthGallery(year, month);
//       yearList.appendChild(button);
//     });

//     const monthButtons = Array.from(
//       yearList.querySelectorAll("button:not(.backButton)")
//     );
//     monthButtons.forEach((button) => {
//       button.addEventListener("click", () => {
//         monthButtons.forEach((btn) => (btn.style.display = "none"));
//       });
//     });
//   }

//   function getMonthName(monthNumber) {
//     const months = [
//       "Styczeń",
//       "Luty",
//       "Marzec",
//       "Kwiecień",
//       "Maj",
//       "Czerwiec",
//       "Lipiec",
//       "Sierpień",
//       "Wrzesień",
//       "Październik",
//       "Listopad",
//       "Grudzień",
//     ];
//     const index = parseInt(monthNumber, 10) - 1;
//     if (index >= 0 && index < months.length) {
//       return months[index];
//     } else {
//       throw new Error("Numer miesiąca musi być z zakresu 01-12");
//     }
//   }

//   loadData();
// });

document.addEventListener("DOMContentLoaded", function () {
  const yearList = document.getElementById("year-list");
  const monthGallery = document.getElementById("month-gallery");
  const monthDisplay = document.getElementById("month-display");

  let data = {};
  let currentYear = null;
  let viewMode = "years"; // 'years', 'months', 'gallery'

  function loadData() {
    fetch("./data/projects.json")
      .then((response) => response.json())
      .then((jsonData) => {
        data = jsonData;
        generateYearList();
      })
      .catch((error) => console.error("Błąd ładowania danych:\n", error));
  }

  function loadMonthGallery(year, month) {
    monthGallery.innerHTML = "";
    monthDisplay.textContent = `${getMonthName(month)} ${year}`;
    if (data[year] && data[year][month]) {
      data[year][month].forEach((fileName) => {
        let img = document.createElement("img");
        img.src = `images/${year}/${month}/${fileName}`;
        img.alt = "Zdjęcie projektu";
        monthGallery.appendChild(img);
      });
    } else {
      monthGallery.innerHTML = "<p>Brak zdjęć w tym miesiącu.</p>";
    }
  }

  function generateYearList() {
    yearList.innerHTML = ""; // Wyczyszczenie listy lat
    monthDisplay.textContent = ""; // Wyczyszczenie tekstu w monthDisplay
    monthGallery.innerHTML = ""; // Wyczyszczenie galerii zdjęć

    const backButton = createBackButton();
    backButton.style.display = "none"; // Ukrywa przycisk na początku
    yearList.appendChild(backButton);

    Object.keys(data).forEach((year) => {
      let button = document.createElement("button");
      button.textContent = year;
      button.onclick = () => {
        currentYear = year;
        viewMode = "months"; // Zmieniamy widok na miesiące
        generateMonthList(year);
      };
      yearList.appendChild(button);
    });
  }

  function generateMonthList(year) {
    yearList.innerHTML = ""; // Wyczyszczenie listy miesięcy
    monthDisplay.textContent = ""; // Wyczyszczenie tekstu w monthDisplay
    monthGallery.innerHTML = ""; // Wyczyszczenie galerii zdjęć

    const backButton = createBackButton();
    yearList.appendChild(backButton);

    const months = data[year];
    Object.keys(months).forEach((month) => {
      let button = document.createElement("button");
      button.textContent = getMonthName(month);
      button.onclick = () => {
        loadMonthGallery(year, month);
        viewMode = "gallery"; // Zmieniamy widok na galerię
        // Ukryj wszystkie miesiące poza przyciskiem powrotu
        const monthButtons = Array.from(
          yearList.querySelectorAll("button:not(.backButton)")
        );
        monthButtons.forEach((btn) => (btn.style.display = "none")); // Ukrywa wszystkie przyciski miesięcy
      };
      yearList.appendChild(button);
    });
  }

  function createBackButton() {
    const backButton = document.createElement("button");
    backButton.textContent = "Powrót";
    backButton.className = "backButton";
    backButton.onclick = () => {
      if (viewMode === "gallery") {
        viewMode = "months"; // Zmieniamy widok na miesiące
        generateMonthList(currentYear); // Powrót do listy miesięcy
      } else if (viewMode === "months") {
        viewMode = "years"; // Zmieniamy widok na lata
        generateYearList(); // Powrót do listy lat
      }
      monthDisplay.textContent = ""; // Wyczyszczenie tekstu w monthDisplay
      monthGallery.innerHTML = ""; // Wyczyszczenie galerii zdjęć
    };
    return backButton;
  }

  function getMonthName(monthNumber) {
    const months = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    const index = parseInt(monthNumber, 10) - 1;
    if (index >= 0 && index < months.length) {
      return months[index];
    } else {
      throw new Error("Numer miesiąca musi być z zakresu 01-12");
    }
  }

  loadData();
});
