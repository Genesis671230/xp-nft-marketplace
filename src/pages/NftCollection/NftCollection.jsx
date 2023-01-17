import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NftCollection = () => {
  const [collectionData, setCollectionData] = useState();

  const nftData = useSelector((state) => state.NftData.value);
  const getContractData = async () => {
    const contract = await nftData;
    const contractName = await contract.name();
    const contractSymbol = await contract.symbol();
    const regex = /(?<=[a-z])(?=[A-Z0-9])/g;
    const organizedName = contractName.toString().replace(regex, " ");

    const getMetadata = async (token) => {
      const tokenMetadata = await fetch(await contract.tokenURI(token), {
        cache: "no-cache",
      });

      const ourObj = await tokenMetadata.json();
      return ourObj;
    };
    const getTokenOwner = async (token) => {
      const tokenFunction = await contract.ownerOf(token);
      const owner = await fetch(tokenFunction);
      const ownerAddress = owner.url.toString().slice(-42);
      return ownerAddress;
    };
    let tokens = [];
    for (const item of [0, 1, 2, 3, 4]) {
      const metaData = await getMetadata(item);
      const tokenOwner = await getTokenOwner(item);
      const obj = { ...metaData, tokenOwner:tokenOwner };
      tokens.push(obj);
    }
    const wrappedCollectionNftData = {
      name: organizedName,
      symbol: contractSymbol,
      allTokens: tokens,
    };
    console.log(wrappedCollectionNftData);
    setCollectionData(wrappedCollectionNftData);
  };
  useEffect(() => {
    getContractData();
  }, []);
  console.log(nftData);

  return (
    <div className="bg-[#0d0d0d] ">
      <div class="bg-[#0d0d0d]">
        <div className="pt-4">
          <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class=" items-baseline pt-4 bg-gray-500 rounded-md w-full border-b border-gray-500 pt-15 pb-6">
              <h1 class="text-4xl ml-4 mt-4 font-bold tracking-tight text-gray-900">
                Listings
              </h1>
              <h1 class="text-md ml-4 mt-4 font-semibold tracking-tight text-gray-700">
                Explore Your NFTs
              </h1>
            </div>
            <section aria-labelledby="products-heading" class="pt-6 pb-24">
              {/* <h2 id="products-heading" class="sr-only">
                Products
              </h2> */}

              <div class="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
                <form class="hidden lg:block w-[10rem] mt-20">
                  <ul
                    role="list"
                    class="space-y-4 border-b border-gray-500 pb-6 text-sm font-medium text-gray-300 "
                  >
                    <li>
                      <a href="#" class="hover:text-stone-100">
                        Characters
                      </a>
                    </li>

                    <li>
                      <a href="#" class="hover:text-gray-300">
                        Swords
                      </a>
                    </li>

                    <li>
                      <a href="#" class="hover:text-gray-300">
                        Helmets
                      </a>
                    </li>

                    <li>
                      <a href="#" class="hover:text-gray-300">
                        Armour
                      </a>
                    </li>
                  </ul>
                  <div class="border-b border-gray-500 py-6">
                    <h3 class="my-3 flow-root">
                      <button
                        type="button"
                        class="flex w-full items-center justify-between bg-[#0d0d0d] py-3 text-sm text-white-400 hover:text-white"
                        aria-controls="filter-section-2"
                        aria-expanded="false"
                      >
                        <span class="font-medium text-white">Size</span>
                        <span class="ml-6 flex items-center">
                          <svg
                            class="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>
                          <svg
                            class="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div class="pt-6" id="filter-section-2">
                      <div class="space-y-4">
                        <div class="flex items-center">
                          <input
                            id="filter-size-0"
                            name="size[]"
                            value="2l"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-500 text-indigo-600 focus:ring-indigo-500"
                          ></input>
                          <label
                            for="filter-size-0"
                            class="ml-3 text-sm text-gray-600"
                          >
                            2L
                          </label>
                        </div>

                        <div class="flex items-center">
                          <input
                            id="filter-size-1"
                            name="size[]"
                            value="6l"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-500 text-indigo-600 focus:ring-indigo-500"
                          ></input>
                          <label
                            for="filter-size-1"
                            class="ml-3 text-sm text-gray-600"
                          >
                            6L
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            id="filter-size-2"
                            name="size[]"
                            value="12l"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-500 text-indigo-600 focus:ring-indigo-500"
                          ></input>
                          <label
                            for="filter-size-2"
                            class="ml-3 text-sm text-gray-600"
                          >
                            12L
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            id="filter-size-3"
                            name="size[]"
                            value="18l"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-500 text-indigo-600 focus:ring-indigo-500"
                          ></input>
                          <label
                            for="filter-size-3"
                            class="ml-3 text-sm text-gray-600"
                          >
                            18L
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            id="filter-size-4"
                            name="size[]"
                            value="20l"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-500 text-indigo-600 focus:ring-indigo-500"
                          ></input>
                          <label
                            for="filter-size-4"
                            class="ml-3 text-sm text-gray-600"
                          >
                            20L
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            id="filter-size-5"
                            name="size[]"
                            value="40l"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-500 text-indigo-600 focus:ring-indigo-500"
                          ></input>
                          <label
                            for="filter-size-5"
                            class="ml-3 text-sm text-gray-600"
                          >
                            40L
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="lg:col-span-3">
                  {collectionData?.allTokens?.length > 0 && (
                    <div>
                      <div className="text-left text-white text-[2rem] font-semibold font-sans w-full">
                        {" "}
                        {collectionData?.name}
                      </div>
                      <div className="flex gap-x-7 flex-wrap">
                        {collectionData?.allTokens?.map((token, index) => (
                          <div
                            className="w-[12rem] h-[12rem] my-20"
                            key={index}
                          >
                            <Link to={`/singleNft/${index}`}>
                              <div className="overflow-hidden cursor-pointer rounded-t-2xl">
                                <img
                                  src={token?.image}
                                  alt=""
                                  className=" transition-all duration-500  hover:scale-110 w-[12rem] h-[12rem] object-cover"
                                />
                              </div>
                            </Link>
                            <div className="font-sans text-slate-200 bg-slate-800 rounded-b-lg overflow-ellipsis h-[8rem] flex flex-col justify-between gap-2 p-4">
                              <div>
                                <div className="font-semibold">
                                  {token?.name}
                                </div>
                                <div className="text-xs">
                                  {token?.description}
                                </div>
                              </div>
                              <Link to={`/singleNft/${index}`}>
                                <div className=" transition-all duration-500  hover:scale-10 px-1 py-1 text-red-600 hover:bg-stone-900 font-semibold rounded-lg text-sm w-fit ml-auto cursor-pointer">
                                  Buy Now
                                </div>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default NftCollection;
