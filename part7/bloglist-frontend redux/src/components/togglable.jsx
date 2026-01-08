import { useState } from "react";
import { Stack, Button } from "react-bootstrap";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <Stack gap={3}>
          {props.children}
          <Button className="btn-secondary" onClick={toggleVisibility}>
            cancel
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Togglable;
