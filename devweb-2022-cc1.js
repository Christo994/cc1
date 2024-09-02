"use strict";

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function launchGame(_evt) {
    const maxValue = parseInt($maxUsr.value, 10); // Récupère la valeur maximale
    secretNumber = Math.floor(Math.random() * maxValue) + 1; // Génère le nombre secret
    maxGuesses = Math.floor(Math.random() * maxValue) + 1; // Calcule le nombre maximum de tentatives
    nbGuesses = 0;

    $output.textContent = `Partie lancé ! Devinez le nombre entre 1 et ${maxValue}. Vous avez ${maxGuesses} tentatives.`;// Affiche un message d'accueil et le nombre d'essais autorisés

    $numUsr.value = ""; // Réinitialise le champ de saisie utilisateur
    $guessBtn.disabled = false; // Active le bouton de devinette
}

function makeGuess() {
    const userGuess = parseInt($numUsr.value, 10);// recupere la valeur mise par l'utilisateur pour trouver le nombre

    nbGuesses++;
    if (userGuess === secretNumber) {
        $output.textContent = `Félicitations ! Vous avez deviné le nombre en ${nbGuesses} tentatives.`;
        $guessBtn.disabled = true;// Désactive le bouton de devinette après succès 
    } else if (nbGuesses >= maxGuesses) {
        $output.textContent = `le jeu est terminé ! Le bon nombre était ${secretNumber}.`;
        $guessBtn.disabled = true; // Désactive le bouton de devinette après echec
    } else if (userGuess < secretNumber) {
        $output.textContent = `C'est trop bas ! Il vous reste ${maxGuesses - nbGuesses} tentatives.`;
    } else {
        $output.textContent = `C'est trop haut ! Il vous reste ${maxGuesses - nbGuesses} tentatives.`;
    }
}

function handleEnterKey(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
}

$startBtn.addEventListener("click", launchGame);
$guessBtn.addEventListener("click", makeGuess);
$numUsr.addEventListener("keydown", handleEnterKey);

function addCow(evt) {
  // Création d'un élément img
  const cowImage = document.createElement("img");
  const randomRotation = Math.random() * 360; // ajout d'une rotation aleatoire
  cowImage.style.transform = `rotate(${randomRotation}deg)`;
  cowImage.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg"; // Remplacez par l'URL l'image
  cowImage.style.position = "absolute"; // Positionnement absolu pour placer l'élément où je vais cliquer
  cowImage.style.width = "50px"; // Définit la largeur
  cowImage.style.height = "auto"; // meme proportion de l'image
  cowImage.style.left = `${evt.x}px`; // Placement horizontal à la position du clic
  cowImage.style.top = `${evt.y}px`; // Placement vertical à la position du clic
    document.body.appendChild(cowImage);
}

function toggleCow(_evt) {
    if (document.onmousedown instanceof Function) {
        document.onmousedown = null;
    } else {
        document.onmousedown = addCow;
    }
}
$cowBtn.addEventListener("click", toggleCow);
