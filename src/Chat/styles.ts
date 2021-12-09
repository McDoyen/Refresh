import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    chatSection: {
        width: '100%',
        height: '100vh',
        paddingLeft: '48px'
    },
    displayPhoto: {
        marginRight: '10px'
    },
    memberSection: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        overflowY: 'auto',
        bottom: '10vh',
        width: '70%',
        position: 'fixed',
        right: '2.5%'
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
    textField: {
        padding: '20px',
        position: 'fixed',
        width: '75%',
        bottom: 0
    },
    textMessage: { textAlign: 'right' },
    send: { paddingLeft: '10px' }
}));
