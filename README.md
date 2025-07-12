# 📚 Liaread

**Liaread** est une plateforme de vente d'ebooks multi-auteurs conçue pour permettre aux auteurs africains de publier et vendre leurs œuvres facilement.

## ✨ Fonctionnalités principales

- 💻 Page d'accueil avec un livre en vedette
- 🧾 Formulaire de soumission d'œuvres (titre, auteur, prix, couverture, fichier)
- 📩 Envoi automatique des soumissions à l'email de l’admin (`agodthanks@gmail.com`)
- 🔐 Système d'inscription pour les auteurs (Firebase Authentication)
- 💰 Bouton "Payer maintenant" pour déclencher un paiement (via FedaPay ou lien simulé)
- 🔎 Barre de recherche
- 🗂️ Section pour les catégories de livres
- 📈 Accès admin pour suivre l'évolution du site (Firebase Admin SDK à ajouter plus tard)

## 📂 Fichiers importants

- `index.html` — page d'accueil
- `form.html` — soumission de livres
- `style.css` — design du site
- `main.js` — script JavaScript de base
- `assets/` — dossier contenant les images (par ex. couverture du livre)

## 🚀 Déploiement avec GitHub Pages

1. Ajoute tous les fichiers à ton dépôt GitHub.
2. Va dans les **paramètres** du dépôt.
3. Descends jusqu’à **Pages**.
4. Choisis la **branche `main`** (ou `master`) et le dossier `/root`.
5. Clique sur **"Save"**. Le site sera publié à l'adresse :  
   `https://<ton-nom-utilisateur>.github.io/<nom-du-repo>`

## 🔒 Firebase Auth (auteurs)

Tu dois configurer Firebase Authentication via [firebase.google.com](https://firebase.google.com) pour permettre aux auteurs de créer un compte sécurisé. Le fichier `firebase-config.js` est déjà prêt pour `liaread`.

## 📬 Contact

Pour toute question ou problème :  
📧 **agodthanks@gmail.com**

---

🟣 **Liaread — Lire et vendre autrement.**
