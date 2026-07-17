import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Typography from '@/components/ui/typography';

export type RatingProps = {
  value: number;
};

function Rating({ value }: RatingProps) {
  const wholeStars = Math.floor(value);
  const halfStars = value - wholeStars;

  const starsLength = new Array(wholeStars).fill(0);

  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
      <blockquote className="flex flex-row gap-1">
        {starsLength.map((_, index) => (
          <FaStar key={index} className="text-yellow-500 h-4" />
        ))}
        {halfStars > 0 && <FaStarHalfAlt className="text-yellow-500 h-4" />}
      </blockquote>
      <Typography textColor={'white'}>
        Bewertet mit 4,5 Sternen von über 500 Kunden
      </Typography>
    </div>
  );
}

export default Rating;
