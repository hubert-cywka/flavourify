import { act, configure, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

configure({ testIdAttribute: 'class' });

export class EditableTextFieldPageObjects {
  get input(): Promise<HTMLInputElement> {
    return screen.findByTestId(/MuiInput-input(?!\S)/);
  }

  get alert(): Promise<Element> {
    return screen.findByTestId(/SnackbarItem-message(?!\S)/);
  }

  clickOnInput = async () => {
    await act(async () => userEvent.click(await this.input));
  };

  clickOutsideInput = async () => {
    await act(async () => userEvent.tab());
  };

  enterValue = async (value: string) => {
    await act(async () => userEvent.type(await this.input, value));
  };

  clear = async () => {
    await act(async () => userEvent.clear(await this.input));
  };
}
