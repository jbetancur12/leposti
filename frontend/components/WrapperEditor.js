import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import Editor from 'react-quill';

export default function WrappedEditor({ editorRef, ...props }) {
  return <Editor {...props} ref={editorRef} />;
}
