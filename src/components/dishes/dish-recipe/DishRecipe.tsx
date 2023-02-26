import { Box, Button, IconButton, Typography } from '@mui/material';
import './DishRecipe.scss';
import EditableTextField from '../../custom-inputs/editable-text-field/EditableTextField';
import { RefObject, useCallback, useMemo, useState } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';

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
  }, [isReadOnly]);

  const addEmptyStep = useCallback(() => {
    displayedRecipe.push('');
    setDisplayedRecipe(displayedRecipe.slice());
  }, [displayedRecipe]);

  const removeStep = useCallback(
    (id: number) => {
      displayedRecipe.splice(id, 1);
      setDisplayedRecipe(displayedRecipe.slice());
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
              isReadOnly={isReadOnly}
              multiline={true}
            />
            {!isReadOnly && (
              <IconButton className="delete-step-button" onClick={() => removeStep(id)}>
                <HighlightOffRoundedIcon />
              </IconButton>
            )}
          </Box>
        );
      }),
    [displayedRecipe, isReadOnly]
  );

  return (
    <Box className={`dish-recipe-container ${className}`} ref={reference}>
      {getRecipeSteps}
      {!isReadOnly && (
        <Box onClick={addEmptyStep} className="recipe-step add-step">
          <Button sx={{ textTransform: 'none' }}>
            <AddCircleRoundedIcon sx={{ color: 'text.primary' }} />
            <Typography className="add-step-text" variant="caption" color="text.primary">
              Add another step
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DishRecipe;
