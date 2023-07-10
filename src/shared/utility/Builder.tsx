import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { CircularProgress } from '@mui/material';

class Builder {
  private _status: string = 'loading';

  success: ReactJSXElement = (<></>);
  error: ReactJSXElement = (<></>);
  idle: ReactJSXElement = (<></>);
  loading: ReactJSXElement = (<CircularProgress sx={{ color: 'accent.main' }} />);

  constructor(status: string) {
    this._status = status;
  }

  static createResult(status: string) {
    if (!status || !status.length)
      throw new Error(
        "Status must be defined. Possible values: 'success', 'loading', 'idle', 'error'. Any other value will be treated as 'error'."
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

  onIdle(result: ReactJSXElement) {
    this.idle = result;
    return this;
  }

  onLoading(result: ReactJSXElement) {
    this.loading = result;
    return this;
  }

  build(): ReactJSXElement {
    switch (this._status) {
      case 'success':
        return this.success;
      case 'loading':
        return this.loading;
      case 'idle':
        return this.idle;
      default:
        return this.error;
    }
  }
}

export default Builder;
