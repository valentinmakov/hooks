import React,
  {
    useEffect,
    useState,
} from 'react'

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native'

interface IStyles {
  textInput: ViewStyle,
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Type in search query:</Text>
      <TextInput
        value={searchValue}
        clearButtonMode={'while-editing'}
        onChangeText={(newSearchValue: string) => setSearchValue(newSearchValue)}
        placeholder={'Search query...'}
        style={styles.textInput}
      />
      <Button
        title={'Submit search value'}
        onPress={() => setSubmitSearchValue(searchValue)}
      />
      <Text>{`Vacancy name: ${vacancy}`}</Text>
    </View>
  )
}

const styles: any = StyleSheet.create<IStyles>({
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
})

export default App
