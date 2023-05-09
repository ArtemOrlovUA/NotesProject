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
      date: getNoteTime(new Date(Date.now())),
      name: document.getElementById('noteName').value,
      discription: document.getElementById('noteDisc').value,
      category: document.getElementById('noteCat').value,
      active: true,
    };

    notes.push(note);

    tbodyActive = document.getElementById('tbodyActive');

    let tr = document.createElement('tr');

    tbodyActive.appendChild(tr);

    let tdName = document.createElement('td');
    tr.appendChild(tdName).innerText = note.name;

    let tdCreated = document.createElement('td');
    tdCreated.style.textAlign = 'center';
    tr.appendChild(tdCreated).innerText = note.date;

    let tdCatg = document.createElement('td');
    tdCatg.style.textAlign = 'center';
    tr.appendChild(tdCatg).innerText = note.category;

    let tdDisc = document.createElement('td');
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

    // Create button element
    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.innerHTML = '<ion-icon name="create-outline"></ion-icon>';

    // Create empty div element
    const divElement = document.createElement('div');
    divElement.style.position = 'fixed';
    divElement.style.top = '50%';
    divElement.style.left = '50%';
    divElement.style.transform = 'translate(-50%, -50%)';
    divElement.style.width = '300px';
    divElement.style.height = '200px';
    divElement.style.backgroundColor = 'white';
    divElement.style.borderRadius = '5px';
    divElement.style.boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.3)';
    divElement.style.display = 'none';

    // Create close button element
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';

    // Add click event listener to open button
    editButton.addEventListener('click', () => {
      divElement.style.display = 'block';
    });

    // Add click event listener to close button
    closeButton.addEventListener('click', () => {
      divElement.style.display = 'none';
    });

    // Add click event listener to div element to close when clicked outside
    divElement.addEventListener('click', (event) => {
      if (event.target === divElement) {
        divElement.style.display = 'none';
      }
    });

    // Append elements to document body
    actionsDiv.appendChild(editButton);
    divElement.appendChild(closeButton);
    document.body.appendChild(divElement);

    document.forms[0].reset();
  }
};

document.getElementById('noteSubmit').addEventListener('click', addNote);
