import Image from "next/image";
import Link from "next/link";
import DarkMode from "../mode/DarkMode";
import Logo from "./../../public/images/logo.png";
import WhiteLogo from "./../../public/images/logo_white.png";
// import React, { useState } from "react";
import Btnsocial1 from "./../../public/images/btnsocial1.png";
import Btnsocial2 from "./../../public/images/btnsocial2.png";
import Btnsocial3 from "./../../public/images/btnsocial3.png";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
export let selectedAccount;
export let shortacc = "Connect Wallet";
let isInitialized = false;
export default function Header01() {
  const [toggle, setToggle] = useState(false);
  const [isCollapse, setCollapse] = useState(null);
  const [name, setName] = useState("");
  const [buttonText, setButtonText] = useState("Connect Wallet");
  // window resize
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        setToggle(false);
      }
    });
  });
  const handleClick = () => {
    setButtonText(shortacc);
  };
  const wrapperFunction = () => {
    //do something
    init();
  };
  const init = async () => {
    let provider = window.ethereum;
    await window.ethereum.enable();
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          selectedAccount = accounts[0];
          let a = selectedAccount.toString();
          shortacc =
            a[0] +
            a[1] +
            a[2] +
            a[3] +
            "..." +
            a[a.length - 4] +
            a[a.length - 3] +
            a[a.length - 2] +
            a[a.length - 1];
          // console.log(`Selected account is ${selectedAccount}`);
          setButtonText(shortacc);
        })
        .catch((err) => {
          // console.log(err);
          return;
        });
      await window.ethereum.enable();
      window.ethereum.on("accountsChanged", function (accounts) {
        selectedAccount = accounts[0];
        let a = selectedAccount.toString();
        shortacc =
          a[0] +
          a[1] +
          a[2] +
          a[3] +
          "..." +
          a[a.length - 4] +
          a[a.length - 3] +
          a[a.length - 2] +
          a[a.length - 1];
        // console.log(`Selected account changed to ${selectedAccount}`);
        // console.log(`short account changed to ${shortacc}`);
        setButtonText(shortacc);
      });
    }

    handleClick();
    isInitialized = true;
  };

  const route = useRouter();
  /* -------------------------------------------------------------------------- */
  /*                            daynamic navigations                            */
  /* -------------------------------------------------------------------------- */
  const home = {
    id: 1,
    name: "Home",
    pages: [
      {
        id: uuidv4(),
        name: "Home 1",
        path: "/",
      },
      {
        id: uuidv4(),
        name: "Home 2",
        path: "/home/home_2",
      },
      {
        id: uuidv4(),
        name: "Home 3",
        path: "/home/home_3",
      },
      {
        id: uuidv4(),
        name: "Home 4",
        path: "/home/home_4",
      },
      {
        id: uuidv4(),
        name: "Home 5",
        path: "/home/home_5",
      },
      {
        id: uuidv4(),
        name: "Home 6",
        path: "/home/home_6",
      },
      {
        id: uuidv4(),
        name: "Crypto Consultant",
        condition: true,
        path: "/home/home_7",
      },
      {
        id: uuidv4(),
        name: "NFT Game",
        condition: true,
        path: "/home/home_8",
      },
      {
        id: uuidv4(),
        name: "Dao Platform",
        condition: true,
        path: "/home/home_9",
      },
      {
        id: uuidv4(),
        name: "Crypto App",
        condition: true,
        path: "/home/home_10",
      },
      {
        id: uuidv4(),
        name: "Crypto Trading",
        condition: true,
        path: "/home/home_11",
      },
      {
        id: uuidv4(),
        name: "ICO Landing",
        condition: true,
        path: "/home/home_12",
      },
    ],
  };

  const page = {
    id: 2,
    name: "Pages",
    pages: [
      {
        id: uuidv4(),
        name: "Maintenance",
        condition: true,
        path: "/maintenance",
      },
      {
        id: uuidv4(),
        name: "Case Studies",
        condition: true,
        path: "/case-studies",
      },
      {
        id: uuidv4(),
        name: "Single Case Study",
        condition: true,
        path: "/case-studies/case_study_1",
      },
      {
        id: uuidv4(),
        name: "Careers",
        condition: true,
        path: "/careers",
      },
      {
        id: uuidv4(),
        name: "Item Details",
        path: "/item/item_20",
      },
      {
        id: uuidv4(),
        name: "Explore Collections",
        path: "/collection/explore_collection",
      },
      {
        id: uuidv4(),
        name: "Collection",
        path: "/collection/avatar_1",
      },
      {
        id: uuidv4(),
        name: "Activity",
        path: "/activity",
      },
      {
        id: uuidv4(),
        name: "Rankings",
        path: "/rankings",
      },
      {
        id: uuidv4(),
        name: "User",
        path: "/user/avatar_6",
      },
      {
        id: uuidv4(),
        name: "Edit Profile",
        path: "/profile/user_avatar",
      },
      {
        id: uuidv4(),
        name: "About",
        path: "/about",
      },
      {
        id: uuidv4(),
        name: "Contact",
        path: "/contact",
      },
      {
        id: uuidv4(),
        name: "Wallet",
        path: "/wallet",
      },
      {
        id: uuidv4(),
        name: "Login",
        path: "/login",
      },
      {
        id: uuidv4(),
        name: "Page 404",
        path: "/404",
      },
      {
        id: uuidv4(),
        name: "Terms of Service",
        path: "/tarms",
      },
    ],
  };

  const explore = {
    id: 3,
    name: "Explore",
    pages: [
      {
        id: uuidv4(),
        name: "All NFTs",
        path: "/collection/explore_collection",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="h-4 w-4 fill-jacarta-700"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M22 12.999V20a1 1 0 0 1-1 1h-8v-8.001h9zm-11 0V21H3a1 1 0 0 1-1-1v-7.001h9zM11 3v7.999H2V4a1 1 0 0 1 1-1h8zm10 0a1 1 0 0 1 1 1v6.999h-9V3h8z" />
          </svg>
        ),
      },
      {
        id: uuidv4(),
        name: "Photography",
        path: "/collection/explore_collection",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="h-4 w-4 fill-[#428AF8]"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M2 6c0-.552.455-1 .992-1h18.016c.548 0 .992.445.992 1v14c0 .552-.455 1-.992 1H2.992A.994.994 0 0 1 2 20V6zm2 1v12h16V7H4zm10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM4 2h6v2H4V2z" />
          </svg>
        ),
      },
      {
        id: uuidv4(),
        name: "Art",
        path: "/art",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="h-4 w-4 fill-[#10B981]"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 2c5.522 0 10 3.978 10 8.889a5.558 5.558 0 0 1-5.556 5.555h-1.966c-.922 0-1.667.745-1.667 1.667 0 .422.167.811.422 1.1.267.3.434.689.434 1.122C13.667 21.256 12.9 22 12 22 6.478 22 2 17.522 2 12S6.478 2 12 2zm-1.189 16.111a3.664 3.664 0 0 1 3.667-3.667h1.966A3.558 3.558 0 0 0 20 10.89C20 7.139 16.468 4 12 4a8 8 0 0 0-.676 15.972 3.648 3.648 0 0 1-.513-1.86zM7.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        ),
      },
      {
        id: uuidv4(),
        name: "Sports",
        path: "/sports",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="h-4 w-4 fill-[#737EF2]"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm.366 11.366l-3.469 6.01a8.053 8.053 0 0 0 4.459.51 9.937 9.937 0 0 1 .784-5.494l-1.774-1.026zm3.518 2.031a7.956 7.956 0 0 0-.587 3.894 8.022 8.022 0 0 0 3.077-2.456l-2.49-1.438zm-7.025-4.055a9.95 9.95 0 0 1-4.365 3.428 8.01 8.01 0 0 0 2.671 3.604l3.469-6.008-1.775-1.024zm11.103-.13l-.258.12a7.947 7.947 0 0 0-2.82 2.333l2.492 1.439a7.975 7.975 0 0 0 .586-3.893zM4 12c0 .266.013.53.038.789a7.95 7.95 0 0 0 3.078-2.454L4.624 8.897A7.975 7.975 0 0 0 4 12zm12.835-6.374l-3.469 6.008 1.775 1.025a9.95 9.95 0 0 1 4.366-3.43 8.015 8.015 0 0 0-2.419-3.402l-.253-.201zM12 4c-.463 0-.916.04-1.357.115a9.928 9.928 0 0 1-.784 5.494l1.775 1.025 3.469-6.01A7.975 7.975 0 0 0 12 4zm-3.297.71l-.191.088a8.033 8.033 0 0 0-2.886 2.367l2.49 1.438a7.956 7.956 0 0 0 .587-3.893z" />
          </svg>
        ),
      },
      {
        id: uuidv4(),
        name: "Collectibles",
        path: "/collectibles",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="h-4 w-4 fill-[#FEB240]"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M17.5 2a4.5 4.5 0 0 1 2.951 7.897c.355.967.549 2.013.549 3.103A9 9 0 1 1 3.55 9.897a4.5 4.5 0 1 1 6.791-5.744 9.05 9.05 0 0 1 3.32 0A4.494 4.494 0 0 1 17.5 2zm0 2c-.823 0-1.575.4-2.038 1.052l-.095.144-.718 1.176-1.355-.253a7.05 7.05 0 0 0-2.267-.052l-.316.052-1.356.255-.72-1.176A2.5 2.5 0 1 0 4.73 8.265l.131.123 1.041.904-.475 1.295A7 7 0 1 0 19 13c0-.716-.107-1.416-.314-2.083l-.112-.33-.475-1.295 1.04-.904A2.5 2.5 0 0 0 17.5 4zM10 13a2 2 0 1 0 4 0h2a4 4 0 1 1-8 0h2z" />
          </svg>
        ),
      },
      {
        id: uuidv4(),
        name: "Trading Cards",
        path: "/tranding-cards",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="h-4 w-4 fill-[#8DD059]"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm2 2h6v6H6V7zm2 2v2h2V9H8zm-2 6h12v2H6v-2zm8-8h4v2h-4V7zm0 4h4v2h-4v-2z" />
          </svg>
        ),
      },
      {
        id: uuidv4(),
        name: "Domain Names",
        path: "/domain-names",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="h-4 w-4 fill-[#8358FF]"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M5 15v4h4v2H3v-6h2zm16 0v6h-6v-2h4v-4h2zm-8.001-9l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3H6.6l4.399-11h2zm-1 2.885L10.752 12h2.492l-1.245-3.115zM9 3v2H5v4H3V3h6zm12 0v6h-2V5h-4V3h6z" />
          </svg>
        ),
      },
      {
        id: uuidv4(),
        name: "Utility",
        path: "/utility",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="h-4 w-4 fill-[#EF3D3D]"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M22 7h1v10h-1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v3zm-2 10h-6a5 5 0 0 1 0-10h6V5H4v14h16v-2zm1-2V9h-7a3 3 0 0 0 0 6h7zm-7-4h3v2h-3v-2z" />
          </svg>
        ),
      },
      {
        id: uuidv4(),
        name: "Virtual Worlds",
        path: "/virtual-worlds",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            className="h-4 w-4 fill-[#46C7E3]"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z" />
          </svg>
        ),
      },
    ],
  };

  const resource = {
    id: 4,
    name: "Resources",
    pages: [
      {
        id: uuidv4(),
        name: "Help Center",
        path: "/help_center",
      },
      {
        id: uuidv4(),
        name: "Platform Status",
        path: "/platform_status",
      },
      {
        id: uuidv4(),
        name: "Partners",
        path: "/partners",
      },
      {
        id: uuidv4(),
        name: "Blog",
        path: "/blog",
      },
      {
        id: uuidv4(),
        name: "Single Post",
        path: "/single_post/post_1",
      },
      {
        id: uuidv4(),
        name: "Newsletter",
        path: "/newsletter",
      },
    ],
  };

  const mobileCollapse = (id) => {
    if (isCollapse === id) {
      return setCollapse(null);
    }
    setCollapse(id);
  };

  return (
    <>
      <header className="js-page-header fixed top-0 z-20 w-full backdrop-blur transition-colors">
        <div className="flex items-center  py-6   container wp-logo">
          <Link className="shrink-0" href="/">
            <a>
              <div className="dark:hidden ">
                <Image src={Logo} alt="" className="max-h-7 h-auto " />
              </div>
              <div className="hidden dark:block logo-icon">
                <Image src={WhiteLogo} alt="" />
              </div>
            </a>
          </Link>
          <div className="js-mobile-menu dark:bg-jacarta-800 invisible fixed inset-0 z-10 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent">
            <div className="ml-8 hidden items-center lg:flex xl:ml-12 icon-wallet">
              <ul className="social">
                <li>
                  <a href="#">
                    {" "}
                    <Image
                      src={Btnsocial1}
                      height={32}
                      width={32}
                      alt=" NFT Marketplace"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <Image
                      src={Btnsocial2}
                      height={32}
                      width={32}
                      alt="NFT Marketplace"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <Image
                      src={Btnsocial3}
                      height={32}
                      width={32}
                      alt="NFT Marketplace"
                    />
                  </a>
                </li>
              </ul>
              <div className="mt-1 w-full wl-mobile">
                <button
                  className="js-wallet wallet bg-button-2 button-custom-app"
                  onClick={() => wrapperFunction()}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
          <div className="ml-auto flex lg:hidden">
            <div className="mt-1 w-full wl-mobile">
              <button
                className="js-wallet wallet bg-button-2 button-custom-app"
                onClick={() => wrapperFunction()}
              >
                {" "}
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
