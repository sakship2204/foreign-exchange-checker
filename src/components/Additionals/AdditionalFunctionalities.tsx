import { useState } from "react";
import classes from "./AdditionalFunctionalities.module.css";

export const AdditionalFunctionalities = () => {
  const availableTabs = ["History", "Compare", "Favorite", "Logs"];
  const [selectedTab, setSelectedTab] = useState(availableTabs[0]);

  return (
    <>
      <div className={classes.tabHeaderBar}>
        {availableTabs.map((tab) => (
          <span
            key={tab}
            className={selectedTab == tab && classes.selected}
            tabIndex={1}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>
    </>
  );
};
