import { useState } from "react";
import classes from "./AdditionalFunctionalities.module.css";
import { History } from "./History";
import { Favorites } from "./Favorites";
import { Logs } from "./Logs";

export const AdditionalFunctionalities = () => {
  const availableTabs = ["History", "Compare", "Favorite", "Logs"];
  const [selectedTab, setSelectedTab] = useState(availableTabs[0]);

  return (
    <>
      <div className={classes.tabHeaderBar}>
        {availableTabs.map((tab) => (
          <span
            key={tab}
            className={`${classes.tabTitle}  ${selectedTab == tab && classes.selected}`}
            tabIndex={1}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.toUpperCase()}
          </span>
        ))}
      </div>
      <div className={classes.container}>
        {selectedTab === "History" && <History />}
        {selectedTab === "Favorite" && <Favorites />}
        {selectedTab === "Logs" && <Logs />}
      </div>
    </>
  );
};
