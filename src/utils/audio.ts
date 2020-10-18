
// using import for mp3 not working in typescript??!
const topScore_audio = require("../mp3/award_nylon_plucked.mp3");
const medal_audio = require("../mp3/retro_fanfare.mp3");
const death_audio = require("../mp3/bite_munch.mp3");
const enemyKilled_audio = require("../mp3/impact_sword_hit.mp3");
const forbiddenMove_audio = require("../mp3/game_error.mp3");
const swing_audio = require("../mp3/sabre_swing.mp3");
// const movement_audio = require("../mp3/single_step_heavy.mp3");
const movement_audio = require("../mp3/single_step_heavy.mp3");
const waiting_audio = require("../mp3/snore_single.mp3");


export const topScore_mp3 = new Audio(topScore_audio);
topScore_mp3.volume = 0.5;
export const medal_mp3 = new Audio(medal_audio);
export const death_mp3 = new Audio(death_audio);
export const enemyKilled_mp3 = new Audio(enemyKilled_audio);
enemyKilled_mp3.volume = 0.6;
export const forbiddenMove_mp3 = new Audio(forbiddenMove_audio);
export const swing_mp3 = new Audio(swing_audio);
export const movement_mp3 = new Audio(movement_audio);
export const waiting_mp3 = new Audio(waiting_audio);