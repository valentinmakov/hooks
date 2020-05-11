import React from 'react'
import {
    Image,
    Text,
    View,
} from 'react-native'

import {
    IItemProps,
} from '../models/models'

import styles from '../styles/styles'

const Item: React.SFC<IItemProps> = (props: IItemProps): JSX.Element => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.descriptionContainer}>
          <Text>{props.name}</Text>
          {
            props.company
              ? <Text>{`Employer: ${props.company}`}</Text>
              : null
          }
          {
            props.city
              ? <Text>{`City: ${props.city}`}</Text>
              : null
          }
        </View>
        {
          props.imageUrl
            ? <View>
              <Image
                source={{uri: props.imageUrl}}
                style={styles.image}
                resizeMode={'contain'}
              />
            </View>
            : null
        }
      </View>
    )
  }

export default React.memo(Item)
