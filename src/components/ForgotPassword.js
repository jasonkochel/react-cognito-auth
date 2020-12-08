import React from 'react';
import { Button, Card, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ForgotPassword = ({ onForgotPassword, onChangeMode }) => {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: { username: '' },
  });

  const handleForgotPassword = formData => onForgotPassword(formData);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Reset Password</Card.Title>
        <Card.Text className="pb-3">A security code will be sent to your email address.</Card.Text>
        <Form>
          <FormGroup controlId="username">
            <FormControl
              name="username"
              type="text"
              placeholder="Email address"
              ref={register({
                required: 'Enter your email address',
              })}
              isInvalid={!!errors?.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.username?.message}
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup>
            <Button variant="success" block onClick={handleSubmit(handleForgotPassword)}>
              Get Security Code
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
};

export default ForgotPassword;
