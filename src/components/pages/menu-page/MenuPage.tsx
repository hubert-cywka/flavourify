import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import './MenuPage.scss';
import MenuPlan from './menu-plan/MenuPlan';
import IngredientsList from '../../ingredients/ingredients-list/IngredientsList';
import { useQuery } from '@tanstack/react-query';
import { MENU_INGREDIENTS_QUERY } from '../../../constants/QueryConstants';
import { getDishesIngredients } from '../../../services/DishService';
import { getMenu } from '../../../services/MenuService';
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
import { simpleOpacityAnimation, slideFromBottom } from '../../../constants/AnimationConfigs';
import Animate from '../../animate/Animate';

const MenuPage = () => {
  const [menu, setMenu] = useState(getMenu());
  const [areIngredientsVisible, setAreIngredientsVisible] = useState<boolean>(false);
  const { data, status, refetch } = useQuery([MENU_INGREDIENTS_QUERY], () =>
    getDishesIngredients(menu.map((dish) => dish.id))
  );

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
      <Animate className="menu-container" isVisible={true} animation={simpleOpacityAnimation}>
        <MenuPlan menu={menu} onMenuChange={setMenu} className="menu" />
        {!!menu.length && (
          <IconButton className="toggle-ingredients-visibility-button" onClick={swapSlide}>
            <ExpandCircleDownRoundedIcon
              sx={{ color: 'text.primary' }}
              className={areIngredientsVisible ? 'hide' : 'expand'}
            />
          </IconButton>
        )}

        <Animate
          isVisible={areIngredientsVisible}
          className="menu-ingredients-container"
          animation={slideFromBottom}>
          <Box className="menu-ingredients" sx={{ bgcolor: 'primary.dark' }}>
            <img className="menu-ingredients-image" src={MENU_INGREDIENTS_IMAGE} />
            <Box className="menu-ingredients-header">{MENU_INGREDIENTS_HEADER}</Box>
            <Box className="menu-ingredients-info">{MENU_INGREDIENTS_INFO}</Box>
            {buildIngredientsList()}
          </Box>
        </Animate>
      </Animate>
    </Box>
  );
};

export default MenuPage;
