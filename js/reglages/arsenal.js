import { t } from "../langue.js";
export const ARSENAL = {
  epee: {
    nom: t("Épée", "Sword"),
    base: { degats: 14, portee: 85, angle: 130, recharge: 950, rechargeMin: 450, recul: 160, visee: 240 }
  },
  baton: {
    nom: t("Bâton arcanique", "Arcane staff"),
    base: { degats: 13, recharge: 850, rechargeMin: 500, vitesse: 430, nombre: 1, duree: 1300, portee: 480, recul: 50 }
  }
};
