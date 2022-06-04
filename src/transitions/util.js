import { DIFFICULTY_IGNORAMUS, DIFFICULTY_VERY_EASY } from "../constants";

import transition_ignoramus from "./transition_ignoramus";
import transition_idempotent from "./transition_idempotent";
import transition_very_easy from "./transition_very_easy";

export function getTransitionByDifficulty(difficulty) {
  switch (difficulty) {
    case DIFFICULTY_IGNORAMUS:
      return transition_ignoramus;
    case DIFFICULTY_VERY_EASY:
      return transition_very_easy;
    default:
      return transition_idempotent;
  }
}
