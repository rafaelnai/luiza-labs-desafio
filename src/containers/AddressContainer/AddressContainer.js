import './AddressContainer.min.css'
import React, { Component } from 'react'
import AddressQuery from '../../components/AddressQuery/AddressQuery'
import AddressMap from '../../components/AddressMap/AddressMap'
import fetchJsonp from 'fetch-jsonp'

class AddressContainer extends Component {

  constructor() {
    super()
    this.state = {
      cep: '',
      dataAddress: null,
      isFetching: false,
      invalidCEP: null,
      key: 'AIzaSyD-Fhb1CPiaJVbWDFhwDyteBkEDM0jyTcs',
      location: null
    }
  }

  isCep(cep) {

    const regex = /^[0-9]{5}-[0-9]{3}$/
    return regex.test(cep)
  }

  closeMap() {
    this.setState({
      location: null
    })
  }

  getAddress(e) {
    e.preventDefault()

    let cep = this.state.cep
    const url = `https://viacep.com.br/ws/${cep}/json/?callback=cep` 

    this.setState({isFetching: true})

    this.isCep(cep)
    ? fetchJsonp(url)
      .then(response => response.json())
      .then(json =>
        this.setState({
          invalidCEP: !!json.erro ? 'CEP não encontrado' : false,
          dataAddress: !!json.erro ? null : json,
          isFetching: !json.erro,
          location: null
        })
      )
      .then(() => !this.state.invalidCEP && this.getLocation())
      .catch(err => console.log(err))
    : this.setState({
        isFetching: false,
        invalidCEP: 'CEP inválido'
      })
  }

  getLocation() {

    const cep = this.state.cep
    const key = this.state.key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${key}`

    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({
        location: {
          lat: parseFloat(json.results[0].geometry.location.lat),
          lng: parseFloat(json.results[0].geometry.location.lng)
        }
      }))
      .then(() => this.setState({isFetching: false}))
  }

  handleChange(e) {

    let value = e.target.value
    value = value.replace(/^(\d{5})(\d)/,"$1-$2")

    this.setState({
      cep: value
    })
  }

  render() {
    return(
      <section className='address-container'>
        <AddressQuery
          handleChange={e => this.handleChange(e)}
          getAddress={e => this.getAddress(e)}
          invalidCEP={this.state.invalidCEP}
          isFetching={this.state.isFetching}
          cep={this.state.cep}
        />

        {
          !!this.state.location && <AddressMap
            dataAddress={this.state.dataAddress}
            location={this.state.location}
            closeMap={() => this.closeMap()}
          />
        }
      </section>
    )
  }
}

export default AddressContainer