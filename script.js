'use strict';

class Calendar {
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor() {
    this.currentDisplayedDate = new Date();
    this.inputDate = document.createElement('input');
    this.selectDateButton = document.createElement('button');
    this.table = document.createElement('table');

    this.draw();
  }

  addLeadingZero(d) {
    return d < 10 ? '0' + d : d;
  }

  getNoteTime(t) {
    let Y = t.getFullYear();
    let M = this.addLeadingZero(t.getMonth() + 1);
    let D = this.addLeadingZero(t.getDate());

    return `${D}.${M}.${Y}`;
  }

  draw() {
    let windowDiv = document.createElement('div');
    windowDiv.classList.add('windowDiv');

    let calendarDiv = document.createElement('div');
    calendarDiv.classList.add('calendarDiv');

    let topperCalenDiv = document.createElement('div');
    topperCalenDiv.classList.add('topperCalenDiv');

    // Create the left div in topper
    let leftDivIntopper = document.createElement('div');
    leftDivIntopper.textContent = '<';
    leftDivIntopper.classList.add('leftDivIntopper');
    leftDivIntopper.addEventListener('click', () => {
      this.goToPreviousMonth(mainDivInTopper);
    });
    topperCalenDiv.appendChild(leftDivIntopper);

    // Create the main center div in topper
    let mainDivInTopper = document.createElement('div');
    mainDivInTopper.classList.add('mainDivInTopper');
    mainDivInTopper.addEventListener('click', () => {
      this.toggleClassesToCalHeader(mainDivInTopper, leftDivIntopper, rightDivInTopper);

      this.openDateSelection(
        calendarDiv,
        mainCalenDiv,
        mainDivInTopper,
        leftDivIntopper,
        rightDivInTopper,
      );
    });
    topperCalenDiv.appendChild(mainDivInTopper);

    // Create the right div in topper
    let rightDivInTopper = document.createElement('div');
    rightDivInTopper.textContent = '>';
    rightDivInTopper.classList.add('rightDivInTopper');
    rightDivInTopper.addEventListener('click', () => {
      this.goToNextMonth(mainDivInTopper);
    });
    topperCalenDiv.appendChild(rightDivInTopper);

    calendarDiv.appendChild(topperCalenDiv);

    let mainCalenDiv = document.createElement('div');
    mainCalenDiv.classList.add('mainCalenDiv');

    calendarDiv.appendChild(mainCalenDiv);

    this.inputDate.type = 'date';
    this.inputDate.classList.add('inputDate');
    this.inputDate.addEventListener('change', (event) => {
      const selectedDate = new Date(event.target.value);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      mainCalenDiv.innerHTML = '';
      const calendarTable = this.generateCalendarTable(year, month);
      mainCalenDiv.appendChild(calendarTable);
    });

    calendarDiv.appendChild(this.inputDate);

    // Dispatch 'change' event with the current date
    this.setCurrentDate(mainDivInTopper, windowDiv, calendarDiv);
  }

  toggleClassesToCalHeader(mainDivInTopper, leftDivIntopper, rightDivInTopper) {
    const yearSelectionVisible = mainDivInTopper.classList.contains('year-selection-visible');

    if (yearSelectionVisible) {
      mainDivInTopper.classList.remove('year-selection-visible');
      leftDivIntopper.classList.remove('change-month-button-hidden');
      rightDivInTopper.classList.remove('change-month-button-hidden');
    } else {
      mainDivInTopper.classList.add('year-selection-visible');
      leftDivIntopper.classList.add('change-month-button-hidden');
      rightDivInTopper.classList.add('change-month-button-hidden');
    }
  }

  setCurrentDate(mainDivInTopper, windowDiv, calendarDiv) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    mainDivInTopper.textContent = `${this.monthNames[month]} ${year}`;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
    this.inputDate.value = formattedDate;
    const changeEvent = new Event('change', { bubbles: true });
    this.inputDate.dispatchEvent(changeEvent);

    this.selectDateButton = document.createElement('button');
    this.selectDateButton.innerText = 'Select';
    this.selectDateButton.classList.add('selectDateButton');

    windowDiv.appendChild(calendarDiv);
    windowDiv.appendChild(this.selectDateButton);

