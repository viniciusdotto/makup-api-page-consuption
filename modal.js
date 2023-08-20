// Feche a modal quando o botão '×' for clicado
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Feche a modal quando o usuário clicar fora da modal
  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });