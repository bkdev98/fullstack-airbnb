import * as React from 'react';
import { RegisterController } from '@abb/controller';

import { RegisterView } from './views/RegisterView';

export class RegisterConnector extends React.PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }: { submit: any }) => <RegisterView submit={submit} />}
      </RegisterController>
    );
}}
