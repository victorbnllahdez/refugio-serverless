const API_URL = "https://m5x342e5v4.execute-api.us-east-1.amazonaws.com/dev/solicitud";
const yearLabel = document.querySelector("#year");
const form = document.querySelector("#refugio-form");
const formStatus = document.querySelector("#form-status");

if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      interest: "Contacto general",
    };

    submitButton.disabled = true;
    formStatus.textContent = "Enviando tu solicitud...";
    formStatus.dataset.state = "sending";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "No se pudo enviar la solicitud.");
      }

      formStatus.textContent = result.message || "Gracias. Hemos recibido tu solicitud.";
      formStatus.dataset.state = "success";
      form.reset();
    } catch (error) {
      formStatus.textContent = error.message || "No se pudo conectar. Inténtalo de nuevo.";
      formStatus.dataset.state = "error";
    } finally {
      submitButton.disabled = false;
    }
  });
}