# Purpose

This component provides a UI for the authentication flow powered by [AWS Amplify](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#authentication-with-amplify). It is an alternative to using [Amplify's own pre-built UI components](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#option-1-use-pre-built-ui-components) (the `Authenticator` component and `withAuthenticator` HOC), or to creating your own UI.

It implements the following screens and manages the transitions between them:

- Sign In
- Sign Up
- Verification (after a new sign-up)
- Forgot Password

It also supports social sign-in (Google only for now).

# Usage

Your own project must already be handling the configuration for AWS Amplify and making the call to `Amplify.configure()`.

The component requires that you are using email-as-username semantics. It also has a hard-coded validation that the password be at least 8 characters.

## Props

The `Authenticator` component expects the following props:

- `onSignIn` - callback function which will receive the AWS Cognito payload once a user successfully authenticates
- `signupFields` (optional) - array of field definitions to prompt for when a user signs up for an account

  - Do not include the "email" (username) or "password" fields in this array. They are hard-coded to be rendered as the first and last fields in the signup form.
  - Typical standard Cognito field names are "name" and "phone_number"
    - If this prop is not provided, the default is just the "name" field
  - Other fields that may be defined in your Cognito schema must be prefixed with "custom:"

- `socialProviders` (optional) - array of strings of social login providers to offer; currently only supports Google Auth (`['Google']`)

## Rendering the authentication screens

In the component which should wrap the authentication screens, conditionally render either this `Authenticator` component or your own root component for logged-in users:

```javascript
const [authState, setAuthState] = useState();

/* event handlers and your own code here */

// render:

if (!authState) return null;

return (
  {authState.authenticated ? (
    <MyPrivateApp user={userInfo} />
  ) : (
    <Authenticator
      onSignIn={handleSignIn}
      signupFields={signupFields}   // if omitted, default is {email, name, password}
      socialProviders={['Google']}  // omit if not using
    />
  )}
)
```

## Handling the authentication response

The `onSignIn` prop is a callback which will receive the authentication payload from AWS Cognito. From this, you can extract the JWT and claims and store them in your local state. For example, your implementation of onSignIn might look like:

```javascript
const onSignIn = cognitoUser => {
  const idToken = cognitoUser?.signInUserSession?.idToken;

  if (!idToken) return;

  const user = {
    jwt: idToken.jwtToken,
    sub: idToken.payload.sub,
    name: idToken.payload.name,
    email: idToken.payload.email,
  };

  setAuthState({ authenticated: true, userInfo: user });
};
```

## Detecting initial authentication state

If your app supports persisting sign-in between sessions, detect the initial authentication state like so:

```javascript
useEffect(() => {
  Auth.currentAuthenticatedUser()
    .then(user => onSignIn(user))
    .catch(() => setAuthState({ authenticated: false }));
}, [handleSignIn]);
```

This calls the Amplify `Auth.currentAuthenticatedUser()` function to detect if the user is already logged in. If so, your `onSignIn()` function will be invoked with the Cognito payload.

## Sign Out

This component does not handle signing out. Your own UI should own the Sign Out button. Trigger a sign out in Cognito like so:

```javascript
const onSignOut = () => {
  Auth.signOut().then(() => setAuthState({ authenticated: false }));
};
```

## Internals and Dependencies

Peer dependencies are React and [aws-amplify/amplify-js](https://github.com/aws-amplify/amplify-js).

The only internal dependencies are:

- `react-hook-form` to control the forms of the authentication screens
- `clsx` to compose classNames
- `crypto-browserify` and `stream-browserify` to provide the browser polyfills required by Amplify, since Webpack no longer bundles the Node.js polyfills (see [here](https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-nodejs-polyfills-removed))

It does not rely on nor utilize a UI framework like Bootstrap or Material-UI. Styling is done via Tailwind CSS and already transformed into pure (minified, tree-shaken) CSS.
