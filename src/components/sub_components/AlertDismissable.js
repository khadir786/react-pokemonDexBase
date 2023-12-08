import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertDismissible(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={props.variant} onClose={() => setShow(false)} dismissible>
        {props.heading && <Alert.Heading>{props.heading}</Alert.Heading>}
        <p>{props.message}</p>
      </Alert>
    );
  }
}

export default AlertDismissible;