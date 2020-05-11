import {
    StyleSheet,
} from 'react-native'

import {IStyles} from '../models/models'

const styles: IStyles = StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'stretch',
      paddingTop: 30,
      paddingHorizontal: 20,
    },
    descriptionContainer: {
      flex: 1,
    },
    centeredContainer: {
      width: '100%',
      alignItems: 'center',
    },
    textInput: {
      flexDirection: 'row',
      width: '80%',
      height: 25,
      paddingHorizontal: 5,
      marginVertical: 10,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 4,
    },
    button: {
      backgroundColor: '#d3d3d3',
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 6,
      marginBottom: 10,
    },
    itemContainer: {
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      width: '100%',
      height: 1,
      backgroundColor: 'black',
    },
    image: {
      width: 40,
      height: 40,
      marginHorizontal: 10,
    },
    vacancyTitle: {
        fontWeight: '700',
    },
  })

  export default styles
