import { Cache } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ResetPassword = ({ onResetPassword, onChangeMode }) => {
  const [details, setDetails] = useState();

  const { handleSubmit, register, errors } = useForm({
    defaultValues: { username: '', password: '' },
  });

  useEffect(() => {
    const details = Cache.getItem('CodeDeliveryDetails');
    if (details) {
      setDetails(details);
    } else {
      onChangeMode('forgot-password');
    }
  }, []);

  const handleResetPassword = formData =>
    onResetPassword({ ...formData, username: details.username });

  if (details) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Reset Password</Card.Title>
          <Card.Text className="pb-3">
            We have sent a verification code to <strong>{details.Destination}</strong>
          </Card.Text>
          <Form>
            <FormGroup controlId="code">
              <FormControl
                name="code"
                type="text"
                placeholder="Enter the code we emailed to you"
                ref={register({
                  required: 'Required',
                })}
                isInvalid={!!errors?.code}
              />
              <Form.Control.Feedback type="invalid">{errors?.code?.message}</Form.Control.Feedback>
            </FormGroup>
            <FormGroup controlId="newPassword">
              <FormControl
                name="newPassword"
                type="password"
                placeholder="Create a new password"
                ref={register({
                  required: 'Password must be at least 8 characters',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                isInvalid={!!errors?.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.password?.message}
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <Button variant="success" block onClick={handleSubmit(handleResetPassword)}>
                Set Password
              </Button>
            </FormGroup>
          </Form>
          <hr className="m-1" />
          <Row>
            <Col sm={6}>
              <a onClick={() => onChangeMode('signin')}>Back to Sign In</a>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
  return null;
};

export default ResetPassword;
