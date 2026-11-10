import { t } from "../langue.js";
export const CATEGORIES = {
  attaque: { nom: t("Attaque", "Attack"), couleur: 0xff8a3d },
  heros: { nom: t("Héros", "Hero"), couleur: 0x6fd6ff }
};

export const BIENFAITS = {
  force_de_thor: {
    nom: t("Force", "Strength"), categorie: "attaque", niveauMax: 99, valeur: 2,
    texte: t("+{v} dégâts pour votre attaque.", "+{v} attack damage."),
    appliquer: (scene, joueur, v) => { joueur.arme.degats += v; }
  },
  zenith: {
    nom: t("Coup critique", "Critical hit"), categorie: "attaque", niveauMax: 5, valeur: 6,
    texte: t("+{v} % de chances de coup critique (dégâts x2).", "+{v} % chance of a critical hit (x2 damage)."),
    appliquer: (scene, joueur, v) => { joueur.stats.critique += v / 100; }
  },
  fureur_des_ases: {
    nom: t("Vitesse d'attaque", "Attack speed"), categorie: "attaque", niveauMax: 5, valeur: 8,
    texte: t("+{v} % de vitesse d'attaque.", "+{v} % attack speed."),
    appliquer: (scene, joueur, v) => { joueur.stats.recharge *= 1 - v / 100; }
  },
  lame_d_helios: {
    nom: t("Portée", "Range"), categorie: "attaque", niveauMax: 5, valeur: 12,
    texte: t("+{v} % de portée pour votre attaque.", "+{v} % attack range."),
    appliquer: (scene, joueur, v) => { joueur.stats.portee += v / 100; }
  },
  tourbillon_de_mjollnir: {
    nom: t("Coups multiples", "Multi-strike"), categorie: "attaque", requiert: "epee", niveauMax: 3, valeur: 1,
    texte: t("Chaque coup d'épée frappe aussi dans {v} autre(s) direction(s).", "Each sword swing also hits {v} more direction(s)."),
    appliquer: (scene, joueur, v) => { joueur.stats.coupsEpee += Math.round(v); }
  },
  canalisation: {
    nom: t("Flammes multiples", "Multi-flame"), categorie: "attaque", requiert: "baton", niveauMax: 4, valeur: 1,
    texte: t("Votre bâton lance {v} flamme(s) de plus à chaque sort.", "Your staff casts {v} more flame(s) per spell."),
    appliquer: (scene, joueur, v) => { joueur.arme.nombre += Math.round(v); }
  },

  barque_solaire: {
    nom: t("Vitesse", "Speed"), categorie: "heros", niveauMax: 5, valeur: 8,
    texte: t("+{v} % de vitesse de déplacement.", "+{v} % movement speed."),
    appliquer: (scene, joueur, v) => { joueur.stats.vitesse *= 1 + v / 100; }
  },
  ailes_d_isis: {
    nom: t("Vie", "Health"), categorie: "heros", niveauMax: 5, valeur: 20,
    texte: t("+{v} PV max.", "+{v} max HP."),
    appliquer: (scene, joueur, v) => { joueur.stats.pvMax += v; joueur.pv += v; }
  },
  souffle_de_vie: {
    nom: t("Régénération", "Regeneration"), categorie: "heros", niveauMax: 5, valeur: 0.6,
    texte: t("+{v} PV régénérés par seconde.", "+{v} HP regenerated per second."),
    appliquer: (scene, joueur, v) => { joueur.stats.regeneration += v; }
  }
};
