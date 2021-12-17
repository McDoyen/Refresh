import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    main: {
        paddingLeft: '48px',
        display: 'flex',
        height: '100vh'
    },
    container: { width: '100%', position: 'relative', height: '100vh' },
    displayPhoto: {
        marginRight: '10px'
    },
    memberSection: {
        borderRight: '1px solid #e0e0e0',
        position: 'absolute',
        width: '30%',
        height: 'inherit'
    },
    onlineBanner: { textAlign: 'right' },
    paper: {
        height: 'fit-content',
        display: 'flex',
        bottom: '30px',
        padding: '15px',
        position: 'fixed',
        width: '85%'
    },
    sendButton: {
        background: '#551a8b',
        marginLeft: '10px'
    },
    textMessage: { textAlign: 'right' },
    send: { paddingLeft: '10px' },
    form: { display: 'flex', padding: '1%' },

    // Animated Arrow Styles
    '@keyframes uparrow': {
        '0%': { transform: 'translateX(1em) rotate(-90deg)', opacity: 0.4 },
        '100%': { transform: 'translateX(-0.4em) rotate(-90deg)', opacity: 0.9 }
    },

    arrow: {
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '0 2em',
        display: 'block',
        height: 0,
        opacity: 0.4,
        textIndent: '-9999px',
        transformOrigin: '50% 50%',
        width: 0
    },
    up: {
        animation: `$uparrow 0.6s infinite alternate ${theme.transitions.easing.easeInOut}`,
        borderBottom: '2em solid #00b6f1'
    }
}));
