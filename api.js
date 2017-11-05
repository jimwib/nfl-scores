var nflScores = requre("nfl_scores");

// Acquire the most up to date scores, and inspect them.
nflScores.refresh(function(err, scores) {
  console.log(scores);
});
