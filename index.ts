import {AppRegistry} from 'react-native'
import App from './src/App'
import appJson from './app.json'
const appName: string = appJson.name

AppRegistry.registerComponent(appName, () => App)
