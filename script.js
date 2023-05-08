let notes = [];

const moveNote = (tr, tbodyArchive, tbodyActive) => {
  if (tbodyActive.contains(tr)) {
    tbodyActive.removeChild(tr);
    tbodyArchive.appendChild(tr);
    tr.querySelector('button').innerText = 'To act';
  } else {
    tbodyArchive.removeChild(tr);
    tbodyActive.appendChild(tr);
    tr.querySelector('button').innerText = 'To arc';
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
    tr.appendChild(tdCreated).innerText = note.date;

    let tdCatg = document.createElement('td');
    tr.appendChild(tdCatg).innerText = note.category;

    let tdDisc = document.createElement('td');
    tr.appendChild(tdDisc).innerText = note.discription;

    let tdDates = document.createElement('td');
    tr.appendChild(tdDates);

    let tdActions = document.createElement('td');
    tdActions.style.width = '152.36px';
    tr.appendChild(tdActions);
    let archiveDiv = document.createElement('div');
    archiveDiv.style.width = '152.36px';
    tdActions.appendChild(archiveDiv);
    let archiveButton = document.createElement('button');
    archiveButton.innerText = 'To arc';
    archiveButton.name = 'Arc';
    archiveButton.style.fontSize = '1.2em';
    archiveButton.style.padding = '10px 2px';
    archiveButton.classList.add('archive-btn');
    archiveDiv.appendChild(archiveButton);
    archiveButton.addEventListener('click', () => {
      let tbodyArchive = document.getElementById('tbodyArchive');
      moveNote(tr, tbodyArchive, tbodyActive);
      console.log(checkTableRowParent(tr));
    });
    console.log(note.active);

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Del';
    deleteButton.name = 'Arc';
    deleteButton.style.fontSize = '1.2em';
    deleteButton.style.padding = '10px 10px';
    deleteButton.style.margin = '0px 5px';
    deleteButton.classList.add('archive-btn');
    archiveDiv.appendChild(deleteButton);
    deleteButton.addEventListener('click', () => {
      let tbodyArchive = document.getElementById('tbodyArchive');
      deleteNote(tr, tbodyArchive, tbodyActive);
    });

    document.forms[0].reset();
  }
};

document.getElementById('noteSubmit').addEventListener('click', addNote);
