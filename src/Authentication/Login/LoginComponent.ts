import { createElement, Fragment } from 'react';

import { Button, TextField } from '@mui/material';

import useStyles from './styles';

export default function LoginComponent(props: any) {
    const {
        handleLogin,
        data,
        handleChange,
        handleSignup,
        errorMessage,
        signupError,
        registering
    } = props;
    const classes = useStyles();

    return createElement(
        'div',
        { className: classes.container },
        createElement(
            'form',
            {
                className: classes.form,
                onSubmit: handleLogin
            },
            createElement(TextField, {
                required: true,
                label: 'Username',
                name: 'userName',
                value: data.userName,
                onChange: handleChange,
                sx: { paddingBottom: '20px' }
            }),
            registering
                ? createElement(TextField, {
                      required: true,
                      label: 'Email',
                      name: 'email',
                      type: 'email',
                      value: data.email,
                      onChange: handleChange,
                      sx: { paddingBottom: '20px' }
                  })
                : null,
            createElement(TextField, {
                required: true,
                helperText: errorMessage,
                label: 'Password',
                name: 'password',
                type: 'password',
                value: data.password,
                onChange: handleChange,
                sx: { paddingBottom: '20px' }
            }),
            registering
                ? createElement(
                      Fragment,
                      {},
                      createElement(TextField, {
                          helperText: signupError,
                          required: true,
                          label: 'Confirm Password',
                          name: 'confirmPassword',
                          type: 'password',
                          value: data.confirmPassword,
                          onChange: handleChange,
                          sx: { paddingBottom: '20px' }
                      }),
                      createElement(
                          'label',
                          { htmlFor: 'upload-button' },
                          createElement('input', {
                              accept: 'image/*',
                              id: 'upload-button',
                              name: 'profilePicture',
                              type: 'file',
                              style: { display: 'none' },
                              onChange: handleChange
                          }),
                          createElement(
                              Button,
                              {
                                  fullWidth: true,
                                  variant: 'outlined',
                                  // @ts-ignore
                                  component: 'span',
                                  size: 'large',
                                  style: { marginBottom: '15px' }
                              },
                              'Upload Picture'
                          )
                      )
                  )
                : null,
            createElement(
                'div',
                { style: { textAlign: 'center' } },
                registering
                    ? null
                    : createElement(
                          Button,
                          {
                              type: 'submit',
                              variant: 'contained',
                              style: { marginRight: '20px' }
                          },
                          'Login'
                      ),
                createElement(
                    Button,
                    { onClick: handleSignup, variant: 'contained' },
                    'Sign up'
                )
            )
        )
    );
}
