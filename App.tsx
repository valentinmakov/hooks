import React, {useEffect, useState} from 'react'

import {
  Text,
  View,
} from 'react-native'

const queryUrl: string = 'https://api.hh.ru/vacancies?text='

const App = (): React.ReactElement<View> => {
  const [vacancy, setVacancy] = useState<string>('')

  useEffect(
    (): void => {
      fetch(`${queryUrl}JavaScript`)
        .then((response: any): string => response.json())
        .then((data: any): void => {
          if (data && data.items && Array.isArray(data.items)) {
            const firstVacancy: any = data.items[0]
            if (firstVacancy.name && typeof firstVacancy.name === 'string' && firstVacancy.name.length > 0) {
              setVacancy(firstVacancy.name)
            }
          }
        })
    }
  )

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{`Vacancy name: ${vacancy}`}</Text>
    </View>
  )
}

export default App
