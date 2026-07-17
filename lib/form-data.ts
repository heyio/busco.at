'use client';

const getFormData = () => {
  const formDataString = localStorage?.getItem('form');
  const formData = formDataString ? JSON.parse(formDataString) : null;
  return formData;
};

export default getFormData;
