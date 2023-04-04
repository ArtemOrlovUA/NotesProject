notes = [];

const addMovie = (ev) => {
  ev.preventDefault();
  let note = {
    date: Date.now(),
    name: document.getElementById('noteName').value,
    discription: document.getElementById('noteDisc').value,
    category: document.getElementById('noteCat').value,
  };

  notes.push(note);

  let tbody = document.createElement('tbody');

  document.getElementById('table').appendChild(tbody);

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

  document.forms[0].reset();
};

document.getElementById('noteSubmit').addEventListener('click', addMovie);
