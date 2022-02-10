import EachPR from "./EachPR";
import { XIcon } from "@heroicons/react/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { selectedUserState } from "../atoms/selectedUserAtom";
import { TableDataType } from "../types";
import { parseName } from "../utils/parseName";

const PRModal = () => {
  const [val, setModalOpen] = useRecoilState(modalState);
  const userData: TableDataType = useRecoilValue(selectedUserState);

  return (
    <div className="w-full h-screen fixed left-0 top-0 z-10 bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
      <div className="relative bg-white px-2 py-2 rounded-md pb-6 max-w-[90vw]">
        <div className="absolute top-4 right-4">
          <XIcon
            className="h-10 w-10 cursor-pointer rounded-full p-1 text-red-600 hover:bg-red-100 transition"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div className="mt-6 px-5 lg:px-2">
          <h2 className="my-[2px] text-2xl text-slate-500 font-medium font-codefont tracking-wide">
            Name:
            <span className="mx-2 text-slate-700">
              {parseName(userData.full_name)}
            </span>
          </h2>
          <h2 className="my-[3px] text-lg text-slate-500 font-medium font-codefont tracking-wide">
            Total Points:
            <span className="mx-2 text-xl text-slate-700">
              {userData.total_points}
            </span>
          </h2>
          <h2 className="my-[3px] text-lg text-slate-500 font-medium font-codefont tracking-wide">
            Total PR Count:
            <span className="mx-2 text-xl text-slate-700">
              {userData.pr_urls.length}
            </span>
          </h2>

          <p className="mt-4 text-lg text-slate-600 font-medium font-codefont tracking-wide">
            PR Links:
          </p>

          <div
            className="max-h-[65vh] pr-12 pt-3 pb-4 mt-2 overflow-y-scroll"
            id="div_ScrollBar"
          >
            <ol className="list-decimal ml-10 w-full">
              {userData.pr_urls.map((prData) => (
                <EachPR
                  key={prData.url}
                  link={prData.url}
                  difficulty={prData.difficulty}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PRModal;
