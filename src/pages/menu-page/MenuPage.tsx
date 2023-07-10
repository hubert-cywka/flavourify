import { Box, Button, CircularProgress, IconButton, Slide } from '@mui/material';
import './MenuPage.scss';
import { useState } from 'react';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import MenuPlan from './menu-plan/MenuPlan';
import { simpleOpacityAnimation } from 'shared/constants/AnimationConfigs';
import {
  MENU_INGREDIENTS_INFO,
  MENU_INGREDIENTS_HEADER,
  MENU_INGREDIENTS_IMAGE,
  NO_INGREDIENTS_ERROR
} from 'shared/constants/DishesConstants';
import Builder from 'shared/utility/Builder';
import { useMenuIngredients } from 'shared/hooks/queries/useDishIngredients';
import { useMenu } from 'shared/hooks/queries/useMenu';
import AnimatePresence from 'components/animate-presence/AnimatePresence';
import IngredientsList from 'components/ingredients/ingredients-list/IngredientsList';
import TopNavbar from 'components/navbars/top-navbar/TopNavbar';

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

        <Slide in={areIngredientsVisible} direction="up" mountOnEnter unmountOnExit>
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
