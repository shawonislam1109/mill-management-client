import CustomTabs from "../../utils/tabs/CustomTabs";
import CategoryTrash from "./CategoryTrash";

import SupplierTrash from "./SupplierTrash";

const Trash = () => {
  // TABS ITEMS
  const tabsItems = ["Supplier", "Category"];

  // TABS COMPONENTS
  const tabPanels = [
    {
      component: <SupplierTrash />,
    },
    {
      component: <CategoryTrash />,
    },
  ];

  return (
    <div>
      <CustomTabs {...{ tabPanels, tabsItems }} />
    </div>
  );
};

export default Trash;
