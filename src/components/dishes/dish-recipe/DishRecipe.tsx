import { Box, Button, Collapse, Typography } from '@mui/material';
import './DishRecipeShared.scss';
import { memo, RefObject, useCallback, useState } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { DEFAULT_RECIPE_STEP } from 'shared/constants/DishesConstants';
import { getUpdatedRecipe } from 'shared/utility/dishRecipeUpdateUtils';
import { useUpdateEffect } from 'shared/hooks/useUpdateEffect';
import RecipeStep from './recipe-step/RecipeStep';
import classNames from 'classnames';

interface DishRecipeProps {
  recipe: string[];
  reference?: RefObject<any>;
  className?: string;
  isReadOnly?: boolean;
}

const DishRecipe = ({ recipe, className, isReadOnly, reference }: DishRecipeProps) => {
  const [displayedRecipe, setDisplayedRecipe] = useState<string[]>(structuredClone(recipe));

  useUpdateEffect(() => {
    setDisplayedRecipe(recipe);
  }, [isReadOnly, recipe]);

  const reorderSteps = useCallback(
    (position: number, toPosition: number) => {
      if (toPosition < 0 || toPosition >= displayedRecipe.length) return;
      if (!reference) return;
      const newRecipe = getUpdatedRecipe(reference, displayedRecipe);
      const [movedElement] = newRecipe.splice(position, 1);
      newRecipe.splice(toPosition, 0, movedElement);
      setDisplayedRecipe(newRecipe.slice());
    },
    [reference, displayedRecipe]
  );

  const addEmptyStep = useCallback(() => {
    if (!reference) return;
    const newRecipe = getUpdatedRecipe(reference, displayedRecipe);
    newRecipe.push(DEFAULT_RECIPE_STEP);
    setDisplayedRecipe(newRecipe.slice());
  }, [reference, displayedRecipe]);

  const removeStep = useCallback(
    (id: number) => {
      if (!reference) return;
      const newRecipe = getUpdatedRecipe(reference, displayedRecipe);
      newRecipe.splice(id, 1);
      setDisplayedRecipe(newRecipe.slice());
    },
    [reference, displayedRecipe]
  );

  return (
    <Box className={classNames('dish-recipe-container', className)} ref={reference}>
      {displayedRecipe.slice().map((step, id) => (
        <RecipeStep
          key={`${id}:${step}`}
          step={step}
          id={id}
          onMoveDown={() => reorderSteps(id, id + 1)}
          onMoveUp={() => reorderSteps(id, id - 1)}
          isLast={id === displayedRecipe.length - 1}
          isFirst={id === 0}
          isReadOnly={isReadOnly}
          onRemove={() => removeStep(id)}
        />
      ))}
      <Collapse in={!isReadOnly} unmountOnExit={true} mountOnEnter={true}>
        <Box onClick={addEmptyStep} className="recipe-step add-step">
          <Button sx={{ textTransform: 'none' }}>
            <AddCircleRoundedIcon sx={{ color: 'text.primary' }} />
            <Typography className="add-step-text" variant="caption" color="text.primary">
              Add another step
            </Typography>
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default memo(DishRecipe);
