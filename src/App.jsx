import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Listings from "./pages/Listings/Listings";
import NftCollection from "./pages/NftCollection/NftCollection";
import SingleNft from "./pages/SingleNft/SingleNft";
import CreateListing from "./pages/CreateListing/CreateListing";
import BuyListing from "./pages/buyListing/BuyListing";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nftCollection" element={<NftCollection />} />
        <Route path="/singleNft/:id" element={<SingleNft />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/createListing" element={<CreateListing />} />
        <Route path="/buyListing/:id" element={<BuyListing />} />
      </Routes>
  );
}

export default App;
