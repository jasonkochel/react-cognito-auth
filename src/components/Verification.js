import { Cache } from 'aws-amplify';
import React, { useEffect } from 'react';
import { Button, Card, Form, FormControl, FormGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Verification = ({ onVerify }) => {
  const { handleSubmit, register, errors, setValue } = useForm({
    defaultValues: { username: '', code: '' },
  });

  useEffect(() => {
    const user = Cache.getItem('pendingVerificationUser');
    if (user) {
      setValue('username', user.username);
    }
  }, [setValue]);

  const handleVerify = formData => onVerify(formData);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Verify Your Account</Card.Title>
        <Form>
          <FormGroup controlId="username">
            <Form.Label>Email</Form.Label>
            <FormControl name="username" type="text" ref={register} />
          </FormGroup>
          <FormGroup controlId="code">
            <Form.Label>Enter the code we emailed to you</Form.Label>
            <FormControl
              name="code"
              type="text"
              ref={register({
                required: 'Required',
              })}
              isInvalid={!!errors?.code}
            />
            <Form.Control.Feedback type="invalid">{errors?.code?.message}</Form.Control.Feedback>
          </FormGroup>
          <FormGroup>
            <Button variant="success" block onClick={handleSubmit(handleVerify)}>
              Confirm
            </Button>
          </FormGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Verification;
