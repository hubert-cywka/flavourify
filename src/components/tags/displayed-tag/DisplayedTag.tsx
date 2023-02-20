import { Box, Dialog } from '@mui/material';
import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchRounded } from '@mui/icons-material';
import './DisplayedTag.scss';
import { Tag } from '../../../interfaces/Tag';
import { TAGS_QUERY } from '../../../constants/QueryConstants';
import { getTags } from '../../../services/TagsService';
import { LastViewedDishContext } from '../../../contexts/LastViewedDishContext';
import DisplayedTagSelector from '../displayed-tag-selector/DisplayedTagSelector';

interface DisplayedTagProps {
  className?: string;
}

const DisplayedTag = ({ className }: DisplayedTagProps) => {
  const { data: tagsList } = useQuery<Tag[]>([TAGS_QUERY], getTags);
  const [isTagSelectDialogOpen, setIsTagSelectDialogOpen] = useState<boolean>(false);
  const { lastViewedDish } = useContext(LastViewedDishContext);

  return (
    <>
      <Box
        className={`displayed-tag-container ${className}`}
        sx={{ color: 'text.secondary' }}
        onClick={() => setIsTagSelectDialogOpen(true)}>
        <SearchRounded className="displayed-tag-icon" />
        {tagsList && lastViewedDish.displayedTag.name}
      </Box>
      <Dialog open={isTagSelectDialogOpen} onClose={() => setIsTagSelectDialogOpen(false)}>
        <DisplayedTagSelector className="displayed-tag-selector" />
      </Dialog>
    </>
  );
};

export default DisplayedTag;
