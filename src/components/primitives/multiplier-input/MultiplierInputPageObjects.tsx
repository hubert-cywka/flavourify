import { act, configure, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

configure({ testIdAttribute: 'class' });

export class MultiplierInputPageObjects {
  get valueField(): Promise<HTMLInputElement> {
    return screen.findByTestId(/value-field(?!\S)/);
  }

  get plusButton(): Promise<Element> {
    return screen.findByLabelText(/Increment(?!\S)/);
  }

  get minusButton(): Promise<Element> {
    return screen.findByLabelText(/Decrement(?!\S)/);
  }

  increaseCounter = async () => {
    await act(async () => userEvent.click(await this.plusButton));
  };

  decreaseCounter = async () => {
    await act(async () => userEvent.click(await this.minusButton));
  };
}
