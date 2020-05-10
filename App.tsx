import React,
  {
    useEffect,
    useState,
} from 'react'

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

interface IStyles {
  safeAreaContainer: ViewStyle,
  container: ViewStyle,
  textInput: ViewStyle,
  button: ViewStyle,
}

const queryUrl: string = 'https://api.hh.ru/vacancies?text='

const App: React.SFC = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('')

  const [submitSearchValue, setSubmitSearchValue] = useState<string>(searchValue)

  const [vacancy, setVacancy] = useState<string>('')

  useEffect(
    (): void => {
      if (submitSearchValue.length > 0) {
        fetch(`${queryUrl}${submitSearchValue}`)
          .then((response: Response): Promise<any> => response.json())
          .then((data: any): void => {
            if (data && data.items && Array.isArray(data.items)) {
              const firstVacancy: any = data.items[0]
              if (firstVacancy.name && typeof firstVacancy.name === 'string' && firstVacancy.name.length > 0) {
                setVacancy(firstVacancy.name)
              }
            }
          })
      }
    },
    [submitSearchValue]
  )

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text>Type in search query:</Text>
        <TextInput
          value={searchValue}
          clearButtonMode={'while-editing'}
          onChangeText={(newSearchValue: string) => setSearchValue(newSearchValue)}
          placeholder={'Search query...'}
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSubmitSearchValue(searchValue)}
        >
          <Text>Submit search value</Text>
        </TouchableOpacity>
        <Text>{`Vacancy name: ${vacancy}`}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create<IStyles>({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
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
  },
})

export default App
