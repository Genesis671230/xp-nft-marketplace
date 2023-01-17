import React, { useMemo, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import abi from "../../abis/abi.json";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import { useDispatch, useSelector } from "react-redux";
import { setNftData } from "../../redux/Reducers/NftDataSlice";
import { setAccountAddress } from "../../redux/Reducers/AccountSlice";
import { ethereumClient } from "../..";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";


const Home = () => {
  const [allContracts, setAllContracts] = useState();

  const [allNfts, setAllNfts] = useState([]);
  const address = useAddress();
  // const {
  //   contract: contractThirdWeb,
  //   isLoading,
  //   error,
  // } = useContract("0x58A7a5Af70499daC14Bc70A0898Ac3CE992Ee3AD")

  const nftData = useSelector((state) => state.NftData.value);
  const dispatch = useDispatch();

  const getContractData = async () => {
    // const contractsData = contractAddresses.map(async (address) =>{
    const provider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed.binance.org/"
    );

    const contract = new ethers.Contract(
      "0x5ADfa196fB3AD60a97149d7c2F542C4c2B738026",
      abi,
      provider
    );
    // return contract
    // })
    setAllContracts(contract);
    dispatch(setNftData(contract));
  };
  // const run = async () => {
  //   const nfts = await contractThirdWeb?.getAll();
  //   setAllNfts(nfts);
  // };

  useMemo(() => {
    //  run()
    getContractData();
    dispatch(setAccountAddress(ethereumClient.getAccount()?.address));
  }, []);

  const [show, setShow] = useState(false);
  return (
    <div className="App">
 

            <div className="lg:px-6 xl:px-0">
           
                <div className="mx-auto container relative z-0 px-4 xl:px-0">
                    <div className="flex flex-col-reverse md:flex-row">
                        <div className="md:w-3/5 md:pt-24 pb-10 lg:py-32 xl:py-48">
                            <h1 className="text-3xl lg:text-6xl xl:text-8xl font-black text-gray-900 text-center md:text-left tracking-tighter f-f-i md:w-7/12 leading-tight text-heading-color">ONE <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-500 to-red-800"> MARKETPLACE</span> TO RULE THEM ALL</h1>
                            <h2 className="md:w-8/12 py-4 text-center md:text-left md:py-8 text-gray-700 text-lg lg:text-2xl">Do you want to control your expenses and be always aware of how much money you have spent? </h2>
                            <div className="w-full flex justify-center md:block">
                                <button className="hover:opacity-90 bg-indigo-700 py-3 px-10 lg:py-7 lg:px-20 rounded-full text-white text-sm md:text-lg f-f-p">Learn More</button>
                            </div>
                        </div>
                        <div className="w-1/2 sm:w-2/5 h-64 md:h-auto m-auto flex items-center overflow-hidden">
                            {/* <img class="h-full" src="https://cdn.tuk.dev/assets/components/111220/Hero4/Rectangle.png" alt="Device"> */}
                            <img className="md:absolute md:w-1/2 md:-ml-28" src="https://cdn.tuk.dev/assets/components/111220/Hero4/Device - Macbook Pro.png" alt />
                        </div>
                    </div>
                </div>
            </div>

 

      <div className="flex float-right mr-20 mt-9 h-[20px]">
        <svg fill="none" viewBox="0 0 24 24" className="pr-2">
          <path
            d="M7.97992 8.7774C8.4494 8.01126 9.47044 7.765 10.4195 7.77796L11.5327 7.80677L4.97152 18.3282L5.74486 18.7732L12.3852 7.81685L15.3202 7.80677L8.6971 19.0397L11.4578 20.6281L11.7876 20.8182C11.9302 20.8744 12.0871 20.8773 12.2326 20.8268L14.8435 19.3133L12.0554 14.9382L13.7577 12.0508L17.4184 17.8213L15.6514 18.8453L19.5354 16.5944L18.1385 17.4037L14.2775 11.1579L15.7609 8.64059L19.75 14.8533V16.145C19.7471 16.3193 19.6679 16.4835 19.5354 16.5958L18.1385 17.4051L17.4184 17.8228L14.8435 19.3147L12.2326 20.8283C12.0886 20.8787 11.9302 20.8758 11.7876 20.8196L8.69854 19.0425L8.06777 20.1126L10.8443 21.7111C10.9365 21.7629 11.0186 21.809 11.0848 21.8479C11.1885 21.9055 11.2591 21.9458 11.285 21.9573C11.5168 22.0596 11.7689 22.1114 12.0223 22.1086C12.2556 22.1086 12.486 22.0653 12.7021 21.9804L20.2871 17.588C20.7206 17.251 20.9813 16.7398 21.0014 16.1911V7.79237C20.9741 7.17744 20.6457 6.61579 20.1244 6.29033L12.8259 2.09383C12.2974 1.83461 11.6796 1.83461 11.1525 2.09383C11.092 2.12407 4.05704 6.20392 4.05704 6.20392C3.95912 6.25144 3.86551 6.30617 3.77766 6.36953C3.31539 6.69932 3.0288 7.22208 3 7.78805V16.4777"
            fill="#646D75"
          ></path>
        </svg>
        <svg
          fill="none"
          viewBox="0 0 20 20"
          className="pr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M6.0688 17H3.41651C2.85918 17 2.58388 17 2.41603 16.8926C2.23472 16.7751 2.12393 16.5804 2.1105 16.3654C2.10042 16.1674 2.23809 15.9256 2.51338 15.4422L9.06224 3.89893C9.3409 3.40875 9.4819 3.16366 9.65983 3.07302C9.8512 2.97566 10.0795 2.97566 10.2709 3.07302C10.4488 3.16366 10.5898 3.40875 10.8685 3.89893L12.2148 6.24907L12.2217 6.26106C12.5226 6.78692 12.6752 7.05359 12.7419 7.33348C12.8157 7.639 12.8157 7.9613 12.7419 8.26683C12.6747 8.54884 12.5237 8.81744 12.2181 9.35125L8.77819 15.4321L8.76929 15.4477C8.46633 15.9779 8.31279 16.2466 8.10001 16.4493C7.86835 16.671 7.58969 16.832 7.28416 16.9228C7.0055 17 6.69328 17 6.0688 17ZM12.7667 17H16.5672C17.1278 17 17.4099 17 17.5779 16.8894C17.7591 16.7718 17.8732 16.5736 17.8834 16.3589C17.8931 16.1673 17.7584 15.9349 17.4945 15.4795C17.4854 15.464 17.4763 15.4482 17.467 15.4322L15.5634 12.1756L15.5417 12.1389C15.2742 11.6865 15.1392 11.4581 14.9658 11.3698C14.7745 11.2724 14.5494 11.2724 14.3581 11.3698C14.1835 11.4605 14.0425 11.6988 13.7639 12.1789L11.867 15.4356L11.8605 15.4468C11.5828 15.9261 11.444 16.1656 11.454 16.3622C11.4674 16.5771 11.5782 16.7751 11.7595 16.8926C11.924 17 12.2061 17 12.7667 17Z"
            fill="#646D75"
            fill-rule="evenodd"
          ></path>
        </svg>
        <svg
          fill="none"
          viewBox="0 0 21 24"
          className="pr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 3.68L10.37 0L16.74 3.68L14.4 5.04L10.37 2.72L6.34 5.04L4 3.68V3.68ZM16.74 8.32L14.4 6.96L10.37 9.28L6.34 6.96L4 8.32V11.04L8.03 13.36V18L10.37 19.36L12.71 18V13.36L16.74 11.04V8.32V8.32ZM16.74 15.67V12.95L14.4 14.31V17.03L16.74 15.67V15.67ZM18.4 16.63L14.37 18.95V21.67L20.74 17.99V10.64L18.4 12V16.64V16.63ZM16.06 6L18.4 7.36V10.08L20.74 8.72V6L18.4 4.64L16.06 6ZM8.03 19.93V22.65L10.37 24.01L12.71 22.65V19.93L10.37 21.29L8.03 19.93ZM4 15.67L6.34 17.03V14.31L4 12.95V15.67V15.67ZM8.03 5.99L10.37 7.35L12.71 5.99L10.37 4.63L8.03 5.99ZM2.34 7.35L4.68 5.99L2.34 4.63L0 5.99V8.71L2.34 10.07V7.35V7.35ZM2.34 11.99L0 10.63V17.98L6.37 21.66V18.94L2.34 16.62V11.98V11.99Z"
            fill="#646D75"
          ></path>
        </svg>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="pr-2"
        >
          <path
            d="M18.527 12.2062L12 16.1938L5.46875 12.2062L12 1L18.527 12.2062ZM12 17.4742L5.46875 13.4867L12 23L18.5312 13.4867L12 17.4742Z"
            fill="#646D75"
          ></path>
        </svg>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="pr-2"
        >
          <path
            d="M18.9724 5.95801L12.9745 11.9133L18.9724 17.8658C21.9328 14.4592 21.9328 9.36464 18.9724 5.95801Z"
            fill="#646D75"
          ></path>
          <path
            d="M11.985 21L17.7743 18.5992L11.985 12.8525L6.19666 18.5992L11.985 21Z"
            fill="#646D75"
          ></path>
          <path
            d="M12.4666 3L7.20337 15.7014L11.4907 11.4168L17.7725 5.17857L12.4666 3Z"
            fill="#646D75"
          ></path>
          <path
            d="M10.3815 4.54102L2.81995 12.0635C2.85078 14.146 3.58816 16.1286 4.91689 17.7177L10.3815 4.54102Z"
            fill="#646D75"
          ></path>
        </svg>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="pr-2"
        >
          <path
            d="M4.73712 18.316C3.34521 18.316 2.20484 17.9884 1.31589 17.3334C0.43863 16.6667 0 15.7193 0 14.4912C0 14.2338 0.0292665 13.918 0.0877068 13.5437C0.239839 12.7016 0.456209 11.6898 0.736909 10.5084C1.53226 7.29187 3.58505 5.68359 6.89521 5.68359C7.79584 5.68359 8.60288 5.83563 9.31641 6.13971C10.0299 6.4321 10.5913 6.87662 11.0007 7.47317C11.4101 8.05795 11.6148 8.7598 11.6148 9.57852C11.6148 9.82416 11.5856 10.1341 11.527 10.5084C11.3516 11.5494 11.1411 12.5612 10.8954 13.5437C10.4861 15.1462 9.77841 16.3451 8.77249 17.1404C7.76657 17.9241 6.42151 18.316 4.73712 18.316ZM4.98276 15.7895C5.63785 15.7895 6.19336 15.5965 6.64957 15.2105C7.11747 14.8245 7.45081 14.2338 7.6496 13.4385C7.91861 12.339 8.12339 11.3798 8.26374 10.5611C8.31049 10.3154 8.33386 10.064 8.33386 9.80658C8.33386 8.74222 7.77826 8.20999 6.66715 8.20999C6.01206 8.20999 5.45065 8.40298 4.98276 8.78897C4.52664 9.17505 4.1991 9.76572 4.00031 10.5611C3.78974 11.3447 3.57916 12.3039 3.36869 13.4385C3.32184 13.6723 3.29846 13.918 3.29846 14.1753C3.29846 15.2514 3.85996 15.7895 4.98276 15.7895Z"
            fill="#646D75"
          ></path>
          <path
            d="M12.4202 18.1399C12.2915 18.1399 12.192 18.099 12.1219 18.0171C12.0633 17.9235 12.0459 17.8183 12.0692 17.7013L14.4904 6.29703C14.5138 6.16837 14.5781 6.06308 14.6834 5.98117C14.7887 5.89935 14.8998 5.8584 15.0168 5.8584H19.6838C20.9821 5.8584 22.0231 6.12741 22.8067 6.66543C23.6022 7.20355 23.9998 7.98132 23.9998 8.99893C23.9998 9.29132 23.9648 9.59549 23.8946 9.91125C23.6022 11.2564 23.0115 12.2506 22.1225 12.894C21.2453 13.5373 20.0405 13.8589 18.5082 13.8589H16.1397L15.3326 17.7013C15.3092 17.83 15.2448 17.9352 15.1396 18.0171C15.0343 18.099 14.9232 18.1399 14.8063 18.1399H12.4202ZM18.6311 11.4377C19.1223 11.4377 19.5492 11.3032 19.9118 11.0341C20.2861 10.7651 20.5318 10.3792 20.6487 9.87619C20.6838 9.67731 20.7014 9.50189 20.7014 9.34985C20.7014 9.01062 20.602 8.7533 20.4031 8.57788C20.2042 8.39069 19.8651 8.29718 19.3855 8.29718H17.28L16.6134 11.4377H18.6311Z"
            fill="#646D75"
          ></path>
        </svg>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="pr-2"
        >
          <path
            d="M17.0436 8.69125C16.6788 8.47701 16.203 8.47701 15.7986 8.69125L12.9437 10.3456L11.0048 11.4247L8.14995 13.0791C7.78516 13.2933 7.30935 13.2933 6.90491 13.0791L4.63689 11.7858C4.2721 11.5715 4.01437 11.1748 4.01437 10.7424V8.19137C4.01437 7.75893 4.23245 7.36616 4.63689 7.14796L6.86923 5.89032C7.23401 5.67608 7.70982 5.67608 8.11426 5.89032L10.3466 7.14796C10.7114 7.36219 10.9691 7.75893 10.9691 8.19137V9.84574L12.908 8.73092V7.07655C12.908 6.64411 12.69 6.25134 12.2855 6.03314L8.15391 3.66068C7.78912 3.44644 7.31331 3.44644 6.90888 3.66068L2.70589 6.03314C2.30145 6.24737 2.08337 6.64411 2.08337 7.07655V11.8572C2.08337 12.2896 2.30145 12.6824 2.70589 12.9006L6.91284 15.273C7.27763 15.4873 7.75344 15.4873 8.15788 15.273L11.0127 13.6544L12.9517 12.5396L15.8065 10.9209C16.1713 10.7067 16.6471 10.7067 17.0516 10.9209L19.2839 12.1785C19.6487 12.3928 19.9064 12.7895 19.9064 13.2219V15.7729C19.9064 16.2054 19.6883 16.5981 19.2839 16.8163L17.0516 18.1097C16.6868 18.3239 16.211 18.3239 15.8065 18.1097L13.5742 16.852C13.2094 16.6378 12.9517 16.2411 12.9517 15.8086V14.1543L11.0127 15.2691V16.9235C11.0127 17.3559 11.2308 17.7487 11.6353 17.9669L15.8422 20.3393C16.207 20.5536 16.6828 20.5536 17.0872 20.3393L21.2942 17.9669C21.659 17.7526 21.9167 17.3559 21.9167 16.9235V12.1428C21.9167 11.7104 21.6986 11.3176 21.2942 11.0994L17.0436 8.69125Z"
            fill="#646D75"
          ></path>
        </svg>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="pr-2"
        >
          <path
            d="M20.8513 16.615L17.898 19.7817C17.8341 19.8505 17.7568 19.9054 17.6707 19.9429C17.5847 19.9805 17.4919 19.9999 17.398 20H3.39807C3.3313 20 3.26599 19.9805 3.21013 19.9439C3.15427 19.9073 3.1103 19.8552 3.08359 19.794C3.05688 19.7328 3.0486 19.6652 3.05976 19.5993C3.07091 19.5335 3.10102 19.4723 3.1464 19.4233L6.09639 16.2567C6.16028 16.1879 6.23763 16.133 6.32366 16.0954C6.40967 16.0579 6.50252 16.0384 6.59639 16.0383H20.5963C20.6637 16.037 20.73 16.0555 20.7868 16.0917C20.8437 16.1279 20.8887 16.1801 20.9158 16.2418C20.9432 16.3034 20.9515 16.3717 20.94 16.4382C20.9285 16.5046 20.8977 16.5661 20.8513 16.615ZM17.898 10.2367C17.8339 10.1682 17.7565 10.1136 17.6705 10.076C17.5845 10.0385 17.4918 10.0189 17.398 10.0184H3.39807C3.3313 10.0184 3.26599 10.0379 3.21013 10.0745C3.15427 10.1111 3.1103 10.1632 3.08359 10.2244C3.05688 10.2856 3.0486 10.3532 3.05976 10.4191C3.07091 10.4849 3.10102 10.5461 3.1464 10.5951L6.09639 13.7634C6.16051 13.8318 6.23793 13.8865 6.32389 13.9241C6.40986 13.9616 6.50259 13.9812 6.59639 13.9817H20.5963C20.663 13.9813 20.728 13.9616 20.7837 13.9249C20.8393 13.8882 20.883 13.8361 20.9095 13.7749C20.936 13.7138 20.9442 13.6463 20.9328 13.5806C20.9217 13.5149 20.8917 13.4539 20.8463 13.405L17.898 10.2367ZM3.39807 7.96171H17.398C17.4919 7.96163 17.5847 7.94218 17.6707 7.90462C17.7568 7.86707 17.8341 7.81217 17.898 7.74338L20.8513 4.57674C20.8977 4.52782 20.9285 4.46629 20.94 4.39987C20.9515 4.33346 20.9432 4.26513 20.9158 4.20349C20.8887 4.14185 20.8437 4.08964 20.7868 4.05345C20.73 4.01725 20.6637 3.99868 20.5963 4.00007H6.59639C6.50252 4.00017 6.40967 4.01961 6.32366 4.05717C6.23763 4.09474 6.16028 4.14962 6.09639 4.21841L3.1464 7.38505C3.10102 7.43403 3.07091 7.4952 3.05976 7.56103C3.0486 7.62687 3.05688 7.69452 3.08359 7.75572C3.1103 7.81692 3.15427 7.869 3.21013 7.90558C3.26599 7.94218 3.3313 7.96168 3.39807 7.96171Z"
            fill="#646D75"
          ></path>
        </svg>
        <div>
          <h3 className=" text-semibold px-2 border-solid border-2 border-gray-500 rounded-lg ">
            All Chains
          </h3>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-col mt-10 flex-wrap w-full justify-between m-10">
          <CollectionCard contractData={allContracts} />
        </div>
      </div>


  

      <div>
            <div className="2xl:mx-auto 2xl:container md:px-20 px-4 md:py-12 py-9">
                <div className="relative rounded-md">
                    <img src="https://i.ibb.co/SBpL1cK/pexels-aleksandar-pasaric-325185-1.png" alt="city view" className="w-full h-full rounded-md  object-center object-fill absolute sm:block hidden" />
                    <img src="https://i.ibb.co/LQpxBsc/mobile.png" alt="city view" className="w-full h-full rounded-md absolute object-center object-fill sm:hidden" />
                    <div className="text-xl relative z-20 bg-gradient-to-r from-blue-700 to-transparent w-full h-full z-40 top-0 md:p-16 p-6 flex flex-col justify-between rounded-md ">
                        <div>
                            <h1 className="md:text-5xl text-3xl font-bold md:leading-10 leading-9 text-white sm:w-auto w-64">Act Before It’s Too Late!</h1>
                            <p className="text-lg leading-6 text-white xl:w-5/12 lg:w-8/12 md:w-10/12  2xl:pr-12 mt-4">A good idiom for kids is "It's raining cats and dogs." Kids know what both cats and dogs are from an early age.</p>
                        </div>
                        <div className="md:mt-12 mt-20">
                            <button className="text-base font-medium leading-4 text-indigo-700 bg-white sm:w-auto w-full rounded p-4 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-white">Explore More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>




<section>
    <div class="bg-black text-white py-8">
    <div class="container mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">
      <div class="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
        <p class="ml-2 text-yellow-300 uppercase tracking-loose">Airdrop Process</p>
        <p class="text-3xl md:text-4xl leading-normal md:leading-relaxed mb-2">Steps to win Airdrop</p>
        <p class="text-sm md:text-base text-gray-50 mb-4">
          Here’s your guide to the tech fest 2023 process. Go through all the steps to know the exact process of the participation in Airdrop.
        </p>
        <a href="#"
        class="bg-transparent mr-auto hover:bg-yellow-300 text-yellow-300 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
        Explore Now</a>
      </div>
      <div class="ml-0 md:ml-12 lg:w-2/3 sticky">
        <div class="container mx-auto w-full h-full">
          <div class="relative wrap overflow-hidden p-10 h-full">
            <div class="border-2-2 border-yellow-555 absolute h-full border"
              style={{right:" 50%", border:" 2px solid #FFC100", borderRadius: "1%"}}></div>
            <div class="border-2-2 border-yellow-555 absolute h-full border"
              style={{left:" 50%", border:" 2px solid #FFC100", borderRadius: "1%"}}></div>
            <div class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div class="order-1 w-5/12"></div>
              <div class="order-1 w-5/12 px-1 py-4 text-right">
                <p class="mb-3 text-base text-yellow-300">1-6 May, 2023</p>
                <h4 class="mb-3 font-bold text-lg md:text-2xl">Registration</h4>
                <p class="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                  Pick your favourite event(s) and register in that event by filling the form corresponding to that
                  event. Its that easy :)
                </p>
              </div>
            </div>
            <div class="mb-8 flex justify-between items-center w-full right-timeline">
              <div class="order-1 w-5/12"></div>
              <div class="order-1  w-5/12 px-1 py-4 text-left">
                <p class="mb-3 text-base text-yellow-300">6-9 May, 2023</p>
                <h4 class="mb-3 font-bold text-lg md:text-2xl">Participation</h4>
                <p class="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                  Participate online. The links for your registered events will be sent to you via email and whatsapp
                  groups. Use those links and show your talent.
                </p>
              </div>
            </div>
            <div class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div class="order-1 w-5/12"></div>
              <div class="order-1 w-5/12 px-1 py-4 text-right">
                <p class="mb-3 text-base text-yellow-300"> 10 May, 2023</p>
                <h4 class="mb-3 font-bold text-lg md:text-2xl">Result Declaration</h4>
                <p class="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                  The ultimate genius will be revealed by our judging panel on 10th May, 2021 and the resukts will be
                  announced on the whatsapp groups and will be mailed to you.
                </p>
              </div>
            </div>

            <div class="mb-8 flex justify-between items-center w-full right-timeline">
              <div class="order-1 w-5/12"></div>

              <div class="order-1  w-5/12 px-1 py-4">
                <p class="mb-3 text-base text-yellow-300">12 May, 2021</p>
                <h4 class="mb-3 font-bold  text-lg md:text-2xl text-left">Prize Distribution</h4>
                <p class="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                  The winners will be contacted by our team for their addresses and the winning goodies will be sent at
                  their addresses.
                </p>
              </div>
            </div>
          </div>
          <img class="mx-auto -mt-36 md:-mt-36" src="https://user-images.githubusercontent.com/54521023/116968861-ef21a000-acd2-11eb-95ac-a34b5b490265.png" />
        </div>
      </div>
    </div>
  </div>
  </section>

        <div>
            <div className="container flex justify-center flex-wrap mx-auto pt-16">
                <div>
                    <p className="text-gray-500 text-lg text-center font-normal pb-3">BUILDING TEAM</p>
                    <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">The Talented People Behind the Scenes of the Organization</h1>
                </div>
            </div>
            <div className="w-full bg-gray-100 px-10 pt-10">
                <div className="container mx-auto">
                    <div className="lg:flex md:flex sm:flex items-center xl:justify-center flex-wrap md:justify-around sm:justify-around lg:justify-around gap-4">
                        <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                            <div className="rounded overflow-hidden shadow-md bg-white">
                                <div className="absolute -mt-20 w-full flex justify-center">
                                    <div className="h-32 w-32">
                                        <img src="https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif" alt className="rounded-full object-cover h-full w-full shadow-md" />
                                    </div>
                                </div>
                                <div className="px-6 mt-16">
                                    <div className="font-bold text-3xl text-center pb-1">Andres Berlin</div>
                                    <p className="text-gray-800 text-sm text-center">Chief Executive Officer</p>
                                    <p className="text-center text-gray-600 text-base pt-3 font-normal">The CEO's role in raising a company's corporate IQ is to establish an atmosphere that promotes knowledge sharing and collaboration.</p>
                                    <div className="w-full flex justify-center pt-5 pb-5">
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter">
                                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                            <div className="rounded overflow-hidden shadow-md bg-white">
                                <div className="absolute -mt-20 w-full flex justify-center">
                                    <div className="h-32 w-32">
                                        <img src="https://cdn.tuk.dev/assets/photo-1530577197743-7adf14294584.jfif" alt className="rounded-full object-cover h-full w-full shadow-md" />
                                    </div>
                                </div>
                                <div className="px-6 mt-16">
                                    <div className="font-bold text-3xl text-center pb-1">Silene Tokyo</div>
                                    <p className="text-gray-800 text-sm text-center">Product Design Head</p>
                                    <p className="text-center text-gray-600 text-base pt-3 font-normal">The emphasis on innovation and technology in our companies has resulted in a few of them establishing global benchmarks in product design and development.</p>
                                    <div className="w-full flex justify-center pt-5 pb-5">
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter">
                                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                            <div className="rounded overflow-hidden shadow-md bg-white">
                                <div className="absolute -mt-20 w-full flex justify-center">
                                    <div className="h-32 w-32">
                                        <img src="https://cdn.tuk.dev/assets/photo-1566753323558-f4e0952af115.jfif" alt className="rounded-full object-cover h-full w-full shadow-md" />
                                    </div>
                                </div>
                                <div className="px-6 mt-16">
                                    <div className="font-bold text-3xl text-center pb-1">Johnson Stone</div>
                                    <p className="text-gray-800 text-sm text-center">Manager Development</p>
                                    <p className="text-center text-gray-600 text-base pt-3 font-normal">Our services encompass the assessment and repair of property damage caused by water, fire, smoke, or mold. We can also be a part of the restoration.</p>
                                    <div className="w-full flex justify-center pt-5 pb-5">
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter">
                                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                            <div className="rounded overflow-hidden shadow-md bg-white">
                                <div className="absolute -mt-20 w-full flex justify-center">
                                    <div className="h-32 w-32">
                                        <img src="https://cdn.tuk.dev/assets/boy-smiling_23-2148155640.jpg" alt className="rounded-full object-cover h-full w-full shadow-md" />
                                    </div>
                                </div>
                                <div className="px-6 mt-16">
                                    <div className="font-bold text-3xl text-center pb-1">Dean Jones</div>
                                    <p className="text-gray-800 text-sm text-center">Principal Software Engineer</p>
                                    <p className="text-center text-gray-600 text-base pt-3 font-normal">An avid open-source developer who loves to be creative and inventive. I have 20 years of experience in the field.</p>
                                    <div className="w-full flex justify-center pt-5 pb-5">
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter">
                                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                            <div className="rounded overflow-hidden shadow-md bg-white">
                                <div className="absolute -mt-20 w-full flex justify-center">
                                    <div className="h-32 w-32">
                                        <img src="https://cdn.tuk.dev/assets/blond-man-happy-expression_1194-2873.jpg" alt className="rounded-full object-cover h-full w-full shadow-md" />
                                    </div>
                                </div>
                                <div className="px-6 mt-16">
                                    <div className="font-bold text-3xl text-center pb-1">Rachel Adams</div>
                                    <p className="text-gray-800 text-sm text-center">Product Design Head</p>
                                    <p className="text-center text-gray-600 text-base pt-3 font-normal">Product designer with interests in immersive computing and XR, political ventures, and emerging technologies. Able to take ideas and give them a life.</p>
                                    <div className="w-full flex justify-center pt-5 pb-5">
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter">
                                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                            <div className="rounded overflow-hidden shadow-md bg-white">
                                <div className="absolute -mt-20 w-full flex justify-center">
                                    <div className="h-32 w-32">
                                        <img src="https://cdn.tuk.dev/assets/photo-1570211776045-af3a51026f4a.jfif" alt className="rounded-full object-cover h-full w-full shadow-md" />
                                    </div>
                                </div>
                                <div className="px-6 mt-16">
                                    <div className="font-bold text-3xl text-center pb-1">Charles Keith</div>
                                    <p className="text-gray-800 text-sm text-center">UX Designer</p>
                                    <p className="text-center text-gray-600 text-base pt-3 font-normal">A UX designer is the voice of the customer. Our job is to look beyond the business goals. We don't just experience user interface but also questions it.</p>
                                    <div className="w-full flex justify-center pt-5 pb-5">
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter">
                                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="mx-5">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>





        <div>
                <h2 className="text-2xl mt-10 leading-6 text-gray-800 text-center px-4">Testimonials</h2>
                <h1 className="lg:text-5xl md:text-4xl text-2xl font-semibold px-4 leading-10 text-gray-800 mt-6 text-center">What our client says</h1>
                <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:px-20 px-10 py-20 gap-6">
                    <div>
                        <div className="group w-full bg-white relative flex flex-col items-center hover:bg-indigo-700 cursor-pointer shadow-md md:p-12 p-6">
                            <div className="text-gray-600 group-hover:text-white flex flex-col items-center">
                                <svg width={26} height={27} viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0)">
                                        <path d="M25.2578 14.3309H19.2969C19.3988 9.55819 20.6309 9.01642 22.1785 8.86178L22.7753 8.78051V3.53242L22.0874 3.57292C20.0666 3.69783 17.8323 4.09805 16.3417 6.11965C15.035 7.89183 14.459 10.7871 14.459 15.2316V23.4673H25.2578V14.3309Z" fill="currentColor" />
                                        <path d="M11.48 23.4673V14.3309H5.59859C5.70049 9.55819 6.89283 9.01642 8.44042 8.86178L8.99749 8.78051V3.53242L8.34931 3.57292C6.32844 3.69783 4.07421 4.09805 2.5836 6.11965C1.27707 7.89183 0.681147 10.7871 0.681147 15.2316V23.4673H11.48Z" fill="currentColor" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="24.5767" height={27} fill="white" transform="translate(25.2578 27) rotate(-180)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p className="xl:w-80 text-base leading-normal text-center mt-4">When our designs need an expert opinion or approval, I know I can rely on your agency Thank you for all your help-I will be recommending you to everyone</p>
                            </div>
                            <div className="text-white group-hover:text-indigo-700 absolute bottom-0 -mb-6">
                                <svg width={34} height={28} viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_dd)">
                                        <path d="M17 19L28.2583 3.25H5.74167L17 19Z" fill="currentColor" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_dd" x="0.741699" y="0.25" width="32.5167" height="27.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                            <feMorphology radius={1} operator="erode" in="SourceAlpha" result="effect1_dropShadow" />
                                            <feOffset dy={4} />
                                            <feGaussianBlur stdDeviation={3} />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                            <feOffset dy={2} />
                                            <feGaussianBlur stdDeviation="2.5" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                            <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-10">
                            <img src="https://i.ibb.co/ZgF5Zzz/avatar-1.png" alt="profile pictre" className="w-12 h-12" />
                            <p className="text-base font-semibold leading-4 my-2 text-gray-800">Tom Koch</p>
                            <p className="text-base leading-4 text-center text-gray-600">Developer</p>
                        </div>
                    </div>
                    <div>
                        <div className="group w-full bg-white relative flex flex-col items-center hover:bg-indigo-700 cursor-pointer shadow-md md:p-12 p-6">
                            <div className="text-gray-600 group-hover:text-white flex flex-col items-center">
                                <svg width={26} height={27} viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0)">
                                        <path d="M25.2578 14.3309H19.2969C19.3988 9.55819 20.6309 9.01642 22.1785 8.86178L22.7753 8.78051V3.53242L22.0874 3.57292C20.0666 3.69783 17.8323 4.09805 16.3417 6.11965C15.035 7.89183 14.459 10.7871 14.459 15.2316V23.4673H25.2578V14.3309Z" fill="currentColor" />
                                        <path d="M11.48 23.4673V14.3309H5.59859C5.70049 9.55819 6.89283 9.01642 8.44042 8.86178L8.99749 8.78051V3.53242L8.34931 3.57292C6.32844 3.69783 4.07421 4.09805 2.5836 6.11965C1.27707 7.89183 0.681147 10.7871 0.681147 15.2316V23.4673H11.48Z" fill="currentColor" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="24.5767" height={27} fill="white" transform="translate(25.2578 27) rotate(-180)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p className="xl:w-80 text-base leading-normal text-center mt-4">When our designs need an expert opinion or approval, I know I can rely on your agency Thank you for all your help-I will be recommending you to everyone</p>
                            </div>
                            <div className="text-white group-hover:text-indigo-700 absolute bottom-0 -mb-6">
                                <svg width={34} height={28} viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_dd)">
                                        <path d="M17 19L28.2583 3.25H5.74167L17 19Z" fill="currentColor" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_dd" x="0.741699" y="0.25" width="32.5167" height="27.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                            <feMorphology radius={1} operator="erode" in="SourceAlpha" result="effect1_dropShadow" />
                                            <feOffset dy={4} />
                                            <feGaussianBlur stdDeviation={3} />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                            <feOffset dy={2} />
                                            <feGaussianBlur stdDeviation="2.5" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                            <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-10">
                            <img src="https://i.ibb.co/8BLjmqz/avatar-2.png" alt="profile pictre" className="w-12 h-12" />
                            <p className="text-base font-semibold leading-4 my-2 text-gray-800">Alan Max</p>
                            <p className="text-base leading-4 text-center text-gray-600">Designer</p>
                        </div>
                    </div>
                    <div>
                        <div className="group w-full bg-white relative flex flex-col items-center hover:bg-indigo-700 cursor-pointer shadow-md md:p-12 p-6">
                            <div className="text-gray-600 group-hover:text-white flex flex-col items-center">
                                <svg width={26} height={27} viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0)">
                                        <path d="M25.2578 14.3309H19.2969C19.3988 9.55819 20.6309 9.01642 22.1785 8.86178L22.7753 8.78051V3.53242L22.0874 3.57292C20.0666 3.69783 17.8323 4.09805 16.3417 6.11965C15.035 7.89183 14.459 10.7871 14.459 15.2316V23.4673H25.2578V14.3309Z" fill="currentColor" />
                                        <path d="M11.48 23.4673V14.3309H5.59859C5.70049 9.55819 6.89283 9.01642 8.44042 8.86178L8.99749 8.78051V3.53242L8.34931 3.57292C6.32844 3.69783 4.07421 4.09805 2.5836 6.11965C1.27707 7.89183 0.681147 10.7871 0.681147 15.2316V23.4673H11.48Z" fill="currentColor" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="24.5767" height={27} fill="white" transform="translate(25.2578 27) rotate(-180)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p className="xl:w-80 text-base leading-normal text-center mt-4">When our designs need an expert opinion or approval, I know I can rely on your agency Thank you for all your help-I will be recommending you to everyone</p>
                            </div>
                            <div className="text-white group-hover:text-indigo-700 absolute bottom-0 -mb-6">
                                <svg width={34} height={28} viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_dd)">
                                        <path d="M17 19L28.2583 3.25H5.74167L17 19Z" fill="currentColor" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_dd" x="0.741699" y="0.25" width="32.5167" height="27.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                            <feMorphology radius={1} operator="erode" in="SourceAlpha" result="effect1_dropShadow" />
                                            <feOffset dy={4} />
                                            <feGaussianBlur stdDeviation={3} />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                            <feOffset dy={2} />
                                            <feGaussianBlur stdDeviation="2.5" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                            <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-10">
                            <img src="https://i.ibb.co/y0KCX7p/avatar-3.png" alt="profile pictre" className="w-12 h-12" />
                            <p className="text-base font-semibold leading-4 my-2 text-gray-800">Kera Joo</p>
                            <p className="text-base leading-4 text-center text-gray-600">Support</p>
                        </div>
                    </div>
                </div>
            </div>



            <div className>
      <div className="relative flex justify-start md:justify-center md:items-end ">
        <img className="absolute object-cover top-10 h-full w-full xl:mt-10 z-0" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/footer_5_marketing_background.png" alt="background" />
        <div className="flex pt-36 md:pt-32 lg:pt-40 xl:pt-96   px-4 md:px-6  xl:px-20 flex-col justify-start items-start md:justify-center md:items-center relative z-10">
          <div className="flex  flex-col items-start justify-start xl:justify-center xl:space-x-8 xl:flex-row">
            <div className="flex justify-start items-center space-x-4">
              <div className="cursor-pointer w-12">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/footer_5_marketing_svg1.svg" alt="logo" />
              </div>
              <p className="w-60 text-xl xl:text-2xl font-semibold leading-normal text-white">The North</p>
            </div>
            <div className="mt-12 xl:mt-0 grid grid-cols-1 sm:grid-cols-3 gap-y-12 sm:gap-y-0 w-full md:w-auto sm:gap-x-20 md:gap-x-28 xl:gap-8">
              <div className="sm:w-40 md:w-auto xl:w-72 flex justify-start items-start flex-col space-y-6">
                <h2 className="text-base xl:text-xl font-bold xl:font-semibold leading-4 xl:leading-5 text-white">Community</h2>
                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  About Us
                </button>
                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  Guidelines and how to
                </button>
                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  Quote from the best
                </button>
                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  How to start a blog
                </button>
              </div>
              <div className="sm:w-40 md:w-auto xl:w-72 flex justify-start items-start flex-col space-y-6">
                <h2 className="text-base xl:text-xl font-bold xl:font-semibold leading-4 xl:leading-5 text-white">Getting Started</h2>
                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  About Us
                </button>
                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  Guidelines and how to
                </button>
                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  Quote from the best
                </button>
                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  How to start a blog
                </button>
                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  Quote from the best
                </button>
                <button className="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  Guidelines and how to
                </button>
              </div>
              <div className=" xl:w-72 flex justify-start items-start flex-col space-y-6">
                <h2 className="text-base xl:text-xl font-bold xl:font-semibold leading-4 xl:leading-5 text-white">Resources</h2>
                <button className="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                  Accessibility
                </button>
                <button className="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                  Usability
                </button>
                <button className="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                  Marketplace
                </button>
                <button className="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                  Design &amp; Dev
                </button>
                <button className="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                  Marketplace
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 flex  xl:justify-between xl:flex-row flex-col-reverse items-center xl:items-start w-full ">
            <p className="mt-10 md:mt-12 xl:mt-0 text-sm leading-none text-white">2020 The Good Company. All Rights Reserved</p>
            <div className="mt-10 md:mt-12 xl:mt-0 md:flex-row flex-col flex md:justify-center w-full md:w-auto justify-start items-start space-y-4 md:space-y-0 md:items-center md:space-x-4 xl:space-x-6">
              <button className="text-base leading-none text-white hover:text-gray-300">
                Terms of service
              </button>
              <button className="text-base leading-none text-white hover:text-gray-300">
                Privacy Policy
              </button>
              <button className="text-base leading-none text-white hover:text-gray-300">
                Security
              </button>
              <button className="text-base leading-none text-white hover:text-gray-300">
                Sitemap
              </button>
            </div>
            <div className="flex  justify-start md:justify-end items-start  w-full md:w-auto md:items-center space-x-6 ">
              <button className="text-white hover:text-gray-200 w-6">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.25 5.13282C22.406 5.49955 21.513 5.74116 20.5992 5.85001C21.5595 5.28769 22.2817 4.39434 22.6303 3.33751C21.7224 3.86841 20.7307 4.24092 19.6978 4.43907C19.2629 3.98322 18.7397 3.62059 18.1603 3.3732C17.5808 3.12581 16.9571 2.99884 16.327 3.00001C13.7761 3.00001 11.7117 5.03438 11.7117 7.5422C11.7099 7.89102 11.7499 8.23881 11.8308 8.57813C10.0016 8.49238 8.2104 8.02575 6.57187 7.2081C4.93333 6.39044 3.48351 5.23977 2.31516 3.8297C1.90527 4.52069 1.6885 5.30909 1.6875 6.11251C1.6875 7.68751 2.50922 9.0797 3.75 9.89532C3.01487 9.87787 2.29481 9.68331 1.65094 9.32813V9.38438C1.65094 11.5875 3.24469 13.4203 5.35406 13.8375C4.9574 13.9433 4.54864 13.9968 4.13812 13.9969C3.84683 13.9974 3.5562 13.9691 3.27047 13.9125C3.85687 15.7172 5.56359 17.0297 7.58531 17.0672C5.94252 18.3333 3.9256 19.0175 1.85156 19.0125C1.48341 19.012 1.11561 18.99 0.75 18.9469C2.85993 20.2942 5.31255 21.0068 7.81594 21C16.3172 21 20.9616 14.0766 20.9616 8.07188C20.9616 7.87501 20.9564 7.67813 20.947 7.48595C21.8485 6.84472 22.6283 6.04787 23.25 5.13282V5.13282Z" fill="currentColor" />
                </svg>
              </button>
              <button className="text-white hover:text-gray-200 w-6">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22.5 12.0645C22.5 6.26602 17.7984 1.56445 12 1.56445C6.20156 1.56445 1.5 6.26602 1.5 12.0645C1.5 17.3051 5.33906 21.649 10.3594 22.4374V15.1005H7.69266V12.0645H10.3594V9.75117C10.3594 7.12008 11.9273 5.66555 14.3255 5.66555C15.4744 5.66555 16.6763 5.87086 16.6763 5.87086V8.45508H15.3516C14.048 8.45508 13.6402 9.26414 13.6402 10.0957V12.0645H16.552L16.087 15.1005H13.6406V22.4384C18.6609 21.6504 22.5 17.3065 22.5 12.0645Z" fill="currentColor" />
                </svg>
              </button>
              <button className="text-white hover:text-gray-200 w-6">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1.5C6.20297 1.5 1.5 6.20297 1.5 12C1.5 17.797 6.20297 22.5 12 22.5C17.797 22.5 22.5 17.8022 22.5 12C22.5 6.19781 17.797 1.5 12 1.5ZM18.6666 6.33984C19.8815 7.76805 20.6046 9.54925 20.7291 11.4202C18.8367 11.3217 16.5727 11.3217 14.7572 11.4914C14.5275 10.9116 14.2922 10.343 14.0353 9.79594C16.1288 8.88844 17.7422 7.69594 18.6666 6.33984ZM12 3.24984C14.0395 3.24634 16.0156 3.95866 17.5837 5.26266C16.6322 6.46547 15.1392 7.51266 13.2797 8.30297C12.2625 6.42188 11.092 4.80328 9.84375 3.52875C10.5482 3.3469 11.2725 3.25322 12 3.24984V3.24984ZM8.04047 4.20703C9.30375 5.46469 10.4906 7.06641 11.5298 8.94141C9.55547 9.54469 7.29141 9.89062 4.875 9.89062C4.41562 9.89062 3.9675 9.87422 3.52453 9.84656C3.83266 8.63935 4.3949 7.5118 5.17367 6.53927C5.95244 5.56673 6.92981 4.77161 8.04047 4.20703V4.20703ZM3.26625 11.5842C3.76406 11.6063 4.26703 11.617 4.77562 11.6119C7.53187 11.5791 10.0969 11.1469 12.3009 10.44C12.5088 10.8722 12.7056 11.3152 12.8916 11.7689C12.6252 11.8272 12.3637 11.9056 12.1092 12.0033C9.09609 13.2689 6.72281 15.3084 5.4375 17.775C4.02813 16.1814 3.25007 14.1274 3.24984 12C3.24984 11.8594 3.25547 11.7211 3.26625 11.5842ZM12 20.7502C10.056 20.7525 8.16724 20.1036 6.63516 18.907C7.8 16.5994 9.87797 14.6883 12.4978 13.5037C12.7439 13.3889 13.072 13.2961 13.4494 13.2141C13.7619 14.0778 14.0408 14.9747 14.2861 15.9047C14.6525 17.3083 14.9223 18.7354 15.0938 20.1759C14.1061 20.5543 13.0576 20.7489 12 20.7502V20.7502ZM16.7306 19.3556C16.5595 17.9001 16.2871 16.4584 15.9155 15.0408C15.728 14.3297 15.5166 13.6406 15.2869 12.968C17.0039 12.8273 19.0603 12.8475 20.6953 12.968C20.5512 14.2606 20.1206 15.5047 19.4347 16.6097C18.7488 17.7148 17.825 18.6529 16.7306 19.3556V19.3556Z" fill="currentColor" />
                </svg>
              </button>
              <button className="text-white hover:text-gray-200 w-6">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1.5C6.20156 1.5 1.5 6.32344 1.5 12.2672C1.5 17.025 4.50937 21.0562 8.68125 22.4812C8.73977 22.494 8.79949 22.5002 8.85938 22.5C9.24844 22.5 9.39844 22.2141 9.39844 21.9656C9.39844 21.7078 9.38906 21.0328 9.38437 20.1328C9.03705 20.2142 8.68173 20.2567 8.325 20.2594C6.30469 20.2594 5.84531 18.6891 5.84531 18.6891C5.36719 17.4469 4.67813 17.1141 4.67813 17.1141C3.76406 16.4719 4.67344 16.4531 4.74375 16.4531H4.74844C5.80313 16.5469 6.35625 17.5687 6.35625 17.5687C6.88125 18.4875 7.58437 18.7453 8.2125 18.7453C8.62783 18.737 9.03673 18.6412 9.4125 18.4641C9.50625 17.7703 9.77812 17.2969 10.0781 17.025C7.74844 16.7531 5.29688 15.8297 5.29688 11.7047C5.29688 10.5281 5.70469 9.56719 6.375 8.81719C6.26719 8.54531 5.90625 7.44844 6.47812 5.96719C6.55483 5.94883 6.63368 5.94095 6.7125 5.94375C7.09219 5.94375 7.95 6.08906 9.36563 7.07344C11.0857 6.59218 12.9049 6.59218 14.625 7.07344C16.0406 6.08906 16.8984 5.94375 17.2781 5.94375C17.357 5.94095 17.4358 5.94883 17.5125 5.96719C18.0844 7.44844 17.7234 8.54531 17.6156 8.81719C18.2859 9.57187 18.6937 10.5328 18.6937 11.7047C18.6937 15.8391 16.2375 16.7484 13.8984 17.0156C14.2734 17.3484 14.6109 18.0047 14.6109 19.0078C14.6109 20.4469 14.5969 21.6094 14.5969 21.9609C14.5969 22.2141 14.7422 22.5 15.1312 22.5C15.1942 22.5003 15.2571 22.494 15.3187 22.4812C19.4953 21.0562 22.5 17.0203 22.5 12.2672C22.5 6.32344 17.7984 1.5 12 1.5Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>




    </div>
  );
};

export default Home;
