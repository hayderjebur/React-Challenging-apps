import React, { useState } from 'react';

export default function InputComponent({
  text,
  setText,
  label,
  name,
  onNextPage,
}) {
  return (
    <div>
      <label>{label}</label>
      <input value={text} onChange={setText} name={name} />
      <button onClick={onNextPage}>Next</button>
    </div>
  );
}
