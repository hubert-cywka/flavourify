import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { act, render } from '@testing-library/react';
import AppProvider from '../../../AppProvider';
import { MOCK_INPUT_VALUE } from '../../../constants/MockConstants';
import EditableTextField from './EditableTextField';
import { EditableTextFieldPageObjects } from './EditableTextFieldPageObjects';
import '@testing-library/jest-dom';
import { FIELD_CANNOT_BE_EMPTY, VALUE_MUST_BE_NUMBER } from '../../../constants/AppConstants';

const prepareMockupPage = async (page: ReactJSXElement) => {
  await act(() => render(<AppProvider>{page}</AppProvider>));
};

const TextFieldPO = new EditableTextFieldPageObjects();
describe('Testing <EditableTextField/> component', () => {
  describe('Testing interactions', () => {
    test('should not be in input mode when isReadOnly is set', async () => {
      await prepareMockupPage(<EditableTextField value={MOCK_INPUT_VALUE} isReadOnly={true} />);
      await TextFieldPO.clickOnInput();
      expect(await TextFieldPO.input).not.toHaveFocus();
    });

    test('should be in input mode when isReadOnly is not set', async () => {
      await prepareMockupPage(<EditableTextField value={MOCK_INPUT_VALUE} />);
      await TextFieldPO.clickOnInput();
      expect(await TextFieldPO.input).toHaveFocus();
    });

    test('should not accept text when in number mode', async () => {
      await prepareMockupPage(<EditableTextField value={'1'} type="number" />);
      await TextFieldPO.enterValue('numbers are forbidden and should not be accepted');
      expect(await TextFieldPO.input).toHaveValue('1');
      expect(await TextFieldPO.alert).toHaveTextContent(VALUE_MUST_BE_NUMBER);
    });

    test('should accept text when in default mode', async () => {
      await prepareMockupPage(<EditableTextField value={''} />);
      await TextFieldPO.enterValue(MOCK_INPUT_VALUE);
      expect(await TextFieldPO.input).toHaveValue(MOCK_INPUT_VALUE);
    });
  });

  describe('Testing error handling', () => {
    test('should display an error if input is empty', async () => {
      await prepareMockupPage(<EditableTextField value={MOCK_INPUT_VALUE} />);
      await TextFieldPO.clear();
      await TextFieldPO.clickOutsideInput();
      expect(await TextFieldPO.alert).toBeVisible();
      expect(await TextFieldPO.alert).toHaveTextContent(FIELD_CANNOT_BE_EMPTY);
    });

    test('should display an error if input value is too long', async () => {
      await prepareMockupPage(<EditableTextField value={''} max={3} />);
      await TextFieldPO.enterValue(MOCK_INPUT_VALUE);
      expect(await TextFieldPO.alert).toBeVisible();
    });
  });
});
