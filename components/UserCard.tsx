import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { selectedUserState } from "../atoms/selectedUserAtom";
import { TableDataType } from "../types";
import { parseName } from "../utils/parseName";

const UserCard = ({ data, index }: { data: TableDataType; index: number }) => {
  const [isModalOpen, setModalOpen] = useRecoilState(modalState);
  const [userData, setUserData] = useRecoilState(selectedUserState);

  return (
    <tr>
      <td className="p-5 border-b border-gray-200 bg-darkwhite lg:hidden">
        <p className="font-mainfont text-lg font-medium text-darkgrey text-center">
          {index + 4}
        </p>
      </td>
      <td className="border-b border-gray-200 bg-darkwhite">
        <p className="items-center font-codefont text-xl font-semibold text-primarydark text-center lg:px-3 lg:py-4 lg:text-lg md:text-base">
          # {data.rank}
        </p>
      </td>
      <td className="p-5 border-b border-gray-200 bg-darkwhite w-1/2 lg:px-3 lg:py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-12 h-12 mr-5 lg:hidden">
            <Image
              className="w-full h-full rounded-full"
              src={data.avatar_url}
              alt={data.user_name}
              height={60}
              width={60}
            />
          </div>
          <div>
            <p className="font-codefont text-xl font-medium text-lightblack tracking-wide capitalize lg:text-lg md:text-base">
              {parseName(data.full_name) || (
                <span className="text-lightgrey">Name not found...</span>
              )}
            </p>
            <p className="font-curlfont text-base font-semibold text-darkgrey lg:hidden">
              {data.college || (
                <span className="text-warningoff">College not found...</span>
              )}
            </p>
          </div>
        </div>
      </td>
      <td className="p-5 border-b border-gray-200 bg-darkwhite lg:hidden">
        <a
          href={data.user_url}
          target="_blank"
          rel="noreferrer"
          className="py-1 px-4 font-codefont text-base font-medium text-lightblack bg-primaryoff rounded-lg tracking-wide text-center"
        >
          {data.user_name}
        </a>
      </td>
      <td className="p-5 border-b text-center border-gray-200 bg-darkwhite text-center lg:hidden">
        <p
          className="py-1 px-3 cursor-pointer font-curlfont text-base font-bold text-lightblack w-fit hover:text-darkwhite hover:bg-primarylight transition rounded-lg text-center"
          onClick={() => {
            setModalOpen(true);
            setUserData(data);
          }}
        >
          View All PRs
        </p>
      </td>
      <td className="p-5 border-b border-gray-200 bg-darkwhite text-center lg:px-3 lg:py-4 xs:hidden">
        <span className="font-codefont text-xl font-medium text-lightblack lg:text-base">
          {data.total_points}
        </span>
      </td>
    </tr>
  );
};

export default UserCard;
