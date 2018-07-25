import * as React from 'react';
import * as yup from 'yup';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withFormik, FormikErrors, FormikProps } from 'formik';

const FormItem = Form.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
}

class View extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { values, handleChange, handleBlur, handleSubmit, touched, errors } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        <Form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: 'auto' }}>
          <FormItem
            help={touched.email && errors.email ? errors.email : ''}
            validateStatus={touched.email && errors.email ? "error" : undefined}
          >
              <Input
                name="email"
                value={values.email}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </FormItem>
          <FormItem
            help={touched.password && errors.password ? errors.password : ''}
            validateStatus={touched.password && errors.password ? "error" : undefined}
          >
              <Input
                name="password"
                value={values.password}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </FormItem>
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

const emailNotLongEnough = "email must be at least 3 characters";
const passwordNotLongEnough = "password must be at least 3 characters";
const invalidEmail = "email must be a valid email";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: yup
    .string()
    .min(3, passwordNotLongEnough)
    .max(255)
    .required()
});

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema,
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
