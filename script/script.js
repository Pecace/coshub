// Archivo de JavaScript inicial
// Aquí podrás agregar funciones y lógica para tu proyecto

console.log("¡JavaScript conectado correctamente!");

// Funcionalidad de copiado
document.querySelectorAll('.copy-target').forEach(el => {
  el.addEventListener('click', () => {
    // Copiar solo el texto visible (sin etiquetas)
    const text = el.innerText;
    navigator.clipboard.writeText(text).then(() => {
      // Mostrar aviso
      const notice = document.getElementById('copy-notice');
      notice.classList.add('show');
      setTimeout(() => {
        notice.classList.remove('show');
      }, 2000);
    });
  });
});
