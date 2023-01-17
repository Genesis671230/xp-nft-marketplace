import { ConnectWallet } from "@thirdweb-dev/react";
import {
  Web3Button,
  Web3NetworkSwitch,
  useWeb3Modal,
  useWeb3ModalNetwork,
  useWeb3ModalTheme,
} from "@web3modal/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface Options {
  route?: "Account" | "ConnectWallet" | "Help" | "SelectNetwork";
}

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="">

      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full  md:px-24 ">
        <div className="relative flex items-center justify-between">
          <Link to="/">
            <span className="inline-flex items-center">
              <svg
                className="w-8 text-teal-accent-400"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12" />
                <rect x="3" y="17" width="7" height="6" />
                <rect x="14" y="1" width="7" height="6" />
                <rect x="14" y="11" width="7" height="12" />
              </svg>

              <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                XP Marketplace
              </span>
            </span>
          </Link>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <Link to="/">
              <li>
                <span className="  transition-all duration-500  font-medium tracking-wide text-gray-800 hover:text-teal-accent-400">
                  Marketplace
                </span>
              </li>
            </Link>

            <Link to="/listings">
              <li>
                <span className="font-medium tracking-wide text-gray-800 transition-colors duration-200 hover:text-teal-accent-400">
                  Listings
                </span>
              </li>
            </Link>

            <Link to="/createListing">
              <li>
                <span className="font-medium tracking-wide text-gray-800 transition-colors duration-200 hover:text-teal-accent-400">
                  Create listing
                </span>
              </li>
            </Link>
          </ul>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <ConnectWallet />
              {/* <a
                href="/"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                aria-label="Sign up"
                title="Sign up"
              >
                Sign up
              </a> */}
            </li>
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <Link to="/">
                      <div>
                        <span className="inline-flex items-center">
                          <svg
                            className="w-8 text-deep-purple-accent-400"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            stroke="currentColor"
                            fill="none"
                          >
                            <rect x="3" y="1" width="7" height="12" />
                            <rect x="3" y="17" width="7" height="6" />
                            <rect x="14" y="1" width="7" height="6" />
                            <rect x="14" y="11" width="7" height="12" />
                          </svg>
                          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            XP Marketplace
                          </span>
                        </span>
                      </div>
                    </Link>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <Link to="/">
                        <li>
                          <span className=" font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                            Marketplace
                          </span>
                        </li>
                      </Link>
                      <Link to="/listings">
                        <li>
                          <a
                            href="/"
                            aria-label="Our product"
                            title="Our product"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Listings
                          </a>
                        </li>
                      </Link>
                      <Link to="/createListing">
                        <li>
                          <a
                            href="/"
                            aria-label="Product pricing"
                            title="Product pricing"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Create listing
                          </a>
                        </li>
                      </Link>
                      <li>
                        <ConnectWallet />
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { theme, setTheme } = useWeb3ModalTheme();
  const navigate = useNavigate();
  const { isOpen, open, close } = useWeb3Modal();
  const { selectedChain, setSelectedChain } = useWeb3ModalNetwork();

  return (
    <nav className="bg-gray-800  text-white py-4 shadow-md ">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/">
          <div className="flex items-center">
            <span className="text-2xl font-semibold tracking-tight ml-2">
              XP Marketplace
            </span>
          </div>
        </Link>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex">
            <li className="ml-4">
              <a
                href="#"
                className="block font-semibold text-lg tracking-tight hover:text-gray-200"
              >
                Features
              </a>
            </li>
            <Link to="/listings">
              <li className="ml-4">
                <a
                  href="#"
                  className="block font-semibold text-lg tracking-tight hover:text-gray-200"
                >
                  Listings
                </a>
              </li>
            </Link>
            <li className="ml-4">
              <a
                href="#"
                className="block font-semibold text-lg tracking-tight hover:text-gray-200"
              >
                <ConnectWallet />

                {/* <Web3Button label="Connect Wallet" icon="hide" balance="show" /> */}
              </a>
            </li>
            <li className="ml-4">
              <a
                href="#"
                className="block font-semibold text-lg tracking-tight hover:text-gray-200"
              >
                {/* <Web3Modal projectId="037fed513c7859a3d4b02e0e9fe85777" ethereumClient={ethereumClient} /> */}
                {/* <Web3NetworkSwitch /> */}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
