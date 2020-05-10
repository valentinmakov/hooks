import React,
  {
    useEffect,
    useState,
} from 'react'

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

interface IVacancy {
  id: string,
  name: string,
  company?: string,
}

interface IItemProps {
  name: string,
  company?: string,
}

interface IStyles {
  safeAreaContainer: ViewStyle,
  container: ViewStyle,
  centeredContainer: ViewStyle,
  textInput: ViewStyle,
  button: ViewStyle,
  itemContainer: ViewStyle,
  separator: ViewStyle,
}

const queryUrl: string = 'https://api.hh.ru/vacancies?text='

const Item: React.SFC<IItemProps> = (props: IItemProps): JSX.Element => {
  return (
    <View style={styles.itemContainer}>
      <Text>{props.name}</Text>
      {
        props.company
          ? <Text>{`Employer: ${props.company}`}</Text>
          : null
      }
    </View>
  )
}

const ItemSeparator: React.SFC = (): JSX.Element => {
  return <View style={styles.separator}/>
}

const App: React.SFC = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('')

  const [submitSearchValue, setSubmitSearchValue] = useState<string>(searchValue)

  const [vacancyList, setVacancyList] = useState<IVacancy[]>([])

  useEffect(
    (): void => {
      if (submitSearchValue.length > 0) {
        fetch(`${queryUrl}${submitSearchValue}`)
          .then((response: Response): Promise<any> => response.json())
          .then((data: any): void => {
            if (data && data.items && Array.isArray(data.items)) {
              const itemList: IVacancy[] = data.items.map((item: any): IVacancy => {
                return {
                  id: item.id,
                  name: item.name,
                  company: item?.employer?.name,
                }
              })

              setVacancyList(itemList)
            }
          })
      }
    },
    [submitSearchValue]
  )

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.centeredContainer}>
          <Text>Type in search query:</Text>
        </View>
        <View style={styles.centeredContainer}>
          <TextInput
            value={searchValue}
            clearButtonMode={'while-editing'}
            onChangeText={(newSearchValue: string) => setSearchValue(newSearchValue)}
            placeholder={'Search query...'}
            style={styles.textInput}
          />
        </View>
        <View style={styles.centeredContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSubmitSearchValue(searchValue)}
          >
            <Text>Submit search value</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          ItemSeparatorComponent={ItemSeparator}
          data={vacancyList}
          renderItem={({item}) => <Item name={item.name} company={item.company}/>}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  )
}

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
  },
  itemContainer: {
    paddingVertical: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
  },
})

export default App
