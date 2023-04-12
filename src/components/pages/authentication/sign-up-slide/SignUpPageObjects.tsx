import { act, configure, screen } from '@testing-library/react';
import { REDIRECT_TO_SIGN_IN } from '../../../../constants/AuthConstants';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { apiURL } from '../../../../services/ApiClient';
import { MOCK_SIGN_UP_REQUEST, MOCK_USER } from '../../../../constants/MockConstants';

configure({ testIdAttribute: 'class' });

export class SignUpPageObjects {
  get alreadyHaveAnAccountLink(): Promise<Element> {
    return screen.findByText(REDIRECT_TO_SIGN_IN);
  }

  get signUpImage(): Promise<Element> {
    return screen.findByTestId(/sign-up-image(?!\S)/);
  }

  get signUpSuccessScreen(): Promise<Element> {
    return screen.findByTestId(/status-screen-popup(?!\S)/);
  }

  get closeSuccessScreenButton(): Promise<Element> {
    return screen.findByTestId(/status-screen-primary-button(?!\S)/);
  }

  get signUpButton(): Promise<Element> {
    return screen.findByTestId(/authentication-button(?!\S)/);
  }

  get emailInput(): Promise<Element> {
    return screen.findByLabelText(/email(?!\S)/).then((res: HTMLElement) => res.children[1]);
  }

  get passwordInput(): Promise<Element> {
    return screen
      .findByLabelText(/create password(?!\S)/)
      .then((res: HTMLElement) => res.children[1]);
  }

  get usernameInput(): Promise<Element> {
    return screen.findByLabelText(/username(?!\S)/).then((res: HTMLElement) => res.children[1]);
  }

  get repeatPasswordInput(): Promise<Element> {
    return screen
      .findByLabelText(/repeat password(?!\S)/)
      .then((res: HTMLElement) => res.children[1]);
  }

  get signUpInfo(): Promise<Element> {
    return screen.findByTestId(/sign-up-info(?!\S)/);
  }

  setEmail = async (email: string) => {
    await act(async () => userEvent.type(await this.emailInput, email));
  };

  clickEmailInput = async () => {
    await act(async () => userEvent.click(await this.emailInput));
  };

  setPassword = async (password: string) => {
    await act(async () => userEvent.type(await this.passwordInput, password));
  };

  clickPasswordInput = async () => {
    await act(async () => userEvent.click(await this.passwordInput));
  };

  setUsername = async (email: string) => {
    await act(async () => userEvent.type(await this.usernameInput, email));
  };

  clickUsernameInput = async () => {
    await act(async () => userEvent.click(await this.usernameInput));
  };

  setRepeatedPassword = async (password: string) => {
    await act(async () => userEvent.type(await this.repeatPasswordInput, password));
  };

  clickRepeatedPasswordInput = async () => {
    await act(async () => userEvent.click(await this.repeatPasswordInput));
  };

  clickSignUpButton = async () => {
    await act(async () => userEvent.click(await this.signUpButton));
  };

  clickAlreadyHaveAnAccountLink = async () => {
    await act(async () => userEvent.click(await this.alreadyHaveAnAccountLink));
  };

  closeSuccessScreen = async () => {
    await act(async () => userEvent.click(await this.closeSuccessScreenButton));
  };

  enterValidCredentials = async () => {
    await this.setPassword(MOCK_SIGN_UP_REQUEST.password);
    await this.setRepeatedPassword(MOCK_SIGN_UP_REQUEST.password);
    await this.setUsername(MOCK_SIGN_UP_REQUEST.username);
    await this.setEmail(MOCK_SIGN_UP_REQUEST.email);
  };
}

const createMockServerHandler = (status: number) => {
  return rest.post(`${apiURL}/auth/signup`, (_req, res, ctx) => {
    return res(ctx.status(status), ctx.json(MOCK_USER));
  });
};

export const signUpMockServer = {
  HTTP_200: setupServer(createMockServerHandler(200)),
  HTTP_409: setupServer(createMockServerHandler(409)),
  HTTP_500: setupServer(createMockServerHandler(500))
};
