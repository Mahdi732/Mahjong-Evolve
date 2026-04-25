export function getTopScores(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('mahjong_top_scores');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveScore(score: number): boolean {
  const scores = getTopScores();
  if (scores.length < 5) {
    scores.push(score);
    scores.sort((a, b) => b - a);
    localStorage.setItem('mahjong_top_scores', JSON.stringify(scores));
    return true;
  }
  const lowestScore = Math.min(...scores);
  if (score > lowestScore) {
    scores.push(score);
    scores.sort((a, b) => b - a);
    const top5 = scores.slice(0, 5);
    localStorage.setItem('mahjong_top_scores', JSON.stringify(top5));
    return true;
  }
  return false;
}
