import React from 'react';
import { Button, Card, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const SignUp = ({ onSignUp, onChangeMode }) => {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: { email: '', name: '', password: '' },
  });

  const handleSignUp = formData => onSignUp(formData);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Sign Up</Card.Title>
        <Form>
          <FormGroup controlId="username">
            <Form.Label>Email Address</Form.Label>
            <FormControl
              name="email"
              placeholder="This will be your username"
              type="text"
              ref={register({
                required: 'Enter your email address',
              })}
              isInvalid={!!errors?.email}
            />
            <Form.Control.Feedback type="invalid">{errors?.email?.message}</Form.Control.Feedback>
          </FormGroup>
          <FormGroup controlId="name">
            <Form.Label>Name</Form.Label>
            <FormControl
              name="name"
              placeholder="Enter your full name"
              type="text"
              ref={register({
                required: 'Required',
              })}
              isInvalid={!!errors?.name}
            />
            <Form.Control.Feedback type="invalid">{errors?.name?.message}</Form.Control.Feedback>
          </FormGroup>
          <FormGroup controlId="password">
            <Form.Label>Password</Form.Label>
            <FormControl
              name="password"
              type="password"
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
            <Button variant="success" block onClick={handleSubmit(handleSignUp)}>
              Sign Up
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

export default SignUp;
