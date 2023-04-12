import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { act, render } from '@testing-library/react';
import AppProvider from '../../AppProvider';
import '@testing-library/jest-dom';
import StatusScreen from './StatusScreen';
import { StatusScreenPageObjects } from './StatusScreenPageObjects';
import { MOCK_CAPTION, MOCK_HEADER, MOCK_IMG_SOURCE } from '../../constants/MockConstants';

const prepareMockupPage = async (page: ReactJSXElement) => {
  await act(() => render(<AppProvider>{page}</AppProvider>));
};

const StatusScreenPO = new StatusScreenPageObjects();
const mockClose = jest.fn();
const mockSecondAction = jest.fn();

describe('Testing <StatusScreen /> component with one button', () => {
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
  });

  test('should display valid header text', async () => {
    expect(await StatusScreenPO.header).toHaveTextContent(MOCK_HEADER);
  });

  test('should display valid caption text', async () => {
    expect(await StatusScreenPO.caption).toHaveTextContent(MOCK_CAPTION);
  });

  test('should call onClose callback on primary button click', async () => {
    await StatusScreenPO.clickPrimaryButton();
    expect(mockClose).toHaveBeenCalled();
  });

  test('should display image, header, caption and button', async () => {
    expect(await StatusScreenPO.header).toBeVisible();
    expect(await StatusScreenPO.caption).toBeVisible();
    expect(await StatusScreenPO.primaryButton).toBeVisible();
    expect(await StatusScreenPO.image).toBeVisible();
  });
});

describe('Testing <StatusScreen /> component with two buttons and overwritten text', () => {
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
  });

  test('should display image, header, caption and 2 buttons', async () => {
    expect(await StatusScreenPO.header).toBeVisible();
    expect(await StatusScreenPO.caption).toBeVisible();
    expect(await StatusScreenPO.primaryButton).toBeVisible();
    expect(await StatusScreenPO.secondaryButton).toBeVisible();
    expect(await StatusScreenPO.image).toBeVisible();
  });

  test('should call onClose callback on primary button click', async () => {
    await StatusScreenPO.clickSecondaryButton();
    expect(mockSecondAction).toHaveBeenCalled();
  });

  test('should display valid primary button text', async () => {
    expect(await StatusScreenPO.primaryButton).toHaveTextContent(MOCK_CAPTION);
  });

  test('should display valid secondary button text', async () => {
    expect(await StatusScreenPO.secondaryButton).toHaveTextContent(MOCK_CAPTION);
  });
});
