import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    main: {
        paddingLeft: '48px',
        display: 'flex',
        height: '100vh'
    },
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
    send: { paddingLeft: '10px' }
}));
