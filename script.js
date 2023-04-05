let notes = [];

function addLeadingZero(d) {
  return d < 10 ? '0' + d : d;
}

function getNoteTime(t) {
  let Y = t.getFullYear();
  let M = addLeadingZero(t.getMonth() + 1);
  let D = addLeadingZero(t.getDate());

  return '' + D + '.' + M + '.' + Y;
}

const addMovie = (ev) => {
  ev.preventDefault();

  if (notes.length == 10) {
    alert('You added maximum notes!');
  } else {
    let note = {
      date: getNoteTime(new Date(Date.now())),
      name: document.getElementById('noteName').value,
      discription: document.getElementById('noteDisc').value,
      category: document.getElementById('noteCat').value,
    };

    notes.push(note);

    tbody = document.getElementById('tbodyActive');

    let tr = document.createElement('tr');

    tbody.appendChild(tr);

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
    tr.appendChild(tdActions);
  }

  document.forms[0].reset();
};

document.getElementById('noteSubmit').addEventListener('click', addMovie);
