import { useState } from "react";

import AddAction from "./AddAction";
import ExpenseModal from "./ExpenseModal";

/**
 * Self contained expense creation component. Wraps `MainAction` and `ExpenseModal`, with state.
 */
const ExpenseAdder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AddAction onAction={() => setIsOpen(true)}>Add expense</AddAction>
      <ExpenseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ExpenseAdder;
