import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { signInMockServer, signInMockServerHandlers, SignInPageObjects } from './SignInPageObjects';
import SignInSlide from './SignInSlide';
import AppProvider from '../../../AppProvider';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { QueryClientProvider } from '@tanstack/react-query';
import { SIGN_UP_UNEXPECTED_ERROR, USER_NOT_FOUND } from '../../../constants/AuthConstants';
import { MOCK_SIGN_IN_REQUEST } from '../../../constants/MockConstants';
import testsQueryClient from '../../../utility/testing/TestsQueryClient';
import appRouter from '../../../router/AppRouter';

const mockSlideToSignUp = jest.fn();
const SignInPO: SignInPageObjects = new SignInPageObjects();
const prepareMockupPage = async (page: ReactJSXElement) => {
  await act(() =>
    render(
      <AppProvider>
        <QueryClientProvider client={testsQueryClient}>{page}</QueryClientProvider>
      </AppProvider>
    )
  );
};

describe('Testing <SignInSlide/> component when everything goes right', () => {
  beforeEach(async () => {
    await prepareMockupPage(<SignInSlide slideToSignUp={mockSlideToSignUp} />);
  });

  beforeAll(() => {
    signInMockServer.listen();
  });

  afterEach(() => {
    signInMockServer.resetHandlers();
  });

  afterAll(() => {
    signInMockServer.close();
  });

  describe('Testing layout', () => {
    test('should load sign in form', async () => {
      expect(await SignInPO.signInImage).toBeVisible();
      expect(await SignInPO.signInButton).toBeVisible();
      expect(await SignInPO.passwordInput).toBeVisible();
      expect(await SignInPO.emailInput).toBeVisible();
    });
  });

  describe('Testing interactions', () => {
    test('should allow to slide to sign up', async () => {
      await SignInPO.clickSignUpLink();
      expect(mockSlideToSignUp).toHaveBeenCalled();
    });

    test('should allow to type email', async () => {
      await SignInPO.setEmail(MOCK_SIGN_IN_REQUEST.email);
      expect(await SignInPO.emailInput).toHaveValue(MOCK_SIGN_IN_REQUEST.email);
    });

    test('should allow to type password', async () => {
      await SignInPO.setPassword(MOCK_SIGN_IN_REQUEST.password);
      expect(await SignInPO.passwordInput).toHaveValue(MOCK_SIGN_IN_REQUEST.password);
    });

    test('should allow to sign in', async () => {
      const mockSignIn = jest.spyOn(appRouter, 'navigate');
      await SignInPO.setPassword(MOCK_SIGN_IN_REQUEST.password);
      await SignInPO.setEmail(MOCK_SIGN_IN_REQUEST.email);
      await SignInPO.clickSignInButton();
      expect(mockSignIn).toHaveBeenCalled();
    });
  });

  describe('Testing api behaviour', () => {
    test('should display proper error message if user does not exist', async () => {
      signInMockServer.use(...signInMockServerHandlers.HTTP_401);
      await SignInPO.setPassword(MOCK_SIGN_IN_REQUEST.password);
      await SignInPO.setEmail(MOCK_SIGN_IN_REQUEST.email);
      await SignInPO.clickSignInButton();
      expect(await SignInPO.signInButton).toHaveTextContent(USER_NOT_FOUND);
    });

    test('should clear error message on next button click', async () => {
      signInMockServer.use(...signInMockServerHandlers.HTTP_401);
      await SignInPO.setPassword(MOCK_SIGN_IN_REQUEST.password);
      await SignInPO.setEmail(MOCK_SIGN_IN_REQUEST.email);
      await SignInPO.clickSignInButton();
      await SignInPO.clickSignInButton();
      expect(await SignInPO.signInButton).not.toHaveTextContent(USER_NOT_FOUND);
    });
  });

  test('should display proper error message in any other error happens', async () => {
    signInMockServer.use(...signInMockServerHandlers.HTTP_500);
    await SignInPO.setPassword(MOCK_SIGN_IN_REQUEST.password);
    await SignInPO.setEmail(MOCK_SIGN_IN_REQUEST.email);
    await SignInPO.clickSignInButton();
    expect(await SignInPO.signInButton).toHaveTextContent(SIGN_UP_UNEXPECTED_ERROR);
  });
});

export {};
