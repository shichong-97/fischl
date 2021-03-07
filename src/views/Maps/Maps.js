import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
} from 'react-google-maps'

import { injectTooltip, moveTooltip, deleteTooltip } from './tooltip'

const CustomSkinMap = withScriptjs(
  withGoogleMap(() => {
    const [geospatial, setGeospatial] = useState([])
    useEffect(() => {
      axios.get('/api/getAllGeodata').then((response) => {
        setGeospatial(response.data)
      })
    }, [])
    return (
      <GoogleMap
        mapTypeId="satellite"
        defaultZoom={15}
        defaultCenter={{ lat: 42.40041739856813, lng: -76.52065855522135 }}
        defaultOptions={{
          scrollwheel: false,
          zoomControl: true,
          styles: [
            {
              featureType: 'water',
              stylers: [
                { saturation: 43 },
                { lightness: -11 },
                { hue: '#0088ff' },
              ],
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [
                { hue: '#ff0000' },
                { saturation: -100 },
                { lightness: 99 },
              ],
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#808080' }, { lightness: 54 }],
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ece2d9' }],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ccdca1' }],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#767676' }],
            },
            {
              featureType: 'road',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#ffffff' }],
            },
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            {
              featureType: 'landscape.natural',
              elementType: 'geometry.fill',
              stylers: [{ visibility: 'on' }, { color: '#b8cb93' }],
            },
            { featureType: 'poi.park', stylers: [{ visibility: 'on' }] },
            {
              featureType: 'poi.sports_complex',
              stylers: [{ visibility: 'on' }],
            },
            { featureType: 'poi.medical', stylers: [{ visibility: 'on' }] },
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'simplified' }],
            },
          ],
        }}
      >
        {geospatial.map((area, index) => (
          <Polygon
            onMouseOver={(e) => injectTooltip(e, area.name, area.area)}
            onMouseMove={(e) => moveTooltip(e)}
            onMouseOut={(e) => deleteTooltip(e)}
            name={area.name}
            path={area.path}
            key={index}
            options={{
              fillColor: '#FFFF00',
              fillOpacity: 0.4,
              strokeColor: '#FFFF00',
              strokeOpacity: 1,
              strokeWeight: 1,
            }}
          />
        ))}
      </GoogleMap>
    )
  })
)

export default function Maps() {
  return (
    <CustomSkinMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `90vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  )
}
