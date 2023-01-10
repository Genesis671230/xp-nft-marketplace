import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "./store.ts";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
    <Provider store={store}>
      <Navbar />
      <App />
    </Provider>
  </ThirdwebProvider>
);
