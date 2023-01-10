import AuthClient, { generateNonce } from "@walletconnect/auth-client";
import {Web3Modal} from "@web3modal/standalone";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import NftCollection from "./pages/NftCollection/NftCollection";
import SingleNft from "./pages/SingleNft/SingleNft";
import { SignClient } from "@walletconnect/sign-client";

function App() {




// const connectWallet = async () => {
//   const authClient = await AuthClient.init({
//     projectId: "037fed513c7859a3d4b02e0e9fe85777",
//     metadata: {
//       name: "XP NFT Marketplace",
//       description: "A dapp using WalletConnect AuthClient",
//       url: "https://xp.network/",
//       icons: ["https://my-auth-dapp.com/icons/logo.png"],
//     },
//   });

//   const signClient = await SignClient.init({
//     projectId: "037fed513c7859a3d4b02e0e9fe85777",
//     // optional parameters
//     relayUrl: "<YOUR RELAY URL>",
//     metadata: {
//       name: "Example Dapp",
//       description: "Example Dapp",
//       url: "#",
//       icons: ["https://walletconnect.com/walletconnect-logo.png"],
//     },
//   });
  
//   signClient.on("session_event", ({ event }) => {
//     // Handle session events, such as "chainChanged", "accountsChanged", etc.
//   });
  
//   signClient.on("session_update", ({ topic, params }) => {
//     const { namespaces } = params;
//     const _session = signClient.session.get(topic);
//     // Overwrite the `namespaces` of the existing session with the incoming one.
//     const updatedSession = { ..._session, namespaces };
//     // Integrate the updated session state into your dapp state.
//     onSessionUpdate(updatedSession);
//   });
  
//   signClient.on("session_delete", () => {
//     // Session was deleted -> reset the dapp state, clean up from user session, etc.
//   });
  
//   const web3Modal = new Web3Modal({
//     projectId: "037fed513c7859a3d4b02e0e9fe85777",
//     // `standaloneChains` can also be specified when calling `web3Modal.openModal(...)` later on.
//     standaloneChains: ["eip155:1"],
//   });

//   try {
//     const { uri, approval } = await signClient.connect({
//       // Optionally: pass a known prior pairing (e.g. from `signClient.core.pairing.getPairings()`) to skip the `uri` step.
//       pairingTopic: pairing?.topic,
//       // Provide the namespaces and chains (e.g. `eip155` for EVM-based chains) we want to use in this session.
//       requiredNamespaces: {
//         eip155: {
//           methods: [
//             "eth_sendTransaction",
//             "eth_signTransaction",
//             "eth_sign",
//             "personal_sign",
//             "eth_signTypedData",
//           ],
//           chains: ["eip155:1"],
//           events: ["chainChanged", "accountsChanged"],
//         },
//       },
//     });
  
//     // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
//     if (uri) {
//       web3Modal.openModal({ uri });
//       // Await session approval from the wallet.
//       const session = await approval();
//       // Handle the returned session (e.g. update UI to "connected" state).
//       // * You will need to create this function *
//       onSessionConnect(session);
//       // Close the QRCode modal in case it was open.
//       web3Modal.closeModal();
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };

// useEffect(() => {
  
//   connectWallet()
// }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/nftCollection" element={<NftCollection/>}/>
        <Route path="/singleNft/:id" element={<SingleNft/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
