import React,
  {
    useEffect,
    useState,
} from 'react'

import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import Error from '../components/error'
import Item from '../components/item'
import ItemSeparator from '../components/itemSeparator'

import styles from '../styles/styles'

import {
  IError,
  IVacancy,
} from '../models/models'

const queryUrl: string = 'https://api.hh.ru/vacancies?text='

const Root: React.SFC = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('')

  const [submitSearchValue, setSubmitSearchValue] = useState<string>(searchValue)

  const [vacancyList, setVacancyList] = useState<IVacancy[]>([])

  const [pageTotalCount, setPageTotalCount] = useState<number>(0)

  const [currentPage, setCurrentPage] = useState<number>(0)

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const [error, setError] = useState<IError | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(
    (): void => {
      if (submitSearchValue.length > 0) {
        setIsLoading(true)
        const pageParam: string = currentPage === 0 || currentPage >= pageTotalCount ? '' : `&page=${currentPage}`

        fetch(`${queryUrl}${submitSearchValue}${pageParam}`)
          .then((response: Response): Promise<any> => response.json())
          .then((data: any): void => {
            if (error !== null) {
              setError(null)
            }

            if (data && data.items && Array.isArray(data.items)) {
              if (pageTotalCount === 0 && data.pages && typeof data.pages === 'number') {
                setPageTotalCount(data.pages)
              }

              const itemList: IVacancy[] = data.items.map((item: any): IVacancy => {
                return {
                  id: item.id,
                  name: item.name,
                  company: item?.employer?.name,
                  city: item?.area?.name,
                  imageUrl: item?.employer?.logo_urls?.original,
                }
              })
              .filter((vacancy: IVacancy): boolean => {
                return !vacancyList.some((vacancyListItem: IVacancy): boolean => {
                  return vacancy.id === vacancyListItem.id
                })
              })

              if (isRefreshing) {
                setIsRefreshing(false)
              }

              setIsLoading(false)
              setVacancyList([...vacancyList, ...itemList])
            } else {
              setIsLoading(false)
              setError({
                code: 'Unknown',
                message: 'No data',
              })
            }
          })
          .catch((e: any) => {
            const formattedError: IError = {
              code: e.code ? e.code : 'Unknown',
              message: e.message ? e.message : 'Unknown error',
            }

            setIsLoading(false)
            setError(formattedError)
          })
      }
    },
    [submitSearchValue, currentPage]
  )

  const resetResultState = (): void => {
    if (vacancyList.length > 0) {
      setVacancyList([])
    }

    if (pageTotalCount !== 0) {
      setPageTotalCount(0)
    }

    if (currentPage !== 0) {
      setCurrentPage(0)
    }
  }

  const onSearchButtonPressed = (searchText: string): (() => void) => () => {
    resetResultState()
    setSubmitSearchValue(searchText)
  }

  const onRefresh = (searchText: string): (() => void) => () => {
    setIsRefreshing(true)
    resetResultState()
    setSubmitSearchValue(searchText)
  }

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
            onPress={onSearchButtonPressed(searchValue)}
          >
            <Text>Submit search value</Text>
          </TouchableOpacity>
        </View>
        {
          error === null
            ? vacancyList.length === 0
              ? isLoading
                ? <Text>Loading...</Text>
                : <Text>Nothing to show</Text>
              : <FlatList
                ItemSeparatorComponent={ItemSeparator}
                data={vacancyList}
                renderItem={
                  ({item}: {item: IVacancy}) => (
                    <Item
                      name={item.name}
                      company={item.company}
                      city={item.city}
                      imageUrl={item.imageUrl}
                    />
                )}
                keyExtractor={(item: IVacancy) => item.id}
                onEndReached={(): void => setCurrentPage(currentPage + 1)}
                onRefresh={onRefresh(searchValue)}
                refreshing={isRefreshing}
              />
            : <Error code={error.code} message={error.message}/>
        }
      </View>
    </SafeAreaView>
  )
}

export default Root
