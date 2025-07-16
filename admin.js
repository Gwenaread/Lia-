// admin.js
import { db, auth } from "./firebase.js";
import { 
  collection, query, where, getDocs, updateDoc, doc, deleteDoc, orderBy 
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

const commentsContainer = document.getElementById("comments-container");
const adminEmail = "agodthanks@gmail.com";  // ton email admin

// Vérifie si admin connecté
onAuthStateChanged(auth, async (user) => {
  if (!user || user.email !== adminEmail) {
    alert("Accès refusé : vous devez être connecté en tant qu'administrateur.");
    window.location.href = "login.html";  // page de connexion admin
    return;
  }
  await loadComments();
});

// Charge les commentaires en attente
async function loadComments() {
  commentsContainer.innerHTML = "<p>Chargement des commentaires...</p>";

  const q = query(collection(db, "comments"), where("validated", "==", false), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    commentsContainer.innerHTML = "<p>Aucun commentaire en attente.</p>";
    return;
  }

  commentsContainer.innerHTML = "";

  querySnapshot.forEach(docSnap => {
    const c = docSnap.data();
    const commentId = docSnap.id;

    const div = document.createElement("div");
    div.classList.add("comment-item");
    div.innerHTML = `
      <p><strong>${c.pseudo}</strong> a noté ${c.note}/5</p>
      <p>${c.commentaire}</p>
      <button class="btn-validate" data-id="${commentId}">Valider</button>
      <button class="btn-delete" data-id="${commentId}">Supprimer</button>
      <hr/>
    `;
    commentsContainer.appendChild(div);
  });

  // Gestion des clics sur boutons
  document.querySelectorAll(".btn-validate").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      await validateComment(id);
      await loadComments();
    });
  });

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      await deleteComment(id);
      await loadComments();
    });
  });
}

// Valider un commentaire
async function validateComment(id) {
  const commentRef = doc(db, "comments", id);
  await updateDoc(commentRef, { validated: true });
}

// Supprimer un commentaire
async function deleteComment(id) {
  const commentRef = doc(db, "comments", id);
  await deleteDoc(commentRef);
}

// Bouton déconnexion admin (optionnel)
const logoutBtn = document.getElementById("logout-btn");
if(logoutBtn){
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}
