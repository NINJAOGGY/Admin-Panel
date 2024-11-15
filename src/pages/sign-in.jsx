import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1>Sign In</h1>
        <SignIn />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  content: {
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px', // optional: limits the width of the sign-in box
  },
};

export default SignInPage;
