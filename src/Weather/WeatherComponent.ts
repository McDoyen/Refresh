import { createElement } from 'react';

import LocationIcon from '@material-ui/icons/MyLocation';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import MapComponent from './MapComponent';

import useStyles from './styles';

interface WeatherProps {
    city: string;
    country: string;
    feelsLike: number;
    latitude: number | undefined;
    longitude: number | undefined;
    temperature: number;
    time: Date;
    weatherDiscription: string;
    weatherIcon: string;
    weather_image: string;
}

function WeatherComponent(props: WeatherProps) {
    const classes = useStyles();
    const {
        city,
        country,
        feelsLike,
        latitude,
        longitude,
        weather_image: weatherImage,
        weatherIcon,
        weatherDiscription,
        time,
        temperature
    } = props;

    return createElement(
        'div',
        { className: classes.root },
        createElement(
            Grid,
            { className: classes.locationGrid, item: true, xs: 12 },
            createElement(LocationIcon, { className: classes.locationIcon }),
            createElement(Typography, {}, `${city}, ${country}`)
        ),
        createElement(
            Grid,
            {
                className: classes.weatherContainer,
                container: true,
                direction: 'row'
            },
            createElement(
                Grid,
                {
                    className: classes.tempGrid,
                    container: true,
                    style: { backgroundImage: `url(${weatherImage})` }
                },
                createElement(
                    Grid,
                    { className: classes.main, item: true, xs: 6, sm: 3 },
                    createElement(
                        Typography,
                        { noWrap: true, variant: 'subtitle1' },
                        'CURRENT WEATHER'
                    ),
                    createElement(
                        Typography,
                        { variant: 'body2' },
                        time.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    ),
                    createElement(
                        Grid,
                        { container: true, direction: 'row' },
                        createElement('img', {
                            src: `http://openweathermap.org/img/w/${weatherIcon}.png`
                        }),
                        createElement(
                            Typography,
                            { className: classes.temp, variant: 'h3' },
                            `${temperature}°`
                        ),
                        createElement(
                            'div',
                            { className: classes.description },
                            createElement(
                                Typography,
                                { variant: 'subtitle1' },
                                weatherDiscription
                            ),
                            createElement(
                                Typography,
                                { variant: 'body2' },
                                `Feels like ${feelsLike}°`
                            )
                        )
                    )
                )
            ),
            latitude && longitude
                ? createElement(MapComponent, { latitude, longitude }) // TODO: Fix this
                : null
        )
    );
}

export default WeatherComponent;
