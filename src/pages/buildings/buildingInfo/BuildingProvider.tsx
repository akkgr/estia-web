import React from 'react'
import { Provider } from 'app/models/Provider'

interface IProvider {
    provider: Provider;
  }

const BuildingProvider:React.FC<IProvider> = ({ provider }) => {
    return (
        <React.Fragment>
            Providers
        </React.Fragment>
    )
}

export default BuildingProvider
