import type { IExpensesParams, Order, Sortable } from "app/expenses/types";

export default class ExpensesUrlParams implements IExpensesParams {
  public page: string = "1";
  public rows: string = "10";
  public sort: Sortable = "date";
  public order: Order = "desc";
  public period: string = "";
  public category: string = "";
  public q: string = "";
}
