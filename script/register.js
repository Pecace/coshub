const form = document.getElementById('form');
const table = document.getElementById('table');
const tbody = document.getElementById('tbody');
const search = document.getElementById('search');
const counter = document.getElementById('counter');
const message = document.getElementById('message');
const editIndicator = document.getElementById('editIndicator');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const submitBtn = document.getElementById('submitBtn');
const toggleTheme = document.getElementById('toggleTheme');

let records = [];
let editingIndex = null;
let sortField = null;
let sortAsc = true;

function init() {
  loadTheme();
  loadRecords();
  renderTable();

  const inputs = form.querySelectorAll('input[type="text"], input[list]');
  inputs.forEach(input => {
    input.addEventListener('focus', () => input.select());
  });

  form.addEventListener('submit', handleSubmit);
  cancelEditBtn.addEventListener('click', cancelEdit);
  search.addEventListener('input', renderTable);
  toggleTheme.addEventListener('click', toggleDarkMode);
  document.getElementById('clearAll').addEventListener('click', clearAll);
  document.getElementById('downloadCsv').addEventListener('click', downloadCsv);

  table.querySelectorAll('.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const field = th.dataset.sortable;
      if (sortField === field) sortAsc = !sortAsc;
      else {
        sortField = field;
        sortAsc = true;
      }
      renderTable();
    });
  });
}

function loadTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') document.body.classList.add('dark');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

function loadRecords() {
  const saved = JSON.parse(localStorage.getItem('registros')) || [];
  records = saved.map(row => {
    if (row[7] === 'si') return [...row.slice(0, 7), '1'];
    if (row[7] === 'no') return [...row.slice(0, 7), '0'];
    return row;
  });
}

function saveRecords() {
  localStorage.setItem('registros', JSON.stringify(records));
}

function handleSubmit(e) {
  e.preventDefault();
  const data = getFormData();
  if (!data[0]) return showMessage('casenumber es obligatorio');

  if (editingIndex !== null) {
    records[editingIndex] = data;
    editingIndex = null;
    showMessage('Registro actualizado');
  } else {
    records.push(data);
    showMessage('Registro creado');
  }

  saveRecords();
  renderTable();
  form.reset();
  cancelEdit();
}

function getFormData() {
  const casenumber = form.casenumber.value.trim();
  const name = form.name.value.trim();
  const service = form.service.value.trim();
  const section = form.section.value.trim();
  const caseType = form.case.value.trim();
  const filed = form.filed.value.trim();
  const date = new Date().toLocaleString(); // toLocaleDateString: mostrar solo fecha

  return [casenumber, name, service, section, caseType, filed, date];
}

function renderTable() {
  const query = search.value.toLowerCase();
  let filtered = records.filter(row => row.some(cell => (cell ?? '').toLowerCase().includes(query)));

  if (sortField) {
    filtered.sort((a, b) => {
      const idx = fieldToIndex(sortField);
      const va = (a[idx] || '').toLowerCase();
      const vb = (b[idx] || '').toLowerCase();
      return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  }

  tbody.innerHTML = '';
  filtered.forEach((row, i) => {
    const tr = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const td = document.createElement('td');
      let value = row[j] ?? '';
      td.textContent = value;
      tr.appendChild(td);
    }

    const actions = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'small-btn edit';
    editBtn.onclick = () => startEdit(i);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.className = 'small-btn delete';
    deleteBtn.onclick = () => deleteRecord(i);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    tr.appendChild(actions);
    tbody.appendChild(tr);
  });

  counter.textContent = filtered.length;
}

function fieldToIndex(field) {
  const map = {
    casenumber: 0,
    name: 1,
    service: 2,
    section: 3,
    case: 4,
    filed: 5,
    date: 6,
  };
  return map[field] ?? 0;
}

function startEdit(index) {
  const row = records[index];
  form.casenumber.value = row[0];
  form.name.value = row[1];
  form.service.value = row[2];
  form.section.value = row[3];
  form.case.value = row[4];
  form.filed.value = row[5];

  editingIndex = index;
  editIndicator.hidden = false;
  cancelEditBtn.hidden = false;
  submitBtn.textContent = 'Actualizar registro';
}

function cancelEdit() {
  editingIndex = null;
  form.reset();
  editIndicator.hidden = true;
  cancelEditBtn.hidden = true;
  submitBtn.textContent = 'Crear registro';
}

function deleteRecord(index) {
  if (confirm('¿Eliminar este registro?')) {
    records.splice(index, 1);
    saveRecords();
    renderTable();
    showMessage('Registro eliminado');
  }
}

function clearAll() {
  if (confirm('¿Eliminar todos los registros?')) {
    records = [];
    saveRecords();
    renderTable();
    showMessage('Todos los registros fueron eliminados');
  }
}

function downloadCsv() {
  const csv = records.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cases.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function showMessage(text) {
  message.textContent = text;
  message.hidden = false;
  setTimeout(() => (message.hidden = true), 3000);
}

init();