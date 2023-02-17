import ReactCardFlip from 'react-card-flip';
import DishCardFront from './dish-card-front/DishCardFront';
import DishCardBack from './dish-card-back/DishCardBack';
import { Dish } from '../../../interfaces/Dish';

export interface DishCardProps {
  dish: Dish;
  isFrontSide?: boolean;
  flipCallback?: () => void;
  className?: string;
}

const DishCard = ({ dish, flipCallback, isFrontSide }: DishCardProps) => {
  return (
    <ReactCardFlip isFlipped={!isFrontSide}>
      <DishCardFront flipCallback={flipCallback} className="dish-card" dish={dish} />
      <DishCardBack flipCallback={flipCallback} className="dish-card" dish={dish} />
    </ReactCardFlip>
  );
};

export default DishCard;
