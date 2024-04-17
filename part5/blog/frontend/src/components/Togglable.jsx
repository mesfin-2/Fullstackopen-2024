import { useState, forwardRef, useImperativeHandle } from "react";

/*
=forwardRef=>Lets your component expose a DOM node to a parent component using a ref.
=useImperativeHandle customizes the instance value that is exposed to parent components 
when using ref. As always, imperative code using refs should be avoided in most cases.

useImperativeHandle should be used with React.forwardRef.
---
The component uses the useImperativeHandle hook to make its toggleVisibility
 function available outside of the component.
We can now hide the form by calling noteFormRef.current.toggleVisibility() after a new note has been created:


*/

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
