import { act, render } from '@testing-library/react';
import { MOCK_INPUT_VALUE } from 'shared/constants/MockConstants';
import EditableTextField from './EditableTextField';
import { EditableTextFieldPageObjects } from './EditableTextFieldPageObjects';
import '@testing-library/jest-dom';
import { FIELD_CANNOT_BE_EMPTY, VALUE_MUST_BE_NUMBER } from 'shared/constants/AppConstants';
import AppProvider from 'shared/providers/AppProvider';

const prepareMockupPage = async (
  mockValue: string,
  isReadOnly?: boolean,
  type?: 'text' | 'number',
  max?: number
) => {
  await act(() =>
    render(
      <AppProvider>
        <EditableTextField value={mockValue} isReadOnly={isReadOnly} type={type} max={max} />
      </AppProvider>
    )
  );
};

const TextFieldPO = new EditableTextFieldPageObjects();
describe('Testing <EditableTextField/> component', () => {
  describe('Testing interactions', () => {
    test('should not be in input mode when isReadOnly is set', async () => {
      await prepareMockupPage(MOCK_INPUT_VALUE, true);
      await TextFieldPO.clickOnInput();
      expect(await TextFieldPO.input).not.toHaveFocus();
    });

    test('should be in input mode when isReadOnly is not set', async () => {
      await prepareMockupPage(MOCK_INPUT_VALUE);
      await TextFieldPO.clickOnInput();
      expect(await TextFieldPO.input).toHaveFocus();
    });

    test('should not accept text when in number mode', async () => {
      await prepareMockupPage('1', false, 'number');
      await TextFieldPO.enterValue('numbers are forbidden and should not be accepted');
      expect(await TextFieldPO.input).toHaveValue('1');
      expect(await TextFieldPO.alert).toHaveTextContent(VALUE_MUST_BE_NUMBER);
    });

    test('should accept text when in default mode', async () => {
      await prepareMockupPage('');
      await TextFieldPO.enterValue(MOCK_INPUT_VALUE);
      expect(await TextFieldPO.input).toHaveValue(MOCK_INPUT_VALUE);
    });
  });

  describe('Testing error handling', () => {
    test('should display an error if input is empty', async () => {
      await prepareMockupPage(MOCK_INPUT_VALUE);
      await TextFieldPO.clear();
      await TextFieldPO.clickOutsideInput();
      expect(await TextFieldPO.alert).toBeVisible();
      expect(await TextFieldPO.alert).toHaveTextContent(FIELD_CANNOT_BE_EMPTY);
    });

    test('should display an error if input value is too long', async () => {
      await prepareMockupPage('', false, 'text', 3);
      await TextFieldPO.enterValue(MOCK_INPUT_VALUE);
      expect(await TextFieldPO.alert).toBeVisible();
    });
  });
});
