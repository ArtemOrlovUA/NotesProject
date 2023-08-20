'use strict';

class Calendar {
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
      this.openDateSelection(calendarDiv, mainCalenDiv, mainDivInTopper);
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
    const monthNames = [
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
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    mainDivInTopper.textContent = `${monthNames[month]} ${year}`;
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

  openDateSelection(calendarDiv, mainCalendarDiv, mainDivInTopper) {
    const monthNames = [
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

    const yearDivs = calendarDiv.querySelectorAll('.year-Div');
    const monthTables = calendarDiv.querySelectorAll('.months-table');

    if (calendarDiv.classList.contains('year-Divs-visible')) {
      yearDivs.forEach((yearDiv) => {
        yearDiv.remove();
      });
      monthTables.forEach((monthTable) => {
        monthTable.remove();
      });
      calendarDiv.classList.remove('year-Divs-visible');
      mainCalendarDiv.classList.add('mainCalenDiv');
    } else {
      // Create and show yearDivs
      for (let i = 2099; i >= 1970; i--) {
        const yearDiv = document.createElement('div');
        yearDiv.classList.add('year-Div');
        yearDiv.textContent = i;
        yearDiv.addEventListener('click', () => {
          const monthTables = calendarDiv.querySelectorAll('.months-table');

          const monthTableBelow = yearDiv.nextElementSibling;

          if (monthTableBelow && monthTableBelow.classList.contains('months-table')) {
            monthTableBelow.remove();
          } else {
            monthTables.forEach((monthTable) => {
              monthTable.remove();
            });

            const table = document.createElement('table');
            table.classList.add('months-table');
            let monthCounter = 0;

            for (let row = 0; row < 4; row++) {
              const tableRow = document.createElement('tr');
              for (let col = 0; col < 3; col++) {
                const tableCell = document.createElement('td');
                tableCell.classList.add('cell-with-month');
                const currentMonthCounter = monthCounter;
                tableCell.textContent = monthNames[currentMonthCounter];
                tableCell.addEventListener('click', () => {
                  const selectedYear = yearDiv.textContent;
                  const selectedMonth = currentMonthCounter + 1;
                  const selectedDay = this.currentDisplayedDate.getDate();
                  const selectedMonthName = monthNames[selectedMonth - 1];
                  this.inputDate.value = `${selectedYear}-${this.addLeadingZero(
                    selectedMonth,
                  )}-${this.addLeadingZero(selectedDay)}`;

                  mainDivInTopper.textContent = `${selectedMonthName} ${selectedYear}`;

                  this.currentDisplayedDate.setFullYear(Number(selectedYear), selectedMonth - 1);
                  const calendarTable = this.generateCalendarTable(
                    Number(selectedYear),
                    selectedMonth - 1,
                  );
                  mainCalendarDiv.innerHTML = '';
                  mainCalendarDiv.appendChild(calendarTable);
                });
                tableRow.appendChild(tableCell);
                monthCounter++;
              }
              table.appendChild(tableRow);
            }
            const followingYearDiv = yearDiv.nextElementSibling;
            calendarDiv.insertBefore(table, followingYearDiv);

            const selectedYear = yearDiv.textContent;
            const selectedMonth = this.currentDisplayedDate.getMonth();
            const selectedDay = this.currentDisplayedDate.getDate();
            const selectedMonthName = monthNames[selectedMonth];
            this.inputDate.value = `${selectedYear}-${this.addLeadingZero(
              selectedMonth + 1,
            )}-${this.addLeadingZero(selectedDay)}`;

            mainDivInTopper.textContent = `${selectedMonthName} ${selectedYear}`;

            this.currentDisplayedDate.setFullYear(Number(selectedYear));
            const calendarTable = this.generateCalendarTable(Number(selectedYear), selectedMonth);
            mainCalendarDiv.innerHTML = '';
            mainCalendarDiv.appendChild(calendarTable);
          }
        });
        calendarDiv.appendChild(yearDiv);
      }
      calendarDiv.classList.add('year-Divs-visible');
      mainCalendarDiv.classList.remove('mainCalenDiv');
      mainCalendarDiv.classList.add('mainCalendar-Div-hidden');
    }
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

            const selectedDay = calendarCell.textContent; // Get the selected day
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

    const monthNames = [
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

    mainDivInTopper.textContent = `${monthNames[month]} ${year}`;

    const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
    let inputDate = mainCalenDiv.previousElementSibling;
    inputDate.value = formattedDate;
  }

  goToPreviousMonth(mainDivInTopper) {
    if (mainDivInTopper.textContent === 'January 1970') {
      return;
    }

    this.currentDisplayedDate.setMonth(this.currentDisplayedDate.getMonth() - 1);

    if (this.currentDisplayedDate.getMonth() === 11) {
      this.currentDisplayedDate.setFullYear(this.currentDisplayedDate.getFullYear() - 1);
    }

    const mainCalenDiv = mainDivInTopper.parentNode.nextElementSibling;
    while (mainCalenDiv.firstChild) {
      mainCalenDiv.removeChild(mainCalenDiv.firstChild);
    }

    const year = this.currentDisplayedDate.getFullYear();
    const month = this.currentDisplayedDate.getMonth();
    const calendarTable = this.generateCalendarTable(year, month);
    mainCalenDiv.appendChild(calendarTable);

    const monthNames = [
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

    mainDivInTopper.textContent = `${monthNames[month]} ${year}`;

    const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
    let inputDate = mainCalenDiv.previousElementSibling;
    inputDate.value = formattedDate;
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

// OLD!!!!!!!!!!!!!

if (0) {
  let notes = [];

  const moveNote = (tr, tbodyArchive, tbodyActive) => {
    if (tbodyActive.contains(tr)) {
      tbodyActive.removeChild(tr);
      tbodyArchive.appendChild(tr);
    } else {
      tbodyArchive.removeChild(tr);
      tbodyActive.appendChild(tr);
    }
  };

  const deleteNote = (tr, tbodyArchive, tbodyActive) => {
    if (tbodyActive.contains(tr)) {
      tbodyActive.removeChild(tr);
    } else {
      tbodyArchive.removeChild(tr);
    }
  };

  function updateNoteData(nameInput, catgInput, discInput, tdName, tdCatg, tdDisc) {
    tdName.innerText = nameInput.value;
    tdCatg.innerText = catgInput.value;
    tdDisc.innerText = discInput.value;
  }

  function checkTableRowParent(tr) {
    let parent = tr.parentElement;

    while (parent !== null) {
      if (parent.id === 'tbodyActive') {
        return 'active';
      } else if (parent.id === 'tbodyArchive') {
        return 'archive';
      }

      parent = parent.parentElement;
    }

    // if the row does not belong to either tbodyActive or tbodyArchive
    return 'unknown';
  }

  function addLeadingZero(d) {
    return d < 10 ? '0' + d : d;
  }

  function getNoteTime(t) {
    let Y = t.getFullYear();
    let M = addLeadingZero(t.getMonth() + 1);
    let D = addLeadingZero(t.getDate());

    return '' + D + '.' + M + '.' + Y;
  }

  const addNote = (ev) => {
    ev.preventDefault();

    const selectedValue = document.querySelector('.selected-value');

    if (
      document.getElementById('noteName').value == null ||
      document.getElementById('noteName').value == '' ||
      document.getElementById('noteDisc').value == null ||
      document.getElementById('noteDisc').value == '' ||
      !isOptionSelected() ||
      selectedValue.textContent == 'Select an option'
    ) {
      alert('Fill all fields');
    } else if (notes.length == 6) {
      alert('You added maximum notes!');
    } else {
      let note = {
        name: document.getElementById('noteName').value,
        date: getNoteTime(new Date(Date.now())),
        discription: document.getElementById('noteDisc').value,
        category: getSelectedOptionText(),
        active: true,
      };

      notes.push(note);

      tbodyActive = document.getElementById('tbodyActive');

      let tr = document.createElement('tr');
      tr.setAttribute('id', 'tr-note');

      tbodyActive.appendChild(tr);

      let tdName = document.createElement('td');
      tdName.style.textAlign = 'center';
      tr.appendChild(tdName).innerText = note.name;

      let tdCreated = document.createElement('td');
      tdCreated.style.textAlign = 'center';
      tr.appendChild(tdCreated).innerText = note.date;

      let tdCatg = document.createElement('td');
      tdCatg.style.textAlign = 'center';
      tr.appendChild(tdCatg).innerText = note.category;

      let tdDisc = document.createElement('td');
      tdDisc.style.textAlign = 'center';
      tr.appendChild(tdDisc).innerText = note.discription;

      let tdDates = document.createElement('td');
      tr.appendChild(tdDates);

      let tdActions = document.createElement('td');
      tdActions.style.width = '152.36px';
      tr.appendChild(tdActions);
      let actionsDiv = document.createElement('div');
      actionsDiv.style.width = '152.36px';
      tdActions.appendChild(actionsDiv);

      let archiveButton = document.createElement('button');
      archiveButton.name = 'toArchiveButton';
      archiveButton.classList.add('archive-btn');
      archiveButton.innerHTML = '<ion-icon name="archive-outline"></ion-icon>';
      actionsDiv.appendChild(archiveButton);
      archiveButton.addEventListener('click', () => {
        let tbodyArchive = document.getElementById('tbodyArchive');
        moveNote(tr, tbodyArchive, tbodyActive);
        console.log(checkTableRowParent(tr));
      });

      let deleteButton = document.createElement('button');
      deleteButton.name = 'toDeleteButton';
      deleteButton.classList.add('delete-btn');
      deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
      actionsDiv.appendChild(deleteButton);
      deleteButton.addEventListener('click', () => {
        let tbodyArchive = document.getElementById('tbodyArchive');
        deleteNote(tr, tbodyArchive, tbodyActive);
      });

      const editButton = document.createElement('button');
      editButton.classList.add('edit-btn');
      editButton.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
      actionsDiv.appendChild(editButton);
      // Add click event listener to edit button
      editButton.addEventListener('click', () => {
        editWindowDiv.style.display = 'block';
      });

      // Create empty div element
      const editWindowDiv = document.createElement('div');
      editWindowDiv.classList.add('editWindow-div');
      document.body.appendChild(editWindowDiv);

      // Create close button element
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.classList.add('editClose-btn');
      editWindowDiv.appendChild(closeButton);
      // Add click event listener to close button
      closeButton.addEventListener('click', () => {
        editWindowDiv.style.display = 'none';
      });

      // Create name input field
      const nameLabel = document.createElement('label');
      nameLabel.classList.add('editLabel');
      nameLabel.textContent = 'Name:';
      editWindowDiv.appendChild(nameLabel);
      const nameInput = document.createElement('input');
      nameInput.classList.add('editInputField');
      nameInput.type = 'text';
      nameInput.value = tdName.innerText;
      nameInput.maxLength = 20;
      editWindowDiv.appendChild(nameInput);

      // Create category input field
      const categoryLabel = document.createElement('label');
      categoryLabel.classList.add('editLabel');
      categoryLabel.textContent = 'Category:';
      editWindowDiv.appendChild(categoryLabel);
      const categoryInput = document.createElement('input');
      categoryInput.classList.add('editInputField');
      categoryInput.type = 'text';
      categoryInput.value = tdName.innerText;
      categoryInput.maxLength = 15;
      editWindowDiv.appendChild(categoryInput);

      // Create content input field
      const contentLabel = document.createElement('label');
      contentLabel.classList.add('editLabel');
      contentLabel.textContent = 'Content:';
      editWindowDiv.appendChild(contentLabel);
      const contentInput = document.createElement('input');
      contentInput.classList.add('editInputField');
      contentInput.type = 'text';
      contentInput.value = tdName.innerText;
      contentInput.maxLength = 100;
      editWindowDiv.appendChild(contentInput);

      const editLabel = document.createElement('label');
      editLabel.classList.add('editMainLabel');
      editLabel.textContent = 'Here you can change some data:';
      editWindowDiv.appendChild(editLabel);

      const saveButton = document.createElement('button');
      saveButton.classList.add('saveChanges-btn');
      saveButton.textContent = 'Save changes';
      saveButton.addEventListener('click', () => {
        updateNoteData(nameInput, categoryInput, contentInput, tdName, tdCatg, tdDisc);
        editWindowDiv.style.display = 'none';
      });
      editWindowDiv.appendChild(saveButton);

      selectedValue.textContent = 'Select an option';

      document.forms[0].reset();

      const dropdownList = document.querySelector('.dropdown-list');

      dropdownList.style.display = 'none';
    }
  };

  document.getElementById('noteSubmit').addEventListener('click', addNote);

  // Functions for alternative dropdown

  // Select some option
  function toggleOption(value) {
    const selectDropdown = document.getElementById('selectDropdown');
    const option = Array.from(selectDropdown.options).find((option) => option.value === value);

    if (option) {
      option.selected = !option.selected;
    }

    updateSelectedValue();
  }

  // Add multiple options
  function updateSelectedValue() {
    const selectDropdown = document.getElementById('selectDropdown');
    const selectedOptions = Array.from(selectDropdown.selectedOptions);

    const selectedCategories = selectedOptions.map((option) => option.value);
    const selectedValue = document.querySelector('.selected-value');
    selectedValue.textContent =
      selectedCategories.length > 0 ? selectedCategories.join(', ') : 'Select an option';
  }

  // Open/Close options
  function toggleDropdown() {
    const dropdownList = document.querySelector('.dropdown-list');
    const isDropdownOpen = dropdownList.style.display === 'block';

    if (isDropdownOpen) {
      dropdownList.style.display = 'none';
    } else {
      dropdownList.style.display = 'block';
    }

    const selectedValue = document.querySelector('.selected-value');
    if (selectedValue.textContent.trim() === 'Select an option') {
      selectedValue.textContent = '';
    }

    if (selectedValue.textContent.trim() === '') {
      selectDropdown.selectedIndex = -1;
    }

    const dropdown = document.querySelector('.dropdown');

    document.addEventListener('click', function (event) {
      const isClickInsideDropdown = dropdown.contains(event.target);

      if (!isClickInsideDropdown) {
        dropdownList.style.display = 'none';
      }
    });
  }

  // Get selected options to create note
  function getSelectedOptionText() {
    const selectDropdown = document.getElementById('selectDropdown');
    const selectedOptions = Array.from(selectDropdown.selectedOptions);

    return selectedOptions.map((option) => option.text).join(', ');
  }

  function isOptionSelected() {
    const selectDropdown = document.getElementById('selectDropdown');
    return selectDropdown.selectedOptions.length !== 0;
  }

  function filterOptions(inputText) {
    const dropdownList = document.querySelector('.dropdown-list');
    const options = Array.from(dropdownList.querySelectorAll('.option'));

    options.forEach((option) => {
      const optionText = option.textContent;
      if (optionText.toLowerCase().includes(inputText.toLowerCase())) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    });
  }

  // Realisation of alternative dropdown

  const dropdownContainer = document.createElement('div');
  dropdownContainer.className = 'dropdown';

  const selectedValue = document.createElement('div');
  selectedValue.className = 'selected-value';
  selectedValue.textContent = 'Select an option';
  selectedValue.setAttribute('contenteditable', 'true');
  selectedValue.addEventListener('click', toggleDropdown);
  selectedValue.addEventListener('input', function () {
    // Clear the text field
    selectedValue.textContent = '';

    // Reset the selected options in the select element
    const selectDropdown = document.getElementById('selectDropdown');
    selectDropdown.value = -1;

    filterOptions(this.textContent);
  });

  dropdownContainer.appendChild(selectedValue);

  const dropdownList = document.createElement('div');
  dropdownList.className = 'dropdown-list';

  const selectDropdown = document.getElementById('selectDropdown');

  for (let i = 0; i < selectDropdown.options.length; i++) {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = selectDropdown.options[i].textContent;
    optionElement.addEventListener('click', function () {
      toggleOption(this.textContent);
    });
    dropdownList.appendChild(optionElement);
  }

  dropdownContainer.appendChild(dropdownList);

  const noteSubmitButton = document.getElementById('noteSubmit');

  const buttonContainer = noteSubmitButton.parentNode;

  buttonContainer.insertBefore(dropdownContainer, noteSubmitButton);
}
