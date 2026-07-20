import { useState } from "react";
import classes from "./AdditionalFunctionalities.module.css";
import { History } from "./History";
import { Favorites } from "./Favorites";
import { Logs } from "./Logs";
import { Compare } from "./Compare";
import { useSelector } from "react-redux";

export const AdditionalFunctionalities = () => {
  const availableTabs = ["History", "Compare", "Favorite", "Logs"];
  const [selectedTab, setSelectedTab] = useState(availableTabs[0]);
  const favoriteData = useSelector((state: any) => state.favorite.favoriteData);
  const logsData = useSelector((state: any) => state.logs.logsData);

  const numData = (tab: string) => {
    if (tab === "Favorite") return favoriteData.length;
    if (tab === "Logs") return logsData.length;

    return 0;
  };

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
            {numData(tab) > 0 && (
              <div className={classes.numChip}>{numData(tab)}</div>
            )}
          </span>
        ))}
      </div>
      <div className={classes.container}>
        {selectedTab === "History" && <History />}
        {selectedTab === "Favorite" && <Favorites />}
        {selectedTab === "Logs" && <Logs />}
        {selectedTab === "Compare" && <Compare />}
      </div>
    </>
  );
};
