export async function readResultsData(formater = defaultFormatter) {
  const data = await getResultsData();
  return formater(data.votes);
}

export async function getResultsData(ROOT = '') {
  const response = await fetch(`${ROOT}/api/votes/results/results.json`);
  const { data } = await response.json();
  return data;
}

function defaultFormatter(data) {
  const results = { names: [], votes: [] };

  makeSureArraySameSize(data, results);

  data.forEach(({ name, voteCounts }) => {
    // Name longer than 1 word, use first letter of the first
    // name and keep unchanged the rest
    results.names.push(name.replace(/^(\w).+\w\s/, '$1. '));

    for (let i = 0; i < voteCounts.length; i++) {
      results.votes[i].data.push(voteCounts[i].count);
    }
  });

  return results;
}

function makeSureArraySameSize(data, results) {
  if (!data?.length) throw new Error('Empty data not allowed!');

  const voiceCountLength = data[0]?.voteCounts?.length;
  const resultsLength = results?.votes?.length;

  if (voiceCountLength > resultsLength) {
    const limit = voiceCountLength - resultsLength;
    for (let index = 0; index < limit; index++) {
      results.votes.push({ name: `Round ${index + 2}`, data: [] });
    }
  }
}
