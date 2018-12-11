import React from 'react'
import './AddressQuery.min.css'

const AddressQuery = props => {

  const { handleChange, getAddress, invalidCEP, isFetching, cep } = props

  return (

    <section className="address-query">

      <h2 className="address-query--title">Consulta de endereço</h2>

      <form
        noValidate
        className="address-query__form"
        onSubmit={e => getAddress(e)}
      >

        <h4 className="address-query__form--title">Consultar</h4>

        <label className="address-query__form--label" htmlFor="cep">CEP</label>
        <input
          pattern="[0-9]*"
          inputMode="numeric"
          className="address-query__form--field"
          onChange={e => handleChange(e)}
          value={cep}
        />

        <button
          className="address-query__form--btn"
          disabled={isFetching}
          type="submit"
        >
          Buscar
          </button>

        {
          !!invalidCEP &&
          <small className="address-query__form--invalid">
            {invalidCEP}
          </small>
        }

      </form>
    </section>

  )
}

export default AddressQuery