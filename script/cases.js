// Espera a que el DOM esté cargado antes de buscar los elementos
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('entrada');
  const boton = document.getElementById('agregar');
  const texto = document.getElementById('texto');

  boton.addEventListener('click', () => {
    const valor = input.value.trim();
    if (valor) {
      texto.textContent += valor; // concatena el texto ingresado
      input.value = ''; // limpia el campo
    }
  });
});
