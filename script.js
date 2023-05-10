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

  if (
    document.getElementById('noteName').value == null ||
    document.getElementById('noteName').value == '' ||
    document.getElementById('noteDisc').value == null ||
    document.getElementById('noteDisc').value == '' ||
    document.getElementById('noteCat').value == null ||
    document.getElementById('noteCat').value == ''
  ) {
    alert('Fill all fields');
  } else if (notes.length == 6) {
    alert('You added maximum notes!');
  } else {
    let note = {
      name: document.getElementById('noteName').value,
      date: getNoteTime(new Date(Date.now())),
      discription: document.getElementById('noteDisc').value,
      category: document.getElementById('noteCat').value,
      active: true,
    };

    notes.push(note);

    tbodyActive = document.getElementById('tbodyActive');

    let tr = document.createElement('tr');

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

    document.forms[0].reset();
  }
};

document.getElementById('noteSubmit').addEventListener('click', addNote);
