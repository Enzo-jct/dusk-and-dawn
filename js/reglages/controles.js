export const TOUCHES_CLAVIER = {
  1: { haut: ["UP"], bas: ["DOWN"], gauche: ["LEFT"], droite: ["RIGHT"], A: ["ENTER"], B: ["ESC"] },
  2: { haut: ["Z", "W"], bas: ["S"], gauche: ["Q", "A"], droite: ["D"], A: ["SPACE"], B: ["SHIFT"] }
};

export function creerControles(scene, numeroJoueur, seul) {
  const plan = TOUCHES_CLAVIER[numeroJoueur];
  const controles = {};
  for (const nom in plan) {
    const cles = seul ? plan[nom].concat(TOUCHES_CLAVIER[2][nom]) : plan[nom];
    const touches = cles.map((cle) => scene.input.keyboard.addKey(cle));
    const bouton = {
      appuiEnAttente: false,
      get isDown() {
        return touches.some((touche) => touche.isDown);
      }
    };
    for (const touche of touches) {
      touche.removeAllListeners("down");
      touche.on("down", (cle, evenement) => {
        if (!evenement.repeat) {
          bouton.appuiEnAttente = true;
        }
      });
    }
    controles[nom] = bouton;
  }
  return controles;
}

export function vientDEtrePressee(touche) {
  const presse = touche.appuiEnAttente;
  touche.appuiEnAttente = false;
  return presse;
}

export function boutonPresse(controlesJ1, controlesJ2, bouton) {
  const parJ1 = vientDEtrePressee(controlesJ1[bouton]);
  const parJ2 = vientDEtrePressee(controlesJ2[bouton]);
  return parJ1 || parJ2;
}
