// NewEditor.js
import React from 'react';
import TinyMCEEditor from './Editor';

const NewEditor = ({ onChange }) => {
  return <TinyMCEEditor onChange={onChange} />;
};

export default NewEditor;
