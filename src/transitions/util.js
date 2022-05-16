import { DIFFICULTY_IGNORAMUS } from "../constants";

import transition_ignoramus from "./transition_ignoramus";
import transition_idempotent from "./transition_idempotent";

export function getTransitionByDifficulty(difficulty) {
  switch (difficulty) {
    case DIFFICULTY_IGNORAMUS:
      return transition_ignoramus;
    default:
      return transition_idempotent;
  }
}
