// livre.js
import { 
  getFirestore, collection, addDoc, query, where, getDocs, orderBy 
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const bookId = new URLSearchParams(window.location.search).get("id"); // on récupère l'id du livre dans l'URL

const commentFormContainer = document.getElementById("comment-form-container");
const loginPrompt = document.getElementById("login-prompt");
const commentForm = document.getElementById("comment-form");
const commentSuccess = document.getElementById("comment-success");

const bookTitleElem = document.getElementById("book-title");
const bookAuthorElem = document.getElementById("book-author");
const bookPriceElem = document.getElementById("book-price");

// Afficher les infos du livre (à compléter selon ta base Firestore)
async function loadBook() {
  if (!bookId) {
    alert("Livre non trouvé.");
    return;
  }
  const bookDoc = await getDocs(query(collection(db, "books"), where("id", "==", bookId)));
  if (bookDoc.empty) {
    alert("Livre introuvable.");
    return;
  }
  const bookData = bookDoc.docs[0].data();
  bookTitleElem.textContent = bookData.title;
  bookAuthorElem.textContent = `Auteur : ${bookData.author}`;
  bookPriceElem.textContent = `Prix : ${bookData.price} F CFA`;
}

// Affiche ou masque le formulaire selon connexion
onAuthStateChanged(auth, user => {
  if (user) {
    commentFormContainer.style.display = "block";
    loginPrompt.style.display = "none";
  } else {
    commentFormContainer.style.display = "none";
    loginPrompt.style.display = "block";
  }
});

// Soumission du formulaire commentaire
commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const pseudo = document.getElementById("pseudo").value.trim();
  const note = parseInt(document.getElementById("note").value);
  const commentaire = document.getElementById("commentaire").value.trim();

  if (!pseudo || !note || !commentaire) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  try {
    await addDoc(collection(db, "comments"), {
      bookId: bookId,
      pseudo: pseudo,
      note: note,
      commentaire: commentaire,
      validated: false,  // en attente de validation admin
      createdAt: new Date(),
      userId: auth.currentUser.uid
    });

    commentSuccess.style.display = "block";
    commentForm.reset();

  } catch (error) {
    alert("Erreur lors de l'envoi du commentaire : " + error.message);
  }
});

loadBook();
