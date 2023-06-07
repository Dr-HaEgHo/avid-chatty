import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { coins } from "../data";
import { SearchNormal1 } from "iconsax-react";
import { GlobalContext } from "../context";

const Sidebar = ({ setPage }) => {
  const navigate = useNavigate();
  const { setSymbol } = useContext(GlobalContext);

  const location = window.location.pathname;
  const [openTrade, setOpenTrade] = useState(false);
  // const [id, setId] = useState(false)

  console.log(location);

  useEffect(() => {
    if (location === "/trade") {
      setOpenTrade(true);
    } else {
      setOpenTrade(false);
    }
  }, [location]);

  return (
    <div className="w-full h-full bg-sidebar pt-[50%] pb-[30%] flex flex-col gap-4 text-sidebarText font-DM scroll-y">
      <p
        onClick={() => {
          navigate("/");
        }}
        className={`${location === "/" ? styles.menuTextHi : styles.menuText}`}
      >
        Home
      </p>

      <div className={location === "/trade" && openTrade === true && "trade"}>
        <p
          onClick={() => {
            navigate("/trade");
            setOpenTrade(!openTrade);
          }}
          className={`${
            location === "/trade" ? styles.menuTextHi : styles.menuText
          }`}
        >
          Trade
        </p>
        <div
          className={
            location === "/trade" && openTrade === true
              ? "trade-drop"
              : "trade-drop-close"
          }
        >
          <div className="w-[88%] mx-auto mt-4">
            <div className="w-full bg-input rounded-full flex items-center px-2 py-1 mb-4">
              <SearchNormal1 color="#424242" className="w-[18px]" />
              <input
                type="text"
                placeholder="Search Markets"
                className="text-sm text-inputText px-2 py-1 placeholder:text-sm placeholder:text-inputPh focus:border-none focus:outline-none"
              />
            </div>

            {coins &&
              coins.map((item) => (
                <div
                  className="w-full flex items-center hover:bg-input rounded-xl gap-2 p-2 cursor-pointer"
                  onClick={() => setSymbol(item.symbol)}
                >
                  {item.icon}
                  <h4 className={styles.tradeCoin}>{item.code}</h4>
                  <div className="flex flex-col items-end gap">
                    <p className="text-xs font-medium text-gray-400">
                      ${item.price}
                    </p>
                    {parseFloat(item.percent) > 0.3 ? (
                      <span className="text-xs text-green">
                        +{item.percent}%
                      </span>
                    ) : (
                      <span className="text-xs text-red">-{item.percent}%</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* <p
        onClick={() => {
          navigate("/stake");
        }}
        className={`${
          location === "/stake" ? styles.menuTextHi : styles.menuText
        }`}
      >
        Stake
      </p> */}

      <p
        onClick={() => {
          navigate("/dash");
        }}
        className={`${
          location === "/dash" ? styles.menuTextHi : styles.menuText
        }`}
      >
        Dashboard
      </p>

      <p
        onClick={() => {
          navigate("/copytrading");
        }}
        className={`${
          location === "/copytrading" ? styles.menuTextHi : styles.menuText
        }`}
      >
        Copytrading
      </p>

      {/* <p
        onClick={() => {
          navigate("/leaderboard");
        }}
        className={`${
          location === "/leaderboard" ? styles.menuTextHi : styles.menuText
        }`}
      >
        Leaderboard
      </p> */}

      {/* <p
        onClick={() => {
          navigate("/trading-bot");
        }}
        className={`${
          location === "/trading-bot" ? styles.menuTextHi : styles.menuText
        }`}
      >
        AI Trading Bot
      </p> */}

      {/* <p
        onClick={() => {
          navigate("/nft-marketplace");
        }}
        className={`${
          location === "/nft-marketplace" ? styles.menuTextHi : styles.menuText
        }`}
      >
        NFT Marketplace
      </p> */}
    </div>
  );
};

export default Sidebar;
