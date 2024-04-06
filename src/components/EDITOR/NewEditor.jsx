// NewEditor.js
import React from 'react';
import TinyMCEEditor from './Editor';

const NewEditor = ({ onChange, values }) => {
  return <TinyMCEEditor onChange={onChange} values={values} />;
};

export default NewEditor;
