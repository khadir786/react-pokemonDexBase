import React from 'react';
import Button from 'react-bootstrap/Button';

function LoadingButton({ isLoading, onClick }) {

  return (
    <Button
      variant="dark"
      type="submit"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? 'Loading…' : 'Submit'}
    </Button>
  );
}

export default LoadingButton;
