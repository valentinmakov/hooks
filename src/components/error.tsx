import React from 'react'
import {
    Text,
    View,
} from 'react-native'

import {
    IErrorProps,
} from '../models/models'

const Error: React.SFC<IErrorProps> = (props: IErrorProps): JSX.Element => {
    return (
      <View>
        <Text>Error</Text>
        <Text>{`Code: ${props.code}`}</Text>
        <Text>{`Message: ${props.message}`}</Text>
      </View>
    )
}

export default React.memo(Error)
