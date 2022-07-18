import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "app/store";
import { selectCategoryNames } from "app/categories/categories.selector";
import { selectLoadingStates } from "app/processing/processing.selector";
import { addExpense, ASYNC_ADD_EXPENSE } from "app/expenses/expenses.action";

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormLabel,
  LoadingButton,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "../common";

const ExpenseModal = ({ isOpen = false, onClose = () => {} }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const loading = useAppSelector((state) => selectLoadingStates(state, [ASYNC_ADD_EXPENSE]));
  const categories = useAppSelector((state) => selectCategoryNames(state));
  const dispatch = useAppDispatch();

  // NOTE: will be pulling from local storage (should persist locally)
  const lastUsed = "1";
  const submitDisabled = !amount || !description;

  const clearForm = () => {
    setAmount("");
    setDescription("");
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (amount && description && category) {
      const expenseData = { amount: Number(amount), description, category };

      dispatch(addExpense(expenseData, handleClose));
    }
  };

  useEffect(() => setCategory(lastUsed), [lastUsed]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add expense">
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ maxWidth: 480 }}>
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <FormLabel htmlFor="expense-amount">Amount</FormLabel>
            <TextField
              autoFocus
              id="expense-amount"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="19,99"
              size="medium"
              type="number"
              value={amount}
            />
          </FormControl>
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <FormLabel htmlFor="expense-description">Expense (brief description)</FormLabel>
            <TextField
              id="expense-description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Groceries"
              size="medium"
              type="text"
              value={description}
            />
          </FormControl>
          <FormControl sx={{ mb: 2, width: "100%" }}>
            <FormLabel htmlFor="expense-category">Category</FormLabel>
            <Select
              id="expense-category"
              onChange={(e) => setCategory(e.target.value)}
              size="medium"
              value={category}
            >
              {Object.keys(categories).map((key) => (
                <MenuItem key={key} value={key}>
                  {categories[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            disableElevation
            onClick={handleClose}
            size="large"
            sx={{ minWidth: "120px" }}
            variant="outlined"
          >
            Discard
          </Button>
          <LoadingButton
            disabled={submitDisabled}
            disableElevation
            loading={loading}
            size="large"
            sx={{ minWidth: "120px" }}
            type="submit"
            variant="contained"
          >
            Add
          </LoadingButton>
        </DialogActions>
      </form>
      <Box sx={{ height: "100vh" }} />
    </Modal>
  );
};

export default ExpenseModal;
