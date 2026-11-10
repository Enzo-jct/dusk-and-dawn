import { t } from "./langue.js";
import { ECRAN, POLICE_TITRE, POLICE_TEXTE } from "./reglages/config.js";
import { creerControles, boutonPresse } from "./reglages/controles.js";
import { formaterTemps } from "./fonctions.js";
import { jouerMusique } from "./systemes/sons.js";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default class fin extends Phaser.Scene {
  constructor() {
    super({ key: "fin" });
  }

  init(bilan) {
    this.bilan = bilan;
  }

  create() {
    const cx = ECRAN.largeur / 2;
    const bilan = this.bilan;
    jouerMusique(this, "musique_fin");

    this.add.image(cx, ECRAN.hauteur / 2, "img_vignette").setDisplaySize(1700, 1100);
    this.add
      .text(cx, 100, t("Les ombres ont triomphé.", "The shadows have triumphed."), {
        fontFamily: POLICE_TITRE, fontSize: "50px", color: "#ffe2a8", stroke: "#000000", strokeThickness: 7
      })
      .setOrigin(0.5);
    this.add
      .text(cx, 156, t("Relevez-vous, Gardien, l'Aube a encore besoin de vous.", "Rise, Guardian, the Dawn still needs you."), { fontFamily: POLICE_TEXTE, fontSize: "22px", fontStyle: "italic", color: "#b9ae98" })
      .setOrigin(0.5);

    const lignes = [
      t("Temps survécu : ", "Time survived: ") + formaterTemps(bilan.temps),
      t("Vague atteinte : ", "Wave reached: ") + bilan.vague,
      t("Niveau : ", "Level: ") + bilan.niveau,
      t("Ombres vaincues : ", "Shadows defeated: ") + bilan.ennemisVaincus,
      t("Rois de l'Ombre vaincus : ", "Shadow Kings defeated: ") + bilan.bossVaincus,
      t("Score : ", "Score: ") + bilan.score
    ];
    this.add.text(380, 230, t("Votre partie", "Your game"), { fontFamily: POLICE_TITRE, fontSize: "32px", color: "#ffe2a8" }).setOrigin(0.5);
    this.add
      .text(380, 410, lignes.join("\n"), {
        fontFamily: POLICE_TEXTE, fontSize: "26px", color: "#f3e9d2", align: "center", lineSpacing: 10
      })
      .setOrigin(0.5);

    this.titreScores = this.add
      .text(900, 230, t("Entrez vos initiales", "Enter your initials"), { fontFamily: POLICE_TITRE, fontSize: "32px", color: "#ffe2a8" })
      .setOrigin(0.5);
    this.lettres = [0, 0, 0];
    this.position = 0;
    this.textesLettres = [];
    for (let i = 0; i < 3; i++) {
      const texte = this.add.text(840 + i * 60, 360, "A", { fontFamily: POLICE_TITRE, fontSize: "64px", color: "#f3e9d2" }).setOrigin(0.5);
      this.textesLettres.push(texte);
    }
    this.afficherLettres();

    this.aide = this.add
      .text(cx, ECRAN.hauteur - 60, t("Haut / bas : changer la lettre    ·    Entrée ou Espace : valider", "Up / down: change letter    ·    Enter or Space: confirm"), {
        fontFamily: POLICE_TEXTE, fontSize: "24px", color: "#ffffff"
      })
      .setOrigin(0.5);

    this.input.keyboard.resetKeys();
    this.controlesJ1 = creerControles(this, 1);
    this.controlesJ2 = creerControles(this, 2);
    this.etape = "initiales";

    this.time.delayedCall(60000, () => this.scene.start("menu"));
    this.cameras.main.fadeIn(800);
  }

  update() {
    if (this.etape === "initiales") {
      if (boutonPresse(this.controlesJ1, this.controlesJ2, "haut")) {
        this.lettres[this.position] = (this.lettres[this.position] + 1) % 26;
        this.afficherLettres();
      }
      if (boutonPresse(this.controlesJ1, this.controlesJ2, "bas")) {
        this.lettres[this.position] = (this.lettres[this.position] + 25) % 26;
        this.afficherLettres();
      }
      if (boutonPresse(this.controlesJ1, this.controlesJ2, "A")) {
        this.position += 1;
        if (this.position === 3) {
          this.enregistrerScore();
        } else {
          this.afficherLettres();
        }
      }
    } else if (this.etape === "scores") {
      if (boutonPresse(this.controlesJ1, this.controlesJ2, "A")) {
        this.scene.start("jeu", { nbJoueurs: this.bilan.nbJoueurs, classes: this.bilan.classes });
      } else if (boutonPresse(this.controlesJ1, this.controlesJ2, "B")) {
        this.scene.start("menu");
      }
    }
  }

  afficherLettres() {
    for (let i = 0; i < 3; i++) {
      this.textesLettres[i].setText(ALPHABET[this.lettres[i]]);
      this.textesLettres[i].setColor(i === this.position ? "#ffc94a" : "#f3e9d2");
    }
  }

  async enregistrerScore() {
    this.etape = "enregistrement";
    const nouveau = {
      nom: ALPHABET[this.lettres[0]] + ALPHABET[this.lettres[1]] + ALPHABET[this.lettres[2]],
      score: this.bilan.score
    };

    let scores = await lireDonneesJSON();
    if (scores === null) {
      scores = [];
    }
    scores.push(nouveau);
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 10);
    await ecrireDonneesJSON(scores);

    for (const texte of this.textesLettres) {
      texte.destroy();
    }
    this.titreScores.setText(t("Meilleurs scores", "High scores"));
    for (let i = 0; i < scores.length; i++) {
      const couleur = scores[i] === nouveau ? "#ffc94a" : "#f3e9d2";
      const style = { fontFamily: POLICE_TEXTE, fontSize: "24px", color: couleur };
      this.add.text(790, 270 + i * 34, (i + 1) + ".  " + scores[i].nom, style);
      this.add.text(1010, 270 + i * 34, scores[i].score, style).setOrigin(1, 0);
    }
    this.aide.setText(t("Entrée ou Espace : rejouer    ·    Échap ou Maj : menu", "Enter or Space: play again    ·    Esc or Shift: menu"));
    this.etape = "scores";
  }
}
