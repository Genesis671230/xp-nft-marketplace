import React, { useMemo, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import abi from "../../erc721_abi/abi.json";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import { useDispatch, useSelector } from "react-redux";
import { setNftData } from "../../redux/NftDataSlice.ts";
const Home = () => {
  const [allContracts, setAllContracts] = useState();

  const [allNfts, setAllNfts] = useState([]);
  const address = useAddress();
  const {
    contract: contractThirdWeb,
    isLoading,
    error,
  } = useContract("0x58A7a5Af70499daC14Bc70A0898Ac3CE992Ee3AD");

  const nftData = useSelector((state) => state.NftDataSlice.value);
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
  const run = async () => {
    const nfts = await contractThirdWeb?.getAll();
    setAllNfts(nfts);
  };

  useMemo(() => {
    //  run()
    getContractData();
  }, []);

  return (
    <div className="App">
      <div></div>
      <div className="">
        <img
          src="https://img.freepik.com/free-photo/empty-dark-room-modern-futuristic-sci-fi-background-3d-illustration_35913-2390.jpg?w=900&t=st=1673354167~exp=1673354767~hmac=cdf412d996982f8c1626bef371cd406355834d4e78723c823ac6937871e93e0c"
          alt=""
          className="w-full h-[25rem] object-cover"
        />
      </div>
      <div></div>
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
    </div>
  );
};

export default Home;
