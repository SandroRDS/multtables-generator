import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const setup = (component: React.ReactElement) => ({
  ...render(component),
  user: userEvent.setup(),
});

export default setup;
