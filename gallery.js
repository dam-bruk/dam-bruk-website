document.addEventListener("DOMContentLoaded", function () {
  const yearList = document.getElementById("year-list");
  const monthGallery = document.getElementById("month-gallery");
  const monthDisplay = document.getElementById("month-display");

  let data = {};
  let currentYear = null;
  let viewMode = "years";

  function loadData() {
    fetch("./data/gallery.json")
      .then((response) => response.json())
      .then((jsonData) => {
        data = jsonData;
        generateYearList();
      })
      .catch((error) => console.error("Błąd ładowania danych:\n", error));
  }

  function loadMonthGallery(year, month) {
    monthGallery.innerHTML = "";
    monthDisplay.textContent = `${getMonthNameMany(month)} ${year}`;
    if (data[year] && data[year][month]) {
      data[year][month].forEach((fileName) => {
        let img = document.createElement("img");
        img.src = `images/gallery/${year}/${month}/${fileName}`;
        img.alt = "Zdjęcie projektu";
        monthGallery.appendChild(img);
      });
    } else {
      monthGallery.innerHTML = "<p>Brak zdjęć w tym miesiącu.</p>";
    }
  }

  function generateYearList() {
    yearList.innerHTML = "";
    monthDisplay.textContent = "Zdjęcia zostaną wyświetlone tutaj";
    monthGallery.innerHTML = "";

    const backButton = createBackButton();
    backButton.style.display = "none";
    yearList.appendChild(backButton);
    const newLine = document.createElement("br");
    yearList.appendChild(newLine);

    Object.keys(data).forEach((year) => {
      let button2 = document.createElement("a");
      button2.href = "#";
      button2.textContent = year;
      button2.onclick = () => {
        currentYear = year;
        viewMode = "months";
        generateMonthList(year);
      };
      yearList.appendChild(button2);
    });
  }

  function generateMonthList(year) {
    yearList.innerHTML = "";
    monthDisplay.textContent = "Zdjęcia zostaną wyświetlone tutaj";
    monthGallery.innerHTML = "";

    const backButton = createBackButton();
    const newLine = document.createElement("br");
    yearList.appendChild(backButton);
    yearList.appendChild(newLine);

    const months = data[year];
    Object.keys(months).forEach((month) => {
      let button2 = document.createElement("a");
      button2.textContent = getMonthNameMany(month) + " " + year;
      button2.onclick = () => {
        loadMonthGallery(year, month);
        viewMode = "gallery";
        const monthButtons = Array.from(
          yearList.querySelectorAll("a:not(.backButton)")
        );
        monthButtons.forEach((btn) => (btn.style.display = "none"));
        window.setTimeout(function () {
          window.location.href = "#photos";
        }, 250);
      };
      yearList.appendChild(button2);
    });
  }

  function createBackButton() {
    let button2 = document.createElement("a");
    button2.href = "#";
    button2.className = "backButton";
    button2.textContent = "Powrót";
    button2.onclick = () => {
      if (viewMode === "gallery") {
        viewMode = "months";
        generateMonthList(currentYear);
      } else if (viewMode === "months") {
        viewMode = "years";
        generateYearList();
      }
      monthDisplay.textContent = "Zdjęcia zostaną wyświetlone tutaj";
      monthGallery.innerHTML = "";
    };
    return button2;
  }

  function getMonthNameOneMonth(monthNumber) {
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

  function getMonthNameMany(monthNumbers) {
    let temporaryArray = [];
    monthNumbers.split("-").forEach((x) => {
      temporaryArray.push(getMonthNameOneMonth(x));
    });
    return temporaryArray.join("-");
  }
  loadData();
});
