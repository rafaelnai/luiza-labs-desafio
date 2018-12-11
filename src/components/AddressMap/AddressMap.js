import './AddressMap.min.css'
import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MapWithAMarker = withGoogleMap(props => {

  const location = props.location

  return <GoogleMap defaultZoom={15} defaultCenter={location}>
    <Marker position={location}/>
  </GoogleMap> 
})

const AddressMap = props => {

  const { dataAddress, location, closeMap } = props

  return (

    <div className="address-map">

        <h3 className="address-map--title">{dataAddress.logradouro}</h3>
        <p className="address-map--detail">{dataAddress.bairro}</p>
        <p className="address-map--detail">{dataAddress.localidade}</p>
        <p className="address-map--detail">{dataAddress.cep}</p>

        <span
          onClick={() => closeMap()}
          className="address-map--close">
          &#10006;
        </span>

      {
        !!location &&
        <MapWithAMarker
          location={location}
          containerElement={<div style={{ height: '350px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      }

    </div>
  )
}

export default AddressMap