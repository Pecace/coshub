// Archivo de JavaScript inicial
// Aquí podrás agregar funciones y lógica para tu proyecto

console.log("¡JavaScript conectado correctamente!");

// Funcionalidad de copiado
document.querySelectorAll('.copied-1').forEach(el => {
  el.addEventListener('click', () => {
    // Copiar solo el texto visible (sin etiquetas)
    const text = el.innerText;
    navigator.clipboard.writeText(text).then(() => {
      // Mostrar aviso
      const notice = document.getElementById('copy-1');
      notice.classList.add('show');
      setTimeout(() => {
        notice.classList.remove('show');
      }, 2000);
    });
  });
});

// Cambio de tema claro/oscuro con switch
const toggleSwitch = document.getElementById('toggle-theme');
const themeLink = document.getElementById('theme-link');

if (toggleSwitch && themeLink) {
  toggleSwitch.addEventListener('click', () => {
    const current = themeLink.getAttribute('href');
    if (toggleSwitch.checked) {
      // Cambiar a tema oscuro
      themeLink.setAttribute('href', current.replace('maindark.css', 'main.css'));
    } else {
      // Volver a tema claro
      themeLink.setAttribute('href', current.replace('main.css', 'maindark.css'));
    }
  });
}

// Oprn new window
function blanknew(url) {
  window.open(
    url,                // Dirección del enlace
    '_blank',           // Nombre de la ventana (usar '_blank' crea una nueva)
    'width=1000,height=800,resizable=yes,scrollbars=yes' // Opciones de la ventana
  );
}
