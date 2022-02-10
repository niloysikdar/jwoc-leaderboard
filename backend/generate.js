const { default: axios } = require("axios");
const { MongoClient } = require("mongodb");
const { writeJson } = require("./utils/writeJson");

const dotenv = require("dotenv");
dotenv.config();
const ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN;

const { allRepos } = require("./utils/allRepos");
const repos = allRepos;

const eventLabel = "jwoc";
const levelsData = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};
let finalData = [];

const MONGODB_URL = process.env.MONGODB_URL;
const client = new MongoClient(MONGODB_URL);

const fetchAllData = async () => {
  for (let i = 0; i < repos.length; i++) {
    const repoName = repos[i];
    const data = await fetchRepoData(repoName);
    console.log(`Completed for: ${repos[i]}`);
    console.log("!.!.!.!.!.!.!");
    console.log("*************");
    finalData = [...finalData, ...data];
  }

  let leaderboardData = generateRank(finalData).sort((a, b) =>
    a.total_points < b.total_points ? 1 : -1
  );

  let rank = 1;

  for (let pos = 0; pos < leaderboardData.length; pos++) {
    const currentData = leaderboardData[pos];

    const { full_name, college } = await getDatafromDB(currentData.user_name);

    currentData.full_name = full_name;
    currentData.college = college;

    if (pos === 0) {
      currentData.rank = rank;
    } else {
      const prevData = leaderboardData[pos - 1];
      if (prevData.total_points > currentData.total_points) {
        rank++;
        currentData.rank = rank;
      } else {
        currentData.rank = rank;
      }
    }
  }

  writeJson({
    lastUpdated: new Date(),
    data: leaderboardData,
  });
};

const getDatafromDB = async (userName) => {
  let finalData = { full_name: "", college: "" };
  try {
    const db = client.db("jwoc");
    const collection = db.collection("mentees");
    const data = await collection.findOne({ $text: { $search: userName } });
    if (data) {
      finalData.full_name = data.name;
      finalData.college = data.college;
    }
  } catch (error) {
    console.log(error);
  }

  return finalData;
};

let counter = 0;

const fetchRepoData = async (repoName) => {
  let pageCount = 1;
  let pageAvailabe = true;
  let allData = [];

  while (pageAvailabe) {
    const reqUrl = `https://api.github.com/repos/${repoName}/pulls?state=closed&per_page=100&page=${pageCount}`;
    try {
      counter++;
      console.log(
        `${counter}. Fetching data for: ${repoName} and pageCount: ${pageCount}`
      );
      const res = await axios.get(reqUrl, {
        headers: {
          authorization: `token ${ACCESS_TOKEN}`,
          "User-Agent": "request",
          Accept: "application/vnd.github.v3+json",
        },
      });
      const resData = res.data;

      console.log(
        `Data has been fetched for: ${repoName} and pageCount: ${pageCount}`
      );
      // await sleep(2000);
      console.log("_____________");

      if (resData.length !== 0) {
        const jwocData = filterJwoc(resData);
        allData = [...allData, ...jwocData];
        pageCount++;
      } else {
        pageAvailabe = false;
      }
    } catch (error) {
      console.log(error.message);
      pageAvailabe = false;
      process.exit(1);
    }
  }

  return allData;
};

const filterJwoc = (allData) => {
  let finalData = [];

  const jwocData = allData.filter((prData) => {
    let isJwoc = false;
    if (prData.merged_at) {
      prData.labels.map((eachLabel) => {
        if (eachLabel.name.toLowerCase().includes(eventLabel.toLowerCase())) {
          isJwoc = true;
        }
      });
    }

    return isJwoc;
  });

  if (jwocData.length !== 0) {
    jwocData.map((prData) => {
      const data = {
        user_name: prData.user.login,
        avatar_url: prData.user.avatar_url,
        user_url: prData.user.html_url,
        pr_url: prData.html_url,
        labels: prData.labels.map((labelData) => labelData.name),
      };
      finalData = [...finalData, data];
    });
  }

  return finalData;
};

const generateRank = (fullData) => {
  let finalData = [];

  fullData.map((eachPrData) => {
    const index = finalData.findIndex(
      (data) => data.user_name === eachPrData.user_name
    );

    const { point, difficulty } = getPoints(eachPrData.labels);

    if (index === -1) {
      const userData = {
        user_name: eachPrData.user_name,
        avatar_url: eachPrData.avatar_url,
        user_url: eachPrData.user_url,
        total_points: point,
        pr_urls: [{ url: eachPrData.pr_url, difficulty: difficulty }],
      };

      finalData = [...finalData, userData];
    } else {
      finalData[index].total_points += point;
      finalData[index].pr_urls.push({
        url: eachPrData.pr_url,
        difficulty: difficulty,
      });
    }
  });

  return finalData;
};

const getPoints = (labelsArray) => {
  let point = 0,
    difficulty = "";

  labelsArray.map((label) => {
    if (label.toLowerCase().includes(levelsData.easy.toLowerCase())) {
      point = 1;
      difficulty = levelsData.easy;
    }
    if (label.toLowerCase().includes(levelsData.medium.toLowerCase())) {
      point = 3;
      difficulty = levelsData.medium;
    }
    if (label.toLowerCase().includes(levelsData.hard.toLowerCase())) {
      point = 5;
      difficulty = levelsData.hard;
    }
  });

  return { point, difficulty };
};

client
  .connect()
  .then(() => fetchAllData().then(() => client.close()))
  .catch((error) => console.log(error.message));
