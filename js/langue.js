function langueEnregistree() {
  try {
    return localStorage.getItem("dusk_and_dawn_langue");
  } catch (erreur) {
    return null;
  }
}

export const LANGUE = langueEnregistree() || (navigator.language.startsWith("fr") ? "fr" : "en");

export function t(fr, en) {
  return LANGUE === "en" ? en : fr;
}

export function changerLangue() {
  try {
    localStorage.setItem("dusk_and_dawn_langue", LANGUE === "fr" ? "en" : "fr");
  } catch (erreur) {
    return;
  }
  location.reload();
}
