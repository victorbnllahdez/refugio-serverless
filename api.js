// Invoke URL + ruta del recurso
const API_URL = 'https://m5x342e5v4.execute-api.us-east-1.amazonaws.com/dev/solicitud';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('refugio-form');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    // Evita el envío normal del formulario (recarga y 405 en Pages)
    event.preventDefault();

    // Leemos los campos del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    console.log('Payload:', { name, email });

    try {
      // Enviamos JSON mediante POST
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Error al enviar');

      alert(result.message);
      form.reset();
    } catch (error) {
      console.error('Error API:', error);
      alert(error.message);
    }
  });
});