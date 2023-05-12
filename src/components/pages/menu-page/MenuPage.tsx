import { Box, Button, CircularProgress, IconButton, Slide } from '@mui/material';
import './MenuPage.scss';
import MenuPlan from './menu-plan/MenuPlan';
import IngredientsList from '../../ingredients/ingredients-list/IngredientsList';
import TopNavbar from '../../navbars/top-navbar/TopNavbar';
import { useState } from 'react';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import {
  MENU_INGREDIENTS_INFO,
  MENU_INGREDIENTS_HEADER,
  MENU_INGREDIENTS_IMAGE,
  NO_INGREDIENTS_ERROR
} from '../../../constants/DishesConstants';
import Builder from '../../../utility/Builder';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { simpleOpacityAnimation } from '../../../constants/AnimationConfigs';
import AnimatePresence from '../../animate-presence/AnimatePresence';
import { useMenu } from '../../../utility/hooks/queries/useMenu';
import { useMenuIngredients } from '../../../utility/hooks/queries/useDishIngredients';

const MenuPage = () => {
  const { menu, setMenu } = useMenu();
  const [areIngredientsVisible, setAreIngredientsVisible] = useState<boolean>(false);
  const { data, status, refetch } = useMenuIngredients(menu);

  const swapSlide = () => setAreIngredientsVisible((prev) => !prev);

  const buildIngredientsList = () => {
    return Builder.createResult(status)
      .onSuccess(
        <>{data && <IngredientsList withMultiplier ingredients={data} amountLimit={0} />}</>
      )
      .onLoading(<CircularProgress className="no-ingredients" />)
      .onError(
        <Box className="no-ingredients">
          <Box className="no-ingredients-error">{NO_INGREDIENTS_ERROR}</Box>
          <Button
            endIcon={<RefreshRoundedIcon />}
            className="refetch-ingredients-button"
            variant="accentContained"
            onClick={() => refetch()}>
            Retry
          </Button>
        </Box>
      )
      .build();
  };

  return (
    <Box
      className="menu-page-container"
      sx={{
        bgcolor: 'primary.main',
        color: 'text.primary'
      }}>
      <TopNavbar className="top-navbar" />
      <AnimatePresence
        className="menu-container"
        isVisible={true}
        animation={simpleOpacityAnimation}>
        <MenuPlan menu={menu} onMenuChange={setMenu} className="menu" />
        {!!menu.length && (
          <IconButton className="toggle-ingredients-visibility-button" onClick={swapSlide}>
            <ExpandCircleDownRoundedIcon
              sx={{ color: 'text.primary' }}
              className={areIngredientsVisible ? 'hide' : 'expand'}
            />
          </IconButton>
        )}

        <Slide in={areIngredientsVisible} direction="up">
          <Box className="menu-ingredients-container">
            <Box className="menu-ingredients" sx={{ bgcolor: 'primary.dark' }}>
              <img className="menu-ingredients-image" src={MENU_INGREDIENTS_IMAGE} />
              <Box className="menu-ingredients-header">{MENU_INGREDIENTS_HEADER}</Box>
              <Box className="menu-ingredients-info">{MENU_INGREDIENTS_INFO}</Box>
              {buildIngredientsList()}
            </Box>
          </Box>
        </Slide>
      </AnimatePresence>
    </Box>
  );
};

export default MenuPage;
