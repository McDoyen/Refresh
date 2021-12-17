import { Typography } from '@mui/material';
import { createElement } from 'react';

import clsx from 'clsx';
import useStyles from './styles';

function Launcher() {
    const classes = useStyles();

    return createElement(
        'div',
        { style: { position: 'absolute', bottom: '45%' } },
        createElement(Typography, { variant: 'h1' }, 'Bienvenue,'),
        createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between' } },
            createElement('p', { className: clsx(classes.arrow, classes.up) }),
            createElement(
                Typography,
                { variant: 'h4' },
                'Please select a member to chat with 😎'
            )
        )
    );
}

export default Launcher;
