import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import './MenuList.scss';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult
} from '@hello-pangea/dnd';
import { getMenu, MenuItem, removeFromMenu, updateMenu } from '../../../../services/MenuService';
import { DeleteRounded, ManageSearchRounded } from '@mui/icons-material';
import ROUTE from '../../../router/RoutingConstants';
import appRouter from '../../../router/AppRouter';
import { MENU_INGREDIENTS_QUERY } from '../../../../constants/QueryConstants';
import { queryClient } from '../../../../services/QueryClient';

interface MenuListProps {
  className?: string;
}

const MenuList = ({ className }: MenuListProps) => {
  const [displayedMenu, setDisplayedMenu] = useState(getMenu());

  const reorderMenuList = (list: MenuItem[], startIndex: number, endIndex: number) => {
    const reorderedList = Array.from(list);
    const [movedElement] = reorderedList.splice(startIndex, 1);
    reorderedList.splice(endIndex, 0, movedElement);
    return reorderedList;
  };

  const removeFromList = (index: number) => {
    removeFromMenu(index);
    setDisplayedMenu(getMenu());
    queryClient.refetchQueries([MENU_INGREDIENTS_QUERY]);
  };

  const goToDishDetails = (id: number) => {
    appRouter.navigate(ROUTE.FOUND_DISH.replace(':id', id.toString()));
  };

  const getDateBoxes = (): ReactJSXElement[] => {
    return displayedMenu.map((item, id) => (
      <Box key={id} className="menu-plan-date">
        {getParsedDate(item.date)}
      </Box>
    ));
  };

  const getMenuItemBoxes = (): ReactJSXElement[] => {
    return displayedMenu.map((item, id) => (
      <Draggable
        key={item.id + item.name + item.date.toString()}
        draggableId={item.id + item.name + item.date.toString()}
        index={id}>
        {(provided: DraggableProvided) => (
          <Box
            className="menu-plan-dish"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <IconButton onClick={() => goToDishDetails(item.id)}>
              <ManageSearchRounded sx={{ color: 'accent.main' }} />
            </IconButton>
            <Box className="menu-plan-dish-name">{item.name}</Box>
            <IconButton className="menu-plan-dish-delete-button" onClick={() => removeFromList(id)}>
              <DeleteRounded sx={{ color: 'accent.main' }} />
            </IconButton>
          </Box>
        )}
      </Draggable>
    ));
  };

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const reorderedMenu = reorderMenuList(
      displayedMenu,
      result.source.index,
      result.destination.index
    );
    updateMenu(reorderedMenu);
    setDisplayedMenu(getMenu());
  }

  const getParsedDate = (dateToParse: Date) => {
    const date = new Date(dateToParse);
    return (
      <>
        <Box className="menu-plan-date-day">
          {Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(date)}
        </Box>
        <Box className="menu-plan-date-month" sx={{ color: 'accent.main' }}>
          {Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date)}
        </Box>
      </>
    );
  };

  return (
    <Box className={`menu-list-container ${className}`}>
      <Box className="menu-list-header">
        <Box className="menu-list-header-date">Date</Box>
        <Box className="menu-list-header-dish">Dish</Box>
      </Box>
      <Box className="menu-list-columns">
        <Box className="menu-plan-dates-column"> {getDateBoxes()}</Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided: DroppableProvided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="menu-plan-names-column">
                {getMenuItemBoxes()}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Box>
  );
};

export default MenuList;