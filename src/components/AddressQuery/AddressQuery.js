import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import './AddressQuery.min.css'

class AddressQuery extends Component {

  constructor() {
    super()
    this.state = {
      currentAddress: null,
      dataAddress: null,
      isFetching: false,
      invalidCEP: null
    }
  }

  isCep(cep) {

    const regex = /^[0-9]{8}$/
    return regex.test(cep)
  }

  getAddress(e) {
    e.preventDefault()

    const cep = this.state.currentAddress
    const url = `https://viacep.com.br/ws/${cep}/json/?callback=currentAddress` 

    this.setState({isFetching: true})

    this.isCep(cep)
    ? fetchJsonp(url)
      .then(response => response.json())
      .then(json =>
        this.setState({
          invalidCEP: !!json.erro ? 'CEP não encontrado' : false,
          dataAddress: !!json.erro ? null : json
        })
      )
      .then(() => this.setState({isFetching: false}))
      .catch(err => console.log(err))
    : this.setState({
        isFetching: false,
        invalidCEP: 'CEP inválido'
      })
  }

  handleChange(e) {

    this.setState({
      currentAddress: e.target.value
    })
  }

  render() {

    return(
  
      <section className="address-query">
  
        <h2 className="address-query--title">Consulta de endereço</h2>
  
        <form
          className="address-query__form"
          onSubmit={e => this.getAddress(e)}
        >
  
          <h4 className="address-query__form--title">Consultar</h4>
  
          <label className="address-query__form--label" htmlFor="cep">CEP</label>
          <input
            className="address-query__form--field"
            onChange={e => this.handleChange(e)}
          />
  
          <button
            className="address-query__form--btn"
            disabled={this.state.isFetching}
            type="submit"
          >
            Buscar
          </button>

          {
            !!this.state.invalidCEP &&
            <small className="address-query__form--invalid">
              {this.state.invalidCEP}
            </small>
          }
  
        </form>
      </section>
  
    )
  }

}

export default AddressQuery