import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import App from "./App";
import Navbar from "./components/Navbar/Navbar.tsx";
import "./index.css";
import { store } from "./store.ts";
import { bsc } from "wagmi/chains";
import { BrowserRouter } from "react-router-dom";

const chains = [bsc, arbitrum, mainnet, polygon];

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "037fed513c7859a3d4b02e0e9fe85777" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <Provider store={store}>
        <WagmiConfig client={wagmiClient}>
          <Web3Modal
            defaultChain={bsc}
            themeMode="dark"
            themeColor="purple"
            projectId="037fed513c7859a3d4b02e0e9fe85777"
            ethereumClient={ethereumClient}
          />
          <Navbar />
          <App />
        </WagmiConfig>
      </Provider>
    </ThirdwebProvider>
  </BrowserRouter>
);
