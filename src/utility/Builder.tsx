import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { CircularProgress } from '@mui/material';

class Builder {
  private readonly _status: string = 'loading';

  success: ReactJSXElement = (<></>);
  error: ReactJSXElement = (<></>);
  loading: ReactJSXElement = (<CircularProgress sx={{ color: 'accent.main' }} />);

  constructor(status: string) {
    this._status = status;
  }

  static createResult(status: string) {
    if (!status || !status.length)
      throw new Error(
        "Status must be defined. Possible values: 'success', 'loading'. Any other value will be treated as 'error'."
      );
    return new Builder(status);
  }

  onSuccess(result: ReactJSXElement) {
    this.success = result;
    return this;
  }

  onError(result: ReactJSXElement) {
    this.error = result;
    return this;
  }

  onLoading(result: ReactJSXElement) {
    this.loading = result;
    return this;
  }

  build(): ReactJSXElement {
    if (this._status === 'success') {
      return this.success;
    } else if (this._status === 'loading') {
      return this.loading;
    } else {
      return this.error;
    }
  }
}

export default Builder;
