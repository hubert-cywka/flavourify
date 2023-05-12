import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { QueryClientProvider } from '@tanstack/react-query';
import { signUpMockServer, signUpMockServerHandlers, SignUpPageObjects } from './SignUpPageObjects';
import SignUpSlide from './SignUpSlide';
import AppProvider from '../../../../AppProvider';
import {
  EMAIL_REQUIREMENTS,
  NICKNAME_REQUIREMENTS,
  PASSWORDS_NOT_MATCHING,
  PASSWORD_REQUIREMENTS,
  REPEAT_PASSWORD_REQUIREMENTS,
  SIGN_UP_INITIAL_INFO,
  WRONG_EMAIL,
  WRONG_PASSWORD,
  NICKNAME_TOO_SHORT,
  NICKNAME_TOO_LONG,
  INVALID_SIGN_UP_DATA,
  SIGN_UP_UNEXPECTED_ERROR,
  EMAIL_ALREADY_EXISTS
} from '../../../../constants/AuthConstants';
import { MOCK_SIGN_UP_REQUEST } from '../../../../constants/MockConstants';
import {
  NICKNAME_MAXIMUM_LENGTH,
  NICKNAME_MINIMUM_LENGTH
} from '../../../../constants/NumberConstants';
import testsQueryClient from '../../../../utility/testing/TestsQueryClient';

const mockSlideToSignIn = jest.fn();
const SignUpPO: SignUpPageObjects = new SignUpPageObjects();

