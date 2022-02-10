const EachPR = ({ link, difficulty }: { link: string; difficulty: string }) => {
  const { bgColor, textColor } = getColor(difficulty);

  return (
    <>
      <li className="my-3 p-2 text-lg font-medium font-mainfont bg-slate-50 rounded-[8px] hover:bg-slate-100">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 text-lg font-medium font-codefont hover:text-blue-800 transition tracking-wide"
        >
          {link}
        </a>
        <span className="mt-1 block text-slate-500 text-base font-medium font-codefont tracking-wider">
          Difficulty:
          <span
            className={`mx-1 px-2 py-[2px] rounded-full ${bgColor} ${textColor}`}
          >
            {difficulty}
          </span>
        </span>
      </li>
    </>
  );
};

const getColor = (difficulty: string) => {
  let result = { bgColor: "", textColor: "" };

  const bgValues = {
    easy: "bg-green-200",
    medium: "bg-yellow-200",
    hard: "bg-red-200",
  };
  const textColor = {
    easy: "text-green-700",
    medium: "text-yellow-700",
    hard: "text-red-700",
  };

  if (difficulty === "Easy") {
    result.bgColor = bgValues.easy;
    result.textColor = textColor.easy;
  } else if (difficulty === "Medium") {
    result.bgColor = bgValues.medium;
    result.textColor = textColor.medium;
  } else if (difficulty === "Hard") {
    result.bgColor = bgValues.hard;
    result.textColor = textColor.hard;
  }

  return result;
};

export default EachPR;
