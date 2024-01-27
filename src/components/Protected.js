import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
// import { useSelector } from 'react-redux';

const Protected = (props) => {
  const { Component } = props;
  const location = useLocation();
  console.warn('Location>>>', location);

  // const userStatus = useSelector((state) => state.user.created);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
    }
  });

  return <div>{localStorage.getItem('accessToken') && <Component />}</div>;
};

export default Protected;