const prepareMockupPage = async (page: ReactJSXElement) => {
  await act(() =>
    render(
      <AppProvider>
        <QueryClientProvider client={testsQueryClient}>{page}</QueryClientProvider>
      </AppProvider>
    )
  );
};
describe('Testing <SignUpSlide/> component when everything goes right', () => {
  beforeEach(async () => {
    await prepareMockupPage(<SignUpSlide slideToSignIn={mockSlideToSignIn} />);
  });

  beforeAll(() => {
    signUpMockServer.listen();
    signUpMockServer.use(...signUpMockServerHandlers.HTTP_200);
  });

  afterEach(() => {
    signUpMockServer.resetHandlers();
  });

  afterAll(() => {
    signUpMockServer.close();
  });

  describe('Testing layout', () => {
    test('should load sign in form', async () => {
      expect(await SignUpPO.signUpImage).toBeVisible();
      expect(await SignUpPO.signUpButton).toBeVisible();
      expect(await SignUpPO.passwordInput).toBeVisible();
      expect(await SignUpPO.emailInput).toBeVisible();
      expect(await SignUpPO.repeatPasswordInput).toBeVisible();
      expect(await SignUpPO.usernameInput).toBeVisible();
      expect(await SignUpPO.signUpInfo).toBeVisible();
    });

    test('should display initial sign up info', async () => {
      expect(await SignUpPO.signUpInfo).toHaveTextContent(SIGN_UP_INITIAL_INFO);
    });
  });

  describe('Testing interactions', () => {
    test('should allow to slide to sign in', async () => {
      await SignUpPO.clickAlreadyHaveAnAccountLink();
      expect(mockSlideToSignIn).toHaveBeenCalled();
    });

    test('should allow to type email', async () => {
      await SignUpPO.setEmail(MOCK_SIGN_UP_REQUEST.email);
      expect(await SignUpPO.emailInput).toHaveValue(MOCK_SIGN_UP_REQUEST.email);
    });

    test('should allow to type password', async () => {
      await SignUpPO.setPassword(MOCK_SIGN_UP_REQUEST.password);
      expect(await SignUpPO.passwordInput).toHaveValue(MOCK_SIGN_UP_REQUEST.password);
    });

    test('should allow to repeat password', async () => {
      await SignUpPO.setRepeatedPassword(MOCK_SIGN_UP_REQUEST.password);
      expect(await SignUpPO.repeatPasswordInput).toHaveValue(MOCK_SIGN_UP_REQUEST.password);
    });

    test('should allow to type username', async () => {
      await SignUpPO.setUsername(MOCK_SIGN_UP_REQUEST.username);
      expect(await SignUpPO.usernameInput).toHaveValue(MOCK_SIGN_UP_REQUEST.username);
    });

    test('should allow to sign up', async () => {
      await SignUpPO.enterValidCredentials();
      await SignUpPO.clickSignUpButton();
      await new Promise((resolve) => setTimeout(resolve, 300));
      expect(await SignUpPO.signUpSuccessScreen).toBeVisible();
    });

    test('should allow to hide message after creating account and redirect to sign in', async () => {
      await SignUpPO.enterValidCredentials();
      await SignUpPO.clickSignUpButton();
      await new Promise((resolve) => setTimeout(resolve, 300));
      await SignUpPO.closeSuccessScreen();
      expect(mockSlideToSignIn).toHaveBeenCalled();
    });
  });

  describe('Testing input validation and if correct instruction is displayed', () => {
    test('should display info about email on input focus', async () => {
      await SignUpPO.clickEmailInput();
      expect(await SignUpPO.signUpInfo).toHaveTextContent(EMAIL_REQUIREMENTS);
    });

    test('should display info about password on input focus', async () => {
      await SignUpPO.clickPasswordInput();
      expect(await SignUpPO.signUpInfo).toHaveTextContent(PASSWORD_REQUIREMENTS);
    });

    test('should display info about repeated password on input focus', async () => {
      await SignUpPO.clickRepeatedPasswordInput();
      expect(await SignUpPO.signUpInfo).toHaveTextContent(REPEAT_PASSWORD_REQUIREMENTS);
    });

    test('should display info about username on input focus', async () => {
      await SignUpPO.clickUsernameInput();
      expect(await SignUpPO.signUpInfo).toHaveTextContent(NICKNAME_REQUIREMENTS);
    });

    test('should display error when wrong email format is typed', async () => {
      await SignUpPO.setEmail('mock@email.');
      await SignUpPO.clickUsernameInput();
      await SignUpPO.clickEmailInput();
      expect(await SignUpPO.signUpInfo).toHaveTextContent(WRONG_EMAIL);
    });

    test('should display error when wrong password format is typed', async () => {
      await SignUpPO.setPassword('mock');
      await SignUpPO.clickUsernameInput();
      await SignUpPO.clickPasswordInput();
      expect(await SignUpPO.signUpInfo).toHaveTextContent(WRONG_PASSWORD);
    });

    test('should display error when passwords are not matching', async () => {
      await SignUpPO.setRepeatedPassword('mock');
      await SignUpPO.clickUsernameInput();
      await SignUpPO.clickRepeatedPasswordInput();
      expect(await SignUpPO.signUpInfo).toHaveTextContent(PASSWORDS_NOT_MATCHING);
    });

    test('should display error when username is too short', async () => {
      await SignUpPO.setUsername('m'.repeat(NICKNAME_MINIMUM_LENGTH - 1));
      await SignUpPO.clickPasswordInput();
      await SignUpPO.clickUsernameInput();
      expect(await SignUpPO.signUpInfo).toHaveTextContent(NICKNAME_TOO_SHORT);
    });

    test('should display error when username is too long', async () => {
      await SignUpPO.setUsername('m'.repeat(NICKNAME_MAXIMUM_LENGTH + 1));
      await SignUpPO.clickPasswordInput();
      await SignUpPO.clickUsernameInput();
      expect(await SignUpPO.signUpInfo).toHaveTextContent(NICKNAME_TOO_LONG);
    });
  });

  describe('Testing api behaviour', () => {
    test('should display proper error message if user already exists', async () => {
      signUpMockServer.use(...signUpMockServerHandlers.HTTP_409);
      await SignUpPO.enterValidCredentials();
      await SignUpPO.clickSignUpButton();
      expect(await SignUpPO.signUpButton).toHaveTextContent(EMAIL_ALREADY_EXISTS);
    });

    test('should display proper error message if any other error happens', async () => {
      signUpMockServer.use(...signUpMockServerHandlers.HTTP_500);
      await SignUpPO.enterValidCredentials();
      await SignUpPO.clickSignUpButton();
      expect(await SignUpPO.signUpButton).toHaveTextContent(SIGN_UP_UNEXPECTED_ERROR);
    });
  });
});

export {};
