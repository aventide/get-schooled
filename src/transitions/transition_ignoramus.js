export default function transition_ignoramus({ board, bank, turnFor }) {
  return {
    newBoard: board,
    newBank: bank,
    newTurnFor: turnFor === "colors" ? "animals" : "colors",
  };
}
