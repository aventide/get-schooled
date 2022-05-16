export default function transition_idempotent({ board, bank, turnFor }) {
  return {
    newBoard: board,
    newBank: bank,
    newTurnFor: turnFor,
  };
}
