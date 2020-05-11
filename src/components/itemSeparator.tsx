import React from 'react'
import {
    View,
} from 'react-native'

import styles from '../styles/styles'

const ItemSeparator: React.SFC = (): JSX.Element => {
    return <View style={styles.separator}/>
}

export default React.memo(ItemSeparator)