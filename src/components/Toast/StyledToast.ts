import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

const StyledToast = styled(ToastContainer)`
  font-size: var(--text-m);
  padding: 0;

  @media (max-width: 430px) {
    bottom: 56px;
    padding: 0 16px;

    .Toastify__toast {
      border-radius: 6px;
    }
  }

  .Toastify__toast {
    padding: 0 16px;
    margin: 0;
  }

  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }
`;

export default StyledToast;
