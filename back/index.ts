import { fetchConversionData } from './src/services/convertor'
import { launchExternalApi } from './src/externalApi'
import { launchInternalApi } from './src/internalApi'

fetchConversionData(0);

launchInternalApi()
launchExternalApi()
