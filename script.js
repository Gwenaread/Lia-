document.addEventListener("DOMContentLoaded", () => {
  // Exemple : bouton "Lire un extrait"
  document.querySelectorAll(".preview-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Voici un extrait du livre :\n\nChapitre 1...\n[Extrait fictif]");
    });
  });

  // Paiement FedaPay simulé
  document.querySelectorAll(".pay-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bookTitle = btn.getAttribute("data-title");
      const amount = btn.getAttribute("data-price");
      const fedapayUrl = "https://checkout.fedapay.com/v2/checkout/SLUG_EXEMPLE";

      const confirmPayment = confirm(
        `Tu vas être redirigé vers la page de paiement pour acheter "${bookTitle}" au prix de ${amount}F. Continuer ?`
      );

      if (confirmPayment) {
        window.open(fedapayUrl, "_blank");
        setTimeout(() => {
          const emailOrPhone = prompt(
            "Paiement effectué ? Entre ton numéro WhatsApp ou ton email pour recevoir le livre :"
          );
          if (emailOrPhone) {
            alert(
              `Merci ! Le livre te sera envoyé manuellement à : ${emailOrPhone}`
            );
          }
        }, 3000);
      }
    });
  });
});
