import * as React from 'react';
import { Form as AntForm, Icon, Button, Checkbox } from 'antd';
import { withFormik, FormikErrors, FormikProps, Field, Form } from 'formik';

import { registerValidationSchema } from '@abb/common';
import { InputField } from '../../shared/InputField';

const FormItem = AntForm.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
}

class View extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Form style={{ maxWidth: 300, margin: 'auto' }}>
          <Field
            name="email"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            component={InputField}
          />
          <Field
            name="password"
            type="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            component={InputField}
          />
          <FormItem>
            <Checkbox>Remember me</Checkbox>
            <a style={{ float: 'right' }} href="">Forgot password</a>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Register
            </Button>
            Or <a href="">login now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: registerValidationSchema,
  mapPropsToValues: props => ({
    email: '',
    password: '',
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  },
})(View);
