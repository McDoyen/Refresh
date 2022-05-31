import { createElement } from 'react';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import Grid from '@mui/material/Grid';

import useStyles from './styles';

interface Coordinates {
    latitude: number;
    longitude: number;
}

function MapComponent({ latitude, longitude }: Coordinates) {
    const classes = useStyles();
    const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    return createElement(
        Grid,
        { className: classes.mapGrid, item: true, xs: 12, sm: 6 },
        createElement(
            MapContainer,
            {
                className: classes.map,
                center: [latitude, longitude],
                zoom: 13,
                scrollWheelZoom: false
            },
            createElement(TileLayer, {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }),
            createElement(Marker, {
                position: [latitude, longitude]
            })
        )
    );
}

export default MapComponent;
