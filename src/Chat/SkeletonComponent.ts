import {
    Avatar,
    Divider,
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
        'div',
        { className: classes.main },
        createElement(
            'div',
            { className: classes.container },
            createElement(
                'div',
                { className: classes.memberSection },
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
                    users.map((user, index) =>
                        createElement(
                            ListItemButton,
                            { key: index },
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
            )
        )
    );
}

export default SkeletonComponent;
