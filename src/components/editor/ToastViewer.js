import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
//import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Viewer } from "@toast-ui/react-editor";
export default function PostView(props) {
  const { forwardedRef } = props;
  return (
    <Viewer
      {...props}
      ref={forwardedRef}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
}
