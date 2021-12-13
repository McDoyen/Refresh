import {
    Avatar,
    Divider,
    Fab,
    Grid,
    List,
    ListItemButton,
    TextField,
    Typography
} from '@mui/material';
import { createElement } from 'react';
import Skeleton from '@mui/material/Skeleton';
import useStyles from './styles';

function SkeletonComponent() {
    const classes = useStyles();
    const users = ['.', '.', '.'];

    return createElement(
        Grid,
        { container: true, className: classes.chatSection },
        createElement(
            Grid,
            { item: true, xs: 3, className: classes.memberSection },
            createElement(
                List,
                {},
                createElement(
                    ListItemButton,
                    {},
                    createElement(
                        Skeleton,
                        {},
                        createElement(Avatar, {
                            variant: 'rounded'
                        })
                    ),
                    createElement(
                        Skeleton,
                        { width: '100%' },
                        createElement(Typography, {}, '.')
                    )
                )
            ),
            createElement(Divider),
            createElement(
                Grid,
                { item: true, xs: 12, style: { padding: '10px' } },
                createElement(
                    Skeleton,
                    {},
                    createElement(TextField, {
                        fullWidth: true
                    })
                )
            ),
            createElement(Divider),
            createElement(
                List,
                {},
                users.map((user) =>
                    createElement(
                        ListItemButton,
                        {},
                        createElement(
                            Skeleton,
                            {},
                            createElement(Avatar, {
                                className: classes.displayPhoto,
                                variant: 'rounded'
                            })
                        ),
                        createElement(
                            Skeleton,
                            { width: '100%' },
                            createElement(Typography, {}, user)
                        )
                    )
                )
            )
        ),
        createElement(
            Grid,
            { item: true, xs: 9, className: classes.messageArea },
            createElement(Divider),
            createElement(
                'form',
                {},
                createElement(
                    Grid,
                    { container: true, className: classes.textField },
                    createElement(
                        Grid,
                        { item: true, xs: 11 },
                        createElement(
                            Skeleton,
                            { width: '100%', height: '100%' },
                            createElement(Typography, {}, '.')
                        )
                    ),
                    createElement(
                        Grid,
                        { className: classes.send, xs: 1, item: true },
                        createElement(
                            Skeleton,
                            { variant: 'circular' },
                            createElement(Fab, {})
                        )
                    )
                )
            )
        )
    );
}

export default SkeletonComponent;
