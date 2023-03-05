import { Box, Button, IconButton, Typography } from '@mui/material';
import './DishRecipe.scss';
import EditableTextField from '../../custom-inputs/editable-text-field/EditableTextField';
import { RefObject, useCallback, useMemo, useState } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';
import { AnimatePresence, motion } from 'framer-motion';
import { RECIPE_ADD_STEP_MOTION } from '../../../constants/MotionKeyConstants';

interface DishRecipeProps {
  recipe: string[];
  reference?: RefObject<any>;
  className?: string;
  isReadOnly?: boolean;
}

const DishRecipe = ({ recipe, className, isReadOnly, reference }: DishRecipeProps) => {
  const [displayedRecipe, setDisplayedRecipe] = useState<string[]>(recipe);

  useUpdateEffect(() => {
    setDisplayedRecipe(recipe);
  }, [isReadOnly, recipe]);

  const addEmptyStep = useCallback(() => {
    displayedRecipe.push('');
    setDisplayedRecipe(displayedRecipe.slice());
  }, [displayedRecipe]);

  const removeStep = useCallback(
    (id: number) => {
      displayedRecipe.splice(id, 1);
      setDisplayedRecipe(Array.from(displayedRecipe));
    },
    [displayedRecipe]
  );

  const getRecipeSteps = useMemo(
    () =>
      displayedRecipe.map((step, id) => {
        return (
          <Box key={step + id} className="recipe-step">
            <Typography sx={{ color: 'text.primary' }} className="recipe-step-number">
              {id + 1}
            </Typography>
            <EditableTextField
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
      }),
    [displayedRecipe, isReadOnly]
  );

  return (
    <Box className={`dish-recipe-container ${className}`} ref={reference}>
      <AnimatePresence initial={false}>
        {getRecipeSteps.map((step, id) => (
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
