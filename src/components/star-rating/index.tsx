import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type StarRatingProps = {
  percentage: number;
};
export const StarRating = ({ percentage }: StarRatingProps) => {
  const filled = Math.round((percentage / 100) * 10);

  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: 10 }).map((_, index) =>
        index < filled ? (
          <AiFillStar key={index} size={24} color="#FFD700" />
        ) : (
          <AiOutlineStar key={index} size={24} color="#FFD700" />
        )
      )}
    </div>
  );
};
