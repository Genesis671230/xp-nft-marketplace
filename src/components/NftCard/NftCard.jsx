const NftCard = ( {nftData }) => {
  const sortedUri = nftData?.metadata?.uri?.split("ipfs://")[1]

  const organized = `https://ipfs.io/ipfs/${sortedUri}`;
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800">
        <div className="relative pb-3/4">
          <img className="w-full h-64 object-cover absolute inset-0" src={organized??"https://source.unsplash.com/random/?nfts"} alt={nftData?.name} />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50" />
        </div>
        <div className="px-6 py-4 relative z-10">
          <div className="font-bold text-2xl mb-2 text-gray-100">{nftData?.metadata?.name??"cryptoXP"}</div>
          <p className="text-gray-200 text-base">
            {nftData?.description??"its more amazing"}
          </p>
        </div>
        <div className="px-6 py-4 relative z-10">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{nftData?.category??"Mumbai"}</span>
        </div>
        <div className="relative z-0 flex items-center justify-center px-6 py-4 bg-gray-900 bg-opacity-25">
          <svg className="h-6 w-6 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
      </div>
    );
  };
  
  export default NftCard;