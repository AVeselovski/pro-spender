import { useState } from "react";

import AddAction from "../general/AddAction";
import ExpenseModal from "./ExpenseModal";

/**
 * Self contained expense creation component. Wraps `MainAction` and `ExpenseModal`, with state.
 */
function ExpenseAdder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AddAction handleAction={() => setIsOpen(true)}>Add expense</AddAction>
      <ExpenseModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />
    </>
  );
}

export default ExpenseAdder;
