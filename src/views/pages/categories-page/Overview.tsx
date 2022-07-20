import { selectTabs } from "app/categories/categories.selector";
import { useAppSelector } from "app/store";

import CategoriesGrid from "./components/CategoriesGrid";
import CategoriesList from "./components/CategoriesList";

const Overview = () => {
  const { layout } = useAppSelector((state) => selectTabs(state));

  return <>{layout === 0 ? <CategoriesGrid /> : <CategoriesList />}</>;
};

export default Overview;
