import * as React from 'react';
import { RegisterController } from '@abb/controller';

import { RegisterView } from './views/RegisterView';

export class RegisterConnector extends React.PureComponent {

  dummySubmit = async (values: any) => {
    console.log(values);
    return null;
  }

  render() {
    return (
      <RegisterController>
        {({ submit }) => <RegisterView submit={submit} />}
      </RegisterController>
    );
}}
