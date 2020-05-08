import React from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import MarkerPopup from './MarkerPopup'
import Marker from './Marker'
import { MAPBOX_TOKEN } from '../secrets'
import {
  DEFAULT_CATEGORIES,
  FOOD_PANTRY_CATEGORY_ID,
  MAPBOX_STYLE,
  MEAL_PROGRAM_CATEGORY_ID,
  ORGANIZATION_COLORS,
} from '../constants/map'

const styles = {
  geolocate: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
  },
  navigationControl: { position: 'absolute', top: 0, right: 0, margin: 10 },
}

function Map({
  selectedLatitude = 34.07872,
  selectedLongitude = -118.243328,
  stakeholders,
  categoryIds,
}) {
  React.useEffect(() => {
    if (stakeholders && stakeholders.length > 0) {
      setViewport({
        ...viewport,
        latitude: stakeholders[0].latitude,
        longitude: stakeholders[0].longitude,
      })
    }
    console.log('map', stakeholders)
  }, [stakeholders, viewport])

  const categoryIdsOrDefault = categoryIds.length
    ? categoryIds
    : DEFAULT_CATEGORIES

  const [isPopupOpen, setIsPopupOpen] = React.useState(false)
  const [selectedStakeholder, setSelectedStakeholder] = React.useState(null)
  const [viewport, setViewport] = React.useState({
    zoom: 10, // TODO: can we dynamically control zoom radius based on selectedDistance?
    latitude: selectedLatitude,
    longitude: selectedLongitude,
  })

  const handleMarkerClick = (clickedStakeholder) => {
    setSelectedStakeholder(clickedStakeholder)
    setIsPopupOpen(true)
  }

  const handleClose = () => {
    setIsPopupOpen(false)
    setSelectedStakeholder(null)
  }

  return (
    <div>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="max(calc(100vh - 250px),47em)"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAPBOX_STYLE}
      >
        <div style={styles.navigationControl}>
          <NavigationControl />
        </div>
        {stakeholders &&
          stakeholders
            .filter((sh) => sh.latitude && sh.longitude)
            .map((stakeholder, index) => {
              const isVerified = !!stakeholder.approvedDate
              /*todo
               * implement condition based on api data
               * */

              const categories = stakeholder.categories.filter(({ id }) => {
                return categoryIdsOrDefault.includes(id)
              })

              console.log(categories)

              const color = categories.find(
                ({ id }) => id === MEAL_PROGRAM_CATEGORY_ID,
              )
                ? ORGANIZATION_COLORS[MEAL_PROGRAM_CATEGORY_ID]
                : ORGANIZATION_COLORS[FOOD_PANTRY_CATEGORY_ID]
              return (
                <Marker
                  onClick={() => handleMarkerClick(stakeholder)}
                  key={`marker-${index}`}
                  longitude={stakeholder.longitude}
                  latitude={stakeholder.latitude}
                  isVerified={isVerified}
                  color={color}
                />
              )
            })}
        {isPopupOpen && selectedStakeholder && (
          <MarkerPopup entity={selectedStakeholder} handleClose={handleClose} />
        )}
      </ReactMapGL>
    </div>
  )
}

export default Map
