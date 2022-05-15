import React, { useState } from 'react';

const fields = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    id: 'birthdate',
    name: 'birthdate',
    type: 'date',
    label: 'Birthdate',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Password',
  },
];

function App() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    birthdate: '',
    password: '',
  });
  const [page, setPage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const lastPage = fields.length - 1; // 4 - 1 = 3

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [`${fields[page].name}`]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Conditional check to either submit or go to next page

    // if your last page --> submit
    // if your not last page --> go next

    if (page === lastPage) {
      alert(JSON.stringify(formValues));
      setShowSuccess(true);
    } else {
      setPage(page + 1);
    }
  };

  const onBackClick = () => {
    setPage(page - 1);
  };

  return (
    <>
      {showSuccess ? (
        <div>This is the success Page</div>
      ) : (
        <>
          {page !== 0 && (
            <button id='back-button' onClick={onBackClick}>{`< Back`}</button>
          )}
          <form className='App' onSubmit={handleFormSubmit}>
            <label htmlFor={fields[page].name}>{fields[page].label}</label>
            <input
              type={fields[page].type}
              name={fields[page].name}
              id={fields[page].id}
              value={formValues[fields[page].name]}
              onChange={onChange}
            />
            <button disabled={!formValues[fields[page].name]} type='submit'>
              {page === lastPage ? 'Submit' : 'Next'}
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default App;
