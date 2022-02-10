import Image from "next/image";
import { TableDataType } from "../types";

const TopCard = ({ userData }: { userData: TableDataType }) => {
  return (
    <div className="relative m-auto p-2 w-full flex justify-center align-center flex-col bg-darkwhite shadow-[0_0_4px_rgba(50,69,107,0.2)] rounded-[6px] z-[1] overflow-hidden">
      <div className="m-auto w-full flex justify-center align-center flex-col bg-primarylight rounded-[6px]">
        <h2 className="mt-2.5 mb-0 mx-auto text-4xl font-medium font-codefont text-darkwhite text-center tracking-[0.8px]">
          {userData.total_points}
        </h2>
        <p className="-mt-[2px] mb-2.5 mx-auto text-lg font-medium font-mainfont text-darkwhite text-center tracking-[0.8px]">
          Points
        </p>
        <span className="-mt-[2px] mb-2.5 mx-auto px-5 py-1 text-xl font-medium font-codefont text-lightblack bg-darkwhite text-center tracking-[0.2px] rounded-[4px]">
          Rank: {userData.rank}
        </span>
      </div>

      <div className="flex flex-col items-center mt-4">
        <div className="w-24 h-24 relative rounded-full overflow-hidden shadow lg:w-20 lg:h-20">
          <Image
            src={userData.avatar_url}
            alt={userData.user_name}
            layout="fill"
            objectFit="cover"
            quality={100}
            className="w-full h-full user_image"
          />
        </div>
        <h1 className="my-2 mx-auto text-2xl font-medium font-codefont text-darkblack text-center tracking-[0.2px]">
          {userData.full_name}
        </h1>
        <a
          href={userData.user_url}
          target="_blank"
          rel="noreferrer"
          className="m-auto px-5 py-1 text-lg font-medium font-mainfont text-darkblack bg-primaryoff text-center italic tracking-[0.2px] rounded-[8px]"
        >
          {userData.user_name}
        </a>
        <p className="my-2 mx-auto text-lg font-medium font-mainfont text-lightblack text-center italic tracking-[0.2px] lg:text-base">
          {userData.college}
        </p>
        <button
          onClick={() => {}}
          className="m-auto mb-1.5 px-3 py-1 text-lg font-bold font-curlfont text-sky-600 bg-sky-100 hover:bg-sky-200 text-center rounded-full transition"
        >
          View All PRs
        </button>
      </div>
    </div>
  );
};

export default TopCard;
