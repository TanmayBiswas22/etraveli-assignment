export const getRatingPercentage = (source: string, value: string) => {
  switch (source) {
    case "Internet Movie Database": {
      return Math.round(parseFloat(value) * 10);
    }

    case "Rotten Tomatoes": {
      return parseInt(value.replace("%", ""), 10);
    }

    case "Metacritic": {
      const [score] = value.split("/");
      return parseInt(score, 10);
    }

    default:
      console.warn(`Unknown rating source: ${source}`);
      return 0;
  }
};

export const getAverageRating = (
  ratings: Array<{ Source: string; Value: string }>
) => {
  const totalRatings = ratings.length;
  if (totalRatings === 0) return 0;

  let totalPercentage = 0;
  for (let i = 0; i < ratings.length; i++) {
    const rating = ratings[i];
    const ratingPercentage = getRatingPercentage(rating.Source, rating.Value);
    totalPercentage += ratingPercentage;
  }

  return Math.round(totalPercentage / totalRatings);
};

export const getStarRating = (percentage: number) => {
  const filledStars = Math.round((percentage / 100) * 10);
  const emptyStars = 10 - filledStars;

  return "★".repeat(filledStars) + "☆".repeat(emptyStars);
};