    const container = document.getElementsByClassName('container');
    container[0].appendChild(windowDiv);
  }

  openDateSelection(
    calendarDiv,
    mainCalendarDiv,
    mainDivInTopper,
    leftDivIntopper,
    rightDivInTopper,
  ) {
    const yearDivs = calendarDiv.querySelectorAll('.year-Div');
    const monthTables = calendarDiv.querySelectorAll('.months-table');
    const goBackButtons = calendarDiv.querySelectorAll('.go-Back-Button');

    if (calendarDiv.classList.contains('months-table-visible')) {
      yearDivs.forEach((yearDiv) => {
        yearDiv.remove();
      });
      monthTables.forEach((monthTable) => {
        monthTable.remove();
      });
      goBackButtons.forEach((goBackButton) => {
        goBackButton.remove();
      });
      calendarDiv.classList.remove('year-Divs-visible');
      calendarDiv.classList.remove('months-table-visible');
      mainCalendarDiv.classList.add('mainCalenDiv');
    } else if (calendarDiv.classList.contains('year-Divs-visible')) {
      yearDivs.forEach((yearDiv) => {
        yearDiv.remove();
      });
      calendarDiv.classList.remove('year-Divs-visible');
      mainCalendarDiv.classList.add('mainCalenDiv');
    } else {
      // Create and show yearDivs
      this.openYearSelection(
        calendarDiv,
        mainCalendarDiv,
        mainDivInTopper,
        leftDivIntopper,
        rightDivInTopper,
      );

      calendarDiv.classList.add('year-Divs-visible');
      mainCalendarDiv.classList.remove('mainCalenDiv');
      mainCalendarDiv.classList.add('mainCalendar-Div-hidden');
    }
  }

  calculatePosOfScrollBar(calendarDiv) {
    const selectedYear = this.currentDisplayedDate.getFullYear() - 3;
    const yearDivHeight = calendarDiv.querySelector('.year-Div').clientHeight;
    const selectedYearIndex = 2099 - selectedYear;
    const scrollPosition = selectedYearIndex * yearDivHeight;

    return scrollPosition;
  }

  openYearSelection(
    calendarDiv,
    mainCalendarDiv,
    mainDivInTopper,
    leftDivIntopper,
    rightDivInTopper,
  ) {
    for (let i = 2099; i >= 1970; i--) {
      const yearDiv = document.createElement('div');
      yearDiv.classList.add('year-Div');
      yearDiv.textContent = i;

      yearDiv.addEventListener('click', () => {
        this.selectYearAndMonth(yearDiv, calendarDiv, mainCalendarDiv, mainDivInTopper);
        this.renderMonths(
          yearDiv,
          calendarDiv,
          mainCalendarDiv,
          mainDivInTopper,
          leftDivIntopper,
          rightDivInTopper,
        );
      });
      calendarDiv.appendChild(yearDiv);
    }

    calendarDiv.scrollTop = this.calculatePosOfScrollBar(calendarDiv);
  }

  selectYearAndMonth(yearDiv, calendarDiv, mainCalendarDiv, mainDivInTopper) {
    const selectedYear = yearDiv.textContent;
    const selectedMonth = this.currentDisplayedDate.getMonth();
    const selectedDay = this.currentDisplayedDate.getDate();
    const selectedMonthName = this.monthNames[selectedMonth];
    this.inputDate.value = `${selectedYear}-${this.addLeadingZero(
      selectedMonth + 1,
    )}-${this.addLeadingZero(selectedDay)}`;

    mainDivInTopper.textContent = `${selectedMonthName} ${selectedYear}`;

    this.currentDisplayedDate.setFullYear(Number(selectedYear));
    const calendarTable = this.generateCalendarTable(Number(selectedYear), selectedMonth);
    mainCalendarDiv.innerHTML = '';
    mainCalendarDiv.appendChild(calendarTable);

    const yearDivs = calendarDiv.querySelectorAll('.year-Div');

    yearDivs.forEach((yearDiv) => {
      yearDiv.remove();
    });
    calendarDiv.classList.remove('year-Divs-visible');
  }

  renderMonths(
    yearDiv,
    calendarDiv,
    mainCalendarDiv,
    mainDivInTopper,
    leftDivIntopper,
    rightDivInTopper,
  ) {
    const actionsDiv = document.createElement('div');

    const goBackButton = document.createElement('button');
    goBackButton.classList.add('go-Back-Button');
    goBackButton.textContent = '< Back';
    goBackButton.addEventListener('click', () => {
      this.openYearSelection(
        calendarDiv,
        mainCalendarDiv,
        mainDivInTopper,
        leftDivIntopper,
        rightDivInTopper,
      );
      const monthTables = calendarDiv.querySelectorAll('.months-table');
      monthTables.forEach((monthTable) => {
        monthTable.remove();
      });

      goBackButton.remove();
    });

    actionsDiv.appendChild(goBackButton);
    calendarDiv.appendChild(actionsDiv);

    const table = document.createElement('table');
    table.classList.add('months-table');
    calendarDiv.classList.add('months-table-visible');
    let monthCounter = 0;

    for (let row = 0; row < 4; row++) {
      const tableRow = document.createElement('tr');
      for (let col = 0; col < 3; col++) {
        const tableCell = document.createElement('td');
        tableCell.classList.add('cell-with-month');
        const currentMonthCounter = monthCounter;
        tableCell.textContent = this.monthNames[currentMonthCounter];
        tableCell.addEventListener('click', () => {
          const a = leftDivIntopper;

          leftDivIntopper.classList.remove('change-month-button-hidden');
          rightDivInTopper.classList.remove('change-month-button-hidden');
          mainDivInTopper.classList.remove('year-selection-visible');
          const selectedYear = yearDiv.textContent;
          const selectedMonth = currentMonthCounter + 1;
          const selectedDay = this.currentDisplayedDate.getDate();
          const selectedMonthName = this.monthNames[selectedMonth - 1];
          this.inputDate.value = `${selectedYear}-${this.addLeadingZero(
            selectedMonth,
          )}-${this.addLeadingZero(selectedDay)}`;

          mainDivInTopper.textContent = `${selectedMonthName} ${selectedYear}`;

          this.currentDisplayedDate.setFullYear(Number(selectedYear), selectedMonth - 1);
          const calendarTable = this.generateCalendarTable(Number(selectedYear), selectedMonth - 1);
          mainCalendarDiv.innerHTML = '';
          mainCalendarDiv.appendChild(calendarTable);

          let monthTables = calendarDiv.querySelectorAll('.months-table');
          let goBackButtons = calendarDiv.querySelectorAll('.go-Back-Button');
          monthTables.forEach((monthTable) => {
            monthTable.remove();
          });
          goBackButtons.forEach((goBackButton) => {
            goBackButton.remove();
          });

          calendarDiv.classList.remove('year-Divs-visible');
          calendarDiv.classList.remove('months-table-visible');
          mainCalendarDiv.classList.remove('mainCalendar-Div-hidden');
          mainCalendarDiv.classList.add('mainCalenDiv');
        });

        tableRow.appendChild(tableCell);
        monthCounter++;
      }
      table.appendChild(tableRow);
    }
    calendarDiv.appendChild(table);
  }

  setSelecDateToNote(tdElement) {
    this.selectDateButton.addEventListener('click', () => {
      const selectedTd = this.table.querySelector('.selected');

      if (selectedTd) {
        const dateParts = this.inputDate.value.split('-');

        tdElement.innerHTML = '';

        const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;

        tdElement.textContent = formattedDate;
      } else {
        console.log('No selected cell found.');
        alert('Please, select a date.');
      }
    });
  }

  generateCalendarTable(year, month) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    this.table = document.createElement('table');
    this.table.classList.add('calendarTable');

    const dayHeaderRow = document.createElement('tr');
    daysOfWeek.forEach((day) => {
      const dayHeader = document.createElement('th');
      dayHeader.textContent = day;
      dayHeader.classList.add('day-of-week');
      if (day === 'Sat' || day === 'Sun') {
        dayHeader.classList.add('weekend-day');
      }
      dayHeaderRow.appendChild(dayHeader);
    });
    this.table.appendChild(dayHeaderRow);

    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let dayCounter = 1;
    for (let row = 0; row < 6; row++) {
      const calendarRow = document.createElement('tr');
      for (let col = 0; col < 7; col++) {
        const calendarCell = document.createElement('td');
        if ((row === 0 && col < startDay) || dayCounter > daysInMonth) {
          calendarCell.textContent = '';
        } else {
          calendarCell.textContent = dayCounter++;
          calendarCell.classList.add('calendar-Cell');
          calendarCell.addEventListener('click', () => {
            const table = calendarCell.closest('table');
            const calendarCells = table.querySelectorAll('.calendar-Cell');

            for (let otherCell of calendarCells) {
              if (otherCell === event.target) continue;

              otherCell.classList.remove('selected');
            }

            const selectedDay = calendarCell.textContent;
            this.inputDate.value = `${year}-${(month + 1)
              .toString()
              .padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;

            calendarCell.classList.toggle('selected');
          });
        }
        calendarRow.appendChild(calendarCell);
      }
      this.table.appendChild(calendarRow);
    }

    return this.table;
  }

  goToNextMonth(mainDivInTopper) {
    if (mainDivInTopper.textContent === 'December 2099') {
      return;
    }

    this.currentDisplayedDate.setMonth(this.currentDisplayedDate.getMonth() + 1);

    if (this.currentDisplayedDate.getMonth() === 0) {
      this.currentDisplayedDate.setFullYear(this.currentDisplayedDate.getFullYear());
    }

    const mainCalenDiv = mainDivInTopper.parentNode.nextElementSibling;
    while (mainCalenDiv.firstChild) {
      mainCalenDiv.removeChild(mainCalenDiv.firstChild);
    }

    const year = this.currentDisplayedDate.getFullYear();
    const month = this.currentDisplayedDate.getMonth();
    const calendarTable = this.generateCalendarTable(year, month);
    mainCalenDiv.appendChild(calendarTable);

    mainDivInTopper.textContent = `${this.monthNames[month]} ${year}`;

    const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
    this.inputDate.value = formattedDate;
  }

  goToPreviousMonth(mainDivInTopper) {
    if (mainDivInTopper.textContent === 'January 1970') {
      return;
    }

    this.currentDisplayedDate.setMonth(this.currentDisplayedDate.getMonth() - 1);

    if (this.currentDisplayedDate.getMonth() === 11) {
      this.currentDisplayedDate.setFullYear(this.currentDisplayedDate.getFullYear());
    }

    const mainCalenDiv = mainDivInTopper.parentNode.nextElementSibling;
    while (mainCalenDiv.firstChild) {
      mainCalenDiv.removeChild(mainCalenDiv.firstChild);
    }

    const year = this.currentDisplayedDate.getFullYear();
    const month = this.currentDisplayedDate.getMonth();
    const calendarTable = this.generateCalendarTable(year, month);
    mainCalenDiv.appendChild(calendarTable);

    mainDivInTopper.textContent = `${this.monthNames[month]} ${year}`;

    const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
    this.inputDate.value = formattedDate;
  }
}

class Select {
  ui;
  options = [];

  draw() {
    var frame = document.createElement('div');
    frame.classList.add('select');

    var display = document.createElement('input');
    display.classList.add('display');

    display.addEventListener('input', () => {
      this.filterOptions(display.value, frame);
      if (display.value == '') {
        for (const option of this.options) {
          option.selected = false;
        }
        const optionUIs = document.querySelectorAll('.option');
        for (const optionUI of optionUIs) {
          optionUI.classList.remove('checked');
        }
      }
    });

    const selectInstance = this;

    display.addEventListener('input', function (event) {
      const action = event.inputType;

      if (action === 'deleteContentBackward') {
        display.value = '';
        for (const option of selectInstance.options) {
          option.selected = false;
        }

        const optionUIs = document.querySelectorAll('.option');
        for (const optionUI of optionUIs) {
          optionUI.classList.remove('checked');
          var e = new Event('input');
          display.dispatchEvent(e);
        }
      }
    });

    frame.appendChild(display);

    if (this.ui.multiple) {
      this.doIfMultipleSelector(frame, display);
    } else {
      this.doIfSingleSelector(frame, display);
    }

    this.ui.parentNode.insertBefore(frame, this.ui);
  }

  // Multiple selector part

  doIfMultipleSelector(frame, display) {
    for (const option of this.options) {
      let optionUI = document.createElement('div');
      optionUI.textContent = option.textContent;
      optionUI.classList.add('option');
      optionUI.on('click', (e) => {
        var ui = e.target;
        ui.classList.toggle('checked');
        option.selected = !option.selected;
        this.updateMultipleInputField(display);
        const optionUIs = document.querySelectorAll('.option');
        optionUIs.forEach((optionUI) => {
          optionUI.style.display = 'block';
        });
      });
      frame.appendChild(optionUI);
    }
  }

  updateMultipleInputField(display) {
    const selectedOptions = this.options.filter((option) => option.selected);
    const selectedOptionTexts = selectedOptions.map((option) => option.textContent);
    display.value = selectedOptionTexts.join(', ') + ', ';
  }

  // Single selector part

  doIfSingleSelector(frame, display) {
    for (const option of this.options) {
      let optionUI = document.createElement('div');
      optionUI.textContent = option.textContent;
      optionUI.classList.add('option');
      optionUI.on('click', (e) => {
        var ui = e.target;
        for (const otherOptionUI of frame.querySelectorAll('.option')) {
          if (otherOptionUI !== ui) {
            otherOptionUI.classList.remove('checked');
          }
        }
        ui.classList.toggle('checked');
        option.selected = !option.selected;
        this.updateSingleInputField(display);
      });

      frame.appendChild(optionUI);
    }
  }

  updateSingleInputField(display) {
    const selectedOptions = this.options.filter((option) => option.selected);
    const selectedOptionTexts = selectedOptions.map((option) => option.textContent);
    display.value = selectedOptionTexts;
  }

  // Filtration logic

  filterOptions(filterText, frame) {
    var counterOfSelecOptions = 0;
    var lengthOFSelecOptions = 0;
    for (const option of this.options) {
      if (option.selected) {
        counterOfSelecOptions++;
        lengthOFSelecOptions += option.textContent.length + 2;
      }
    }

    var updatedFilterText = filterText.substring(lengthOFSelecOptions);

    const filteredOptions = this.options.filter((option) =>
      option.textContent.toLowerCase().startsWith(updatedFilterText.toLowerCase()),
    );

    const optionUIs = frame.querySelectorAll('.option');
    for (const optionUI of optionUIs) {
      const optionText = optionUI.textContent.toLowerCase();
      const isMatch = filteredOptions.some(
        (option) => option.textContent.toLowerCase() === optionText,
      );

      optionUI.style.display = isMatch ? 'block' : 'none';
    }
  }

  constructor(ui) {
    this.ui = ui;

    ui.classList.add('Selector');

    for (const option of ui.getElementsByTagName('option')) {
      this.options.push(option);
    }

    this.draw();
  }
}

Element.prototype.on = function (event, listener) {
  this.addEventListener(event, listener);
};

for (const select of document.getElementsByTagName('select')) new Select(select);

// Realisation of note logic

class Note {
  addLeadingZero(d) {
    return d < 10 ? '0' + d : d;
  }

  getNoteTime(t) {
    let Y = t.getFullYear();
    let M = this.addLeadingZero(t.getMonth() + 1);
    let D = this.addLeadingZero(t.getDate());
    let h = this.addLeadingZero(t.getHours());
    let m = this.addLeadingZero(t.getMinutes());

    return `${D}.${M}.${Y} \n at ${h}:${m}`;
  }

  createNote() {
    var noteName = document.getElementById('noteName');
    var noteDiscription = document.getElementById('noteDisc');

    var tbodyActive = document.getElementById('tbodyActive');

    let tr = document.createElement('tr');
    tr.classList.add('tr-note');

    tbodyActive.appendChild(tr);

    let tdName = document.createElement('td');
    tr.appendChild(tdName).innerText = noteName.value;

    let tdDate = document.createElement('td');
    var time = this.getNoteTime(new Date(Date.now()));
    tr.appendChild(tdDate).innerText = time;

    let tdCateg = document.createElement('td');
    var selectors = document.getElementsByTagName('select');
    var selectedOptions = [];
    for (const option of selectors[0]) {
      if (option.selected) {
        selectedOptions.push(option);
      }
    }
    var selectedOptionTexts = selectedOptions.map((option) => option.textContent);
    var optionsToAdd = selectedOptionTexts.join(', ');
    tr.appendChild(tdCateg).innerText = optionsToAdd;

    let tdDisc = document.createElement('td');
    tr.appendChild(tdDisc).innerText = noteDiscription.value;

    // Part of code of note class
    let tdDates = document.createElement('td');
    let addDateButton = document.createElement('button');
    addDateButton.innerText = 'Click to add date';
    addDateButton.setAttribute('id', 'addDateButton');
    tdDates.appendChild(addDateButton);
    tr.appendChild(tdDates);

    addDateButton.addEventListener('click', function () {
      const calen = new Calendar();
      calen.setSelecDateToNote(tdDates);
    });

    let tdActions = document.createElement('td');
    tr.appendChild(tdActions).innerText = 'soon';

    for (const otherOptionUI of document.querySelectorAll('.option')) {
      otherOptionUI.classList.remove('checked');
    }

    document.forms[0].reset();

    var e = new Event('input');
    var display = document.getElementsByClassName('display');
    display[0].dispatchEvent(e);
  }

  constructor() {
    var selectors = document.getElementsByTagName('select');
    var noteName = document.getElementById('noteName').value;
    var noteDiscription = document.getElementById('noteDisc').value;
    var atLeastOneOptionSelected = false;

    for (const option of selectors[0]) {
      if (option.selected) {
        atLeastOneOptionSelected = true;
        break;
      }
    }

    if (noteName.trim() !== '' && noteDiscription.trim() !== '' && atLeastOneOptionSelected) {
      this.createNote();
    } else {
      alert('Please, fill all fields.');
    }
  }
}

const createButton = document.getElementById('noteSubmit');

createButton.addEventListener('click', function (event) {
  event.preventDefault();
  const note = new Note();
});
