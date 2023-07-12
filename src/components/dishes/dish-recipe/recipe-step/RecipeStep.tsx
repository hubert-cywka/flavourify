import AnimatePresence from 'components/animate-presence/AnimatePresence';
import { simpleOpacityAnimation } from 'shared/constants/AnimationConfigs';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import EditableTextField from 'components/primitives/editable-text-field/EditableTextField';
import { DEFAULT_RECIPE_STEP } from 'shared/constants/DishesConstants';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import '../DishRecipeShared.scss';
import { memo } from 'react';

interface RecipeStepProps {
  id: number;
  step: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  isLast?: boolean;
  isFirst?: boolean;
  isReadOnly?: boolean;
}

const RecipeStep = ({
  id,
  step,
  isReadOnly,
  onMoveDown,
  onMoveUp,
  isLast,
  isFirst,
  onRemove
}: RecipeStepProps) => {
  return (
    <AnimatePresence isVisible={true} animation={simpleOpacityAnimation}>
      <Box className="recipe-step">
        {!isReadOnly && (
          <Box className="recipe-step-reorder-buttons" sx={{ color: 'accent.main' }}>
            {!isFirst && (
              <ArrowDropUpRoundedIcon className="recipe-step-reorder-button" onClick={onMoveUp} />
            )}
            {!isLast && (
              <ArrowDropDownRoundedIcon
                className="recipe-step-reorder-button"
                onClick={onMoveDown}
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
          <IconButton className="delete-step-button" onClick={onRemove}>
            <HighlightOffRoundedIcon sx={{ color: 'text.primary' }} />
          </IconButton>
        )}
      </Box>
    </AnimatePresence>
  );
};

export default memo(RecipeStep);
