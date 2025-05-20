// GoogleMapComponent.tsx
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: -26.2041, // Johannesburg
  lng: 28.0473,
}

const GoogleMapComponent = () => {
  return (

    <div className='flex  overflow-hidden'>
      <LoadScript googleMapsApiKey="AIzaSyB42WNumXyloYTxxvyT2OFi3NMz-c-0ckY">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {/* Add markers or other components here */}
        </GoogleMap>
      </LoadScript>
    </div>

  )
}

export default GoogleMapComponent
