
import Editor from 'react-quill';

export default function WrappedEditor({ editorRef, ...props }) {
  return <Editor {...props} ref={editorRef} />;
}
