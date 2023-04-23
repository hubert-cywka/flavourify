import { act, configure, screen } from '@testing-library/react';
import { REDIRECT_TO_SIGN_UP } from '../../../../constants/AuthConstants';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { apiURL } from '../../../../services/ApiClient';
import { MOCK_SIGN_IN_RESPONSE } from '../../../../constants/MockConstants';

configure({ testIdAttribute: 'class' });

export class SignInPageObjects {
  get createAccountLink(): Promise<Element> {
    return screen.findByText(REDIRECT_TO_SIGN_UP);
  }

  get signInImage(): Promise<Element> {
    return screen.findByTestId(/sign-in-image(?!\S)/);
  }

  get signInButton(): Promise<Element> {
    return screen.findByTestId(/authentication-button(?!\S)/);
  }

  get emailInput(): Promise<Element> {
    return screen.findByLabelText(/email(?!\S)/).then((res: HTMLElement) => res.children[1]);
  }

  get passwordInput(): Promise<Element> {
    return screen.findByLabelText(/password(?!\S)/).then((res: HTMLElement) => res.children[1]);
  }

  setEmail = async (email: string) => {
    await act(async () => userEvent.type(await this.emailInput, email));
  };

  setPassword = async (password: string) => {
    await act(async () => userEvent.type(await this.passwordInput, password));
  };

  clickSignInButton = async () => {
    await act(async () => userEvent.click(await this.signInButton));
  };

  clickSignUpLink = async () => {
    await act(async () => userEvent.click(await this.createAccountLink));
  };
}

const createMockServerHandler = (status: number) => {
  return rest.post(`${apiURL}/auth/signin`, (_req, res, ctx) => {
    return res(ctx.status(status), ctx.json(MOCK_SIGN_IN_RESPONSE));
  });
};

export const signInMockServerHandlers = {
  HTTP_401: [createMockServerHandler(401)],
  HTTP_500: [createMockServerHandler(500)],
  HTTP_200: [createMockServerHandler(200)]
};

export const signInMockServer = setupServer(...signInMockServerHandlers.HTTP_200);
