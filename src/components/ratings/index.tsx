import { getRatingPercentage } from "../../utils";
import { RatingContainer } from "./styled";

type RatingProps = {
  Source: string;
  Value: string;
};
type Ratings = {
  ratings: Array<RatingProps>;
};
export const Ratings = ({ ratings }: Ratings) => {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {ratings.map((rating) => {
        const ratingPercentage = getRatingPercentage(
          rating.Source,
          rating.Value
        );
        return (
          <RatingContainer key={rating.Source}>
            {rating.Source}: {ratingPercentage + "%"}
          </RatingContainer>
        );
      })}
    </div>
  );
};
