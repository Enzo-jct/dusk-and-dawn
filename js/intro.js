import { t, LANGUE } from "./langue.js";
import { ECRAN, POLICE_TEXTE } from "./reglages/config.js";
import { creerControles, boutonPresse } from "./reglages/controles.js";
import { jouerMusique } from "./systemes/sons.js";

const SOUS_TITRES = [
  "Long ago, the world was protected by the glow of Prometheus' flame",
  "The ancients worshipped it at the heart of the Temple of Dawn",
  "A greedy king tried to steal its power to become a god",
  "His crime shattered the flame and unleashed a plague of creeping shadows",
  "Today, you are the guardians of the last spark",
  "Guardians, be the last bulwark against the darkness"
];

export default class intro extends Phaser.Scene {
  constructor() {
    super({ key: "intro" });
  }

  create() {
    this.numero = 1;
    this.image = this.add.image(ECRAN.largeur / 2, ECRAN.hauteur / 2, "intro_1");
    if (LANGUE === "en") {
      this.add.rectangle(0, 568, ECRAN.largeur, ECRAN.hauteur - 568, 0x000000).setOrigin(0);
      this.sousTitre = this.add
        .text(ECRAN.largeur / 2, 640, SOUS_TITRES[0], { fontFamily: POLICE_TEXTE, fontSize: "34px", color: "#f1dfae", align: "center", wordWrap: { width: 1080 } })
        .setOrigin(0.5);
    }
    this.add
      .text(ECRAN.largeur - 16, 16, t("Entrée ou Espace : passer", "Enter or Space: skip"), { fontFamily: POLICE_TEXTE, fontSize: "18px", color: "#8a8272" })
      .setOrigin(1, 0);

    this.input.keyboard.resetKeys();
    this.controlesJ1 = creerControles(this, 1);
    this.controlesJ2 = creerControles(this, 2);
    jouerMusique(this, "musique_menu");

    this.cameras.main.fadeIn(800);
    this.time.addEvent({ delay: 5000, loop: true, callback: () => this.imageSuivante() });
  }

  update() {
    if (boutonPresse(this.controlesJ1, this.controlesJ2, "A")) {
      this.scene.start("menu");
    }
  }

  imageSuivante() {
    this.numero += 1;
    if (this.numero > 6) {
      this.scene.start("menu");
      return;
    }
    this.image.setTexture("intro_" + this.numero);
    if (this.sousTitre) {
      this.sousTitre.setText(SOUS_TITRES[this.numero - 1]);
    }
    this.cameras.main.fadeIn(800);
  }
}
