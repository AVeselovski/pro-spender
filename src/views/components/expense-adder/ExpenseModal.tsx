import { forwardRef, useEffect, useState } from "react";
import { styled } from "@mui/material";

import { useAppDispatch, useAppSelector } from "app/store";
import { selectCategoryNames } from "app/categories/categories.selector";
import { selectLoadingStates } from "app/processing/processing.selector";
import { addExpense, ASYNC_ADD_EXPENSE } from "app/expenses/expenses.action";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "views/components/common";

import CloseRounded from "@mui/icons-material/CloseRounded";

const CustomDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 0.75rem;
    margin-bottom: 0;
    margin-top: 4rem;
    max-height: calc(100%);
  }
`;

function ExpenseModal({ isOpen = false, handleClose = () => {} }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => selectLoadingStates(state, [ASYNC_ADD_EXPENSE]));
  const categories = useAppSelector((state) => selectCategoryNames(state));

  const lastUsed = "1"; // NOTE: will be pulling from local storage (should persist locally)
  const submitDisabled = !amount || !description;

  const clearForm = () => {
    setAmount("");
    setDescription("");
  };

  const _handleClose = () => {
    clearForm();
    handleClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (amount && description && category) {
      const expenseData = { amount: Number(amount), description, category };

      dispatch(addExpense(expenseData, _handleClose));
    }
  };

  useEffect(() => setCategory(lastUsed), [lastUsed]);

  return (
    <CustomDialog
      aria-labelledby="expense-modal-title"
      aria-describedby="expense-modal-description"
      closeAfterTransition
      keepMounted
      onClose={_handleClose}
      open={isOpen}
      sx={{ marginTop: "4rem" }}
      TransitionComponent={Transition}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          pr: 2,
        }}
      >
        <DialogTitle>Add Expense</DialogTitle>
        <IconButton onClick={_handleClose}>
          <CloseRounded />
        </IconButton>
      </Box>
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
          <Button disableElevation onClick={_handleClose} size="large" variant="outlined">
            Discard
          </Button>
          <LoadingButton
            disabled={submitDisabled}
            disableElevation
            loading={loading}
            size="large"
            type="submit"
            variant="contained"
          >
            Add now
          </LoadingButton>
        </DialogActions>
      </form>
      <Box sx={{ height: "100vh" }} />
    </CustomDialog>
  );
}

export default ExpenseModal;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
