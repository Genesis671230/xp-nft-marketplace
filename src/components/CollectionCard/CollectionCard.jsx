import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CollectionCard = ({ contractData }) => {
  const [collectionData, setCollectionData] = useState({});

  const getContractData = async () => {
    const contract = await contractData;
    const contractName = await contract.name();
    const contractSymbol = await contract.symbol();
    const contractBaseUri = await contract.tokenURI(0);

    const regex = /(?<=[a-z])(?=[A-Z0-9])/g;
    const organizedName = contractName.toString().replace(regex, " ");
    const contractBaseUriImage = await contract.tokenURI(0);
    const contractBaseUriImageOrganized = contractBaseUriImage.startsWith(
      "ipfs://"
    )
      ? contractBaseUriImage.replace("ipfs://", "https://ipfs.io/ipfs/")
      : contractBaseUriImage;
    const contractMetadata = await fetch(
      contractBaseUriImage.replace("ipfs://", "https://ipfs.io/ipfs/")
    );
    const contractMetadataJson = await contractMetadata.json();


    console.log(contractMetadataJson);
    setCollectionData({
      ...collectionData,
      name: organizedName,
      symbol: contractSymbol,
      baseUri: contractBaseUriImageOrganized,
      baseImage: contractMetadataJson.image,
    });
  };
  useEffect(() => {
    getContractData();
  }, []);


  return (
    <div>
      {collectionData && (
        <Link to="/nftCollection" state={{collectionData}}>
          <div>
            <div className=" w-[18rem] h-[18rem]">
              <img
                className=" object-contain"
                src={collectionData?.baseImage}
                alt=""
              />
            </div>
            <div> {collectionData?.name}</div>
            <div> {collectionData?.symbol}</div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CollectionCard;
