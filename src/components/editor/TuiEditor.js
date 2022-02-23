import React from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const WrappedEditor = props => {
  const { forwardedRef } = props;

  // 3. Pass down forwardRef to Editor(the real component that needs)
  return <Editor {...props} ref={forwardedRef} usageStatistics={false} />;
};

export default WrappedEditor;
