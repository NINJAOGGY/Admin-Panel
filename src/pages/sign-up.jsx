import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1>Sign Up</h1>
        <SignUp />
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
    maxWidth: '400px', // optional: limits the width of the sign-up box
  },
};

export default SignUpPage;
