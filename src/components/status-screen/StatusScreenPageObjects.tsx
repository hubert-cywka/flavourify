import { act, configure, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

configure({ testIdAttribute: 'class' });

export class StatusScreenPageObjects {
  get image(): Promise<HTMLInputElement> {
    return screen.findByTestId(/status-screen-image(?!\S)/);
  }

  get header(): Promise<HTMLInputElement> {
    return screen.findByTestId(/status-screen-header(?!\S)/);
  }

  get caption(): Promise<HTMLInputElement> {
    return screen.findByTestId(/status-screen-info(?!\S)/);
  }

  get primaryButton(): Promise<HTMLInputElement> {
    return screen.findByTestId(/status-screen-primary-button(?!\S)/);
  }

  get secondaryButton(): Promise<HTMLInputElement> {
    return screen.findByTestId(/status-screen-secondary-button(?!\S)/);
  }

  clickPrimaryButton = async () => {
    await act(async () => userEvent.click(await this.primaryButton));
  };

  clickSecondaryButton = async () => {
    await act(async () => userEvent.click(await this.secondaryButton));
  };
}
