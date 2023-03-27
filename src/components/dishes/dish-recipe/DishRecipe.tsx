import { Box, Button, IconButton, Typography } from '@mui/material';
import './DishRecipe.scss';
import EditableTextField from '../../custom-inputs/editable-text-field/EditableTextField';
import { RefObject, useState } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';
import { AnimatePresence, motion } from 'framer-motion';
import { RECIPE_ADD_STEP_MOTION } from '../../../constants/MotionKeyConstants';
import { DEFAULT_RECIPE_STEP } from '../../../constants/DishesConstants';

interface DishRecipeProps {
  recipe: string[];
  reference?: RefObject<any>;
  className?: string;
  isReadOnly?: boolean;
}

export const getUpdatedRecipe = (ref: RefObject<any>, placeholder: string[]) => {
  if (!ref?.current?.children) return placeholder;
  const newRecipe: string[] = [];
  const newRecipeArray: HTMLElement[] = Array.from(ref.current.children);
  for (let i = 0; i < newRecipeArray.length - 1; i++) {
    const step = (newRecipeArray[i].children[0].children[2].firstChild as HTMLInputElement).value;
    if (step.length) newRecipe.push(step);
  }
  return newRecipe.slice();
};
const DishRecipe = ({ recipe, className, isReadOnly, reference }: DishRecipeProps) => {
  const [displayedRecipe, setDisplayedRecipe] = useState<string[]>(structuredClone(recipe));

  useUpdateEffect(() => {
    setDisplayedRecipe(recipe);
  }, [isReadOnly, recipe]);

  const reorderSteps = (position: number, toPosition: number) => {
    if (toPosition < 0 || toPosition >= displayedRecipe.length) return;
    if (!reference) return;
    const newRecipe = getUpdatedRecipe(reference, displayedRecipe);
    const [movedElement] = newRecipe.splice(position, 1);
    newRecipe.splice(toPosition, 0, movedElement);
    setDisplayedRecipe(newRecipe.slice());
  };

  const addEmptyStep = () => {
    if (!reference) return;
    const newRecipe = getUpdatedRecipe(reference, displayedRecipe);
    newRecipe.push(DEFAULT_RECIPE_STEP);
    setDisplayedRecipe(newRecipe.slice());
  };

  const removeStep = (id: number) => {
    if (!reference) return;
    const newRecipe = getUpdatedRecipe(reference, displayedRecipe);
    newRecipe.splice(id, 1);
    setDisplayedRecipe(newRecipe.slice());
  };

  const getRecipeSteps = () =>
    displayedRecipe.slice().map((step, id) => {
      return (
        <Box key={step} className="recipe-step">
          {!isReadOnly && (
            <Box className="recipe-step-reorder-buttons" sx={{ color: 'accent.main' }}>
              {id !== 0 && (
                <ArrowDropUpRoundedIcon
                  className="recipe-step-reorder-button"
                  onClick={() => reorderSteps(id, id - 1)}
                />
              )}
              {id !== displayedRecipe.length - 1 && (
                <ArrowDropDownRoundedIcon
                  className="recipe-step-reorder-button"
                  onClick={() => reorderSteps(id, id + 1)}
                />
              )}
            </Box>
          )}
          <Typography sx={{ color: 'text.primary' }} className="recipe-step-number">
            {id + 1}
          </Typography>
          <EditableTextField
            autoFocus={step === DEFAULT_RECIPE_STEP}
            className="recipe-step-text"
            value={step}
            sx={{ color: 'text.primary' }}
            isReadOnly={isReadOnly}
            multiline={true}
          />
          {!isReadOnly && (
            <IconButton className="delete-step-button" onClick={() => removeStep(id)}>
              <HighlightOffRoundedIcon sx={{ color: 'text.primary' }} />
            </IconButton>
          )}
        </Box>
      );
    });

  return (
    <Box className={`dish-recipe-container ${className}`} ref={reference}>
      <AnimatePresence initial={false}>
        {getRecipeSteps().map((step, id) => (
          <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {step}
          </motion.div>
        ))}

        {!isReadOnly && (
          <motion.div
            key={RECIPE_ADD_STEP_MOTION}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <Box onClick={addEmptyStep} className="recipe-step add-step">
              <Button sx={{ textTransform: 'none' }}>
                <AddCircleRoundedIcon sx={{ color: 'text.primary' }} />
                <Typography className="add-step-text" variant="caption" color="text.primary">
                  Add another step
                </Typography>
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default DishRecipe;
