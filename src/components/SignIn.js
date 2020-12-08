import React from 'react';
import { Button, Card, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';

const SignIn = ({
  socialProviders,
  onSignIn,
  onGoogleSignIn,
  onFacebookSignIn,
  onAmazonSignIn,
  onChangeMode,
}) => {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: { username: '', password: '' },
  });

  const handleSignIn = formData => onSignIn(formData);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Sign In</Card.Title>
        <Form>
          <FormGroup controlId="username">
            <Form.Label>Email</Form.Label>
            <FormControl
              name="username"
              type="text"
              ref={register({
                required: 'Enter your email address',
              })}
              isInvalid={!!errors?.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.username?.message}
            </Form.Control.Feedback>
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
            <Button variant="success" block onClick={handleSubmit(handleSignIn)}>
              Sign In
            </Button>
          </FormGroup>
          <SocialLogin
            providers={socialProviders}
            onGoogleSignIn={onGoogleSignIn}
            onFacebookSignIn={onFacebookSignIn}
            onAmazonSignIn={onAmazonSignIn}
          />
        </Form>
        <hr className="m-1" />
        <Row>
          <Col sm={6}>
            <a onClick={() => onChangeMode('forgot-password')}>Forgot Password?</a>
          </Col>
          <Col className="text-right" sm={6}>
            <a onClick={() => onChangeMode('signup')}>Sign Up</a>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SignIn;
