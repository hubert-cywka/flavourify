import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { act, render } from '@testing-library/react';
import AppProvider from 'shared/providers/AppProvider';
import '@testing-library/jest-dom';
import StatusScreen from './StatusScreen';
import { StatusScreenPageObjects } from './StatusScreenPageObjects';
import { MOCK_CAPTION, MOCK_HEADER, MOCK_IMG_SOURCE } from 'shared/constants/MockConstants';

const prepareMockupPage = async (page: ReactJSXElement) => {
  await act(() => render(<AppProvider>{page}</AppProvider>));
};

const StatusScreenPO = new StatusScreenPageObjects();
const mockClose = jest.fn();
const mockSecondAction = jest.fn();
const waitForAnimationToEnd = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
};

describe('Testing <StatusScreen /> component', () => {
  describe('Testing variant with without additional callbacks', () => {
    beforeEach(async () => {
      await prepareMockupPage(
        <StatusScreen
          caption={MOCK_CAPTION}
          close={mockClose}
          header={MOCK_HEADER}
          imgSource={MOCK_IMG_SOURCE}
          open={true}
          status={'success'}
        />
      );
      await waitForAnimationToEnd();
    });

    describe('Testing layout', () => {
      test('should display valid header text', async () => {
        expect(await StatusScreenPO.header).toHaveTextContent(MOCK_HEADER);
      });

      test('should display valid caption text', async () => {
        expect(await StatusScreenPO.caption).toHaveTextContent(MOCK_CAPTION);
      });

      test('should display image, header, caption and button', async () => {
        expect(await StatusScreenPO.header).toBeVisible();
        expect(await StatusScreenPO.caption).toBeVisible();
        expect(await StatusScreenPO.primaryButton).toBeVisible();
        expect(await StatusScreenPO.image).toBeVisible();
      });
    });

    describe('Testing interactions', () => {
      test('should call onClose callback on primary button click', async () => {
        await StatusScreenPO.clickPrimaryButton();
        expect(mockClose).toHaveBeenCalled();
      });
    });
  });

  describe('Testing extended variant', () => {
    beforeEach(async () => {
      await prepareMockupPage(
        <StatusScreen
          caption={MOCK_CAPTION}
          close={mockClose}
          header={MOCK_HEADER}
          imgSource={MOCK_IMG_SOURCE}
          secondButtonOnClick={mockSecondAction}
          secondButtonText={MOCK_CAPTION}
          buttonText={MOCK_CAPTION}
          open={true}
          status={'error'}
        />
      );
      await waitForAnimationToEnd();
    });

    describe('Testing layout', () => {
      test('should display additional button', async () => {
        expect(await StatusScreenPO.secondaryButton).toBeVisible();
      });

      test('should display valid primary button text', async () => {
        expect(await StatusScreenPO.primaryButton).toHaveTextContent(MOCK_CAPTION);
      });

      test('should display valid secondary button text', async () => {
        expect(await StatusScreenPO.secondaryButton).toHaveTextContent(MOCK_CAPTION);
      });
    });

    describe('Testing interactions', () => {
      test('should call secondary button callback on click', async () => {
        await StatusScreenPO.clickSecondaryButton();
        expect(mockSecondAction).toHaveBeenCalled();
      });
    });
  });
});
