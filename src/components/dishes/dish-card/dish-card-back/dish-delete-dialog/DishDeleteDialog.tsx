import { Box, Button, Dialog, Typography } from '@mui/material';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { DeleteRounded } from '@mui/icons-material';
import './DishDeleteDialog.scss';
import { memo } from 'react';

interface DishDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  deleteCallback: () => void;
}

const DishDeleteDialog = ({ isOpen, onClose, deleteCallback }: DishDeleteDialogProps) => {
  return (
    <Dialog className="delete-dialog-container" open={isOpen}>
      <Box className="delete-dialog" sx={{ bgcolor: 'primary.dark' }}>
        <Box className="delete-dialog-text">
          <Typography>Do you really want to delete this dish recipe?</Typography>
          <Typography className="delete-dialog-warning">This is irreversible.</Typography>
        </Box>
        <Box>
          <Button
            className="delete-dialog-button"
            variant="accentContained"
            onClick={onClose}
            startIcon={<HighlightOffRoundedIcon />}>
            Cancel
          </Button>
          <Button
            className="delete-dialog-button"
            variant="errorContained"
            onClick={deleteCallback}
            startIcon={<DeleteRounded />}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default memo(DishDeleteDialog);
