import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { act, render } from '@testing-library/react';
import AppProvider from '../../../AppProvider';
import '@testing-library/jest-dom';
import { MultiplierInputPageObjects } from './MultiplierInputPageObjects';
import MultiplierInput from './MultiplierInput';
import React from 'react';

const prepareMockupPage = async (page: ReactJSXElement) => {
  await act(() => render(<AppProvider>{page}</AppProvider>));
};

const MultiplierInputPO = new MultiplierInputPageObjects();
let mockValue = 1;
const mockUpdateValue: React.Dispatch<number> = (value: number) => {
  mockValue = value;
};
describe('Testing <MultiplierInput /> component', () => {
  beforeEach(() => {
    mockValue = 1;
  });

  describe('Testing layout', () => {
    test('should display value and 2 buttons', async () => {
      await prepareMockupPage(<MultiplierInput value={mockValue} onChange={mockUpdateValue} />);
      expect(await MultiplierInputPO.valueField).toBeVisible();
      expect(await MultiplierInputPO.plusButton).toBeVisible();
      expect(await MultiplierInputPO.minusButton).toBeVisible();
    });

    test('should display current value', async () => {
      await prepareMockupPage(<MultiplierInput value={mockValue} onChange={mockUpdateValue} />);
      expect(await MultiplierInputPO.valueField).toHaveTextContent(`${mockValue}`);
    });
  });

  describe('Testing interactions', () => {
    test('should allow to increase counter', async () => {
      const initialValue = mockValue;
      await prepareMockupPage(<MultiplierInput value={mockValue} onChange={mockUpdateValue} />);
      await MultiplierInputPO.increaseCounter();
      expect(mockValue).toBe(initialValue + 1);
    });

    test('should allow to decrease counter', async () => {
      const initialValue = mockValue;
      await prepareMockupPage(<MultiplierInput value={mockValue} onChange={mockUpdateValue} />);
      await MultiplierInputPO.decreaseCounter();
      expect(mockValue).toBe(initialValue - 1);
    });

    test('should not allow to set number above upper limit', async () => {
      const initialValue = mockValue;
      await prepareMockupPage(
        <MultiplierInput value={mockValue} onChange={mockUpdateValue} max={mockValue} />
      );
      await MultiplierInputPO.increaseCounter();
      expect(mockValue).toBe(initialValue);
    });

    test('should not allow to set number below lower limit', async () => {
      const initialValue = mockValue;
      await prepareMockupPage(
        <MultiplierInput value={mockValue} onChange={mockUpdateValue} min={mockValue} />
      );
      await MultiplierInputPO.decreaseCounter();
      expect(mockValue).toBe(initialValue);
    });
  });
});
