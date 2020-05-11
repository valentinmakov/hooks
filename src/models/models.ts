import {
    ImageStyle,
    ViewStyle,
} from 'react-native'

export interface IVacancy {
    id: string,
    name: string,
    company?: string,
    city?: string,
    imageUrl?: string,
  }

export interface IItemProps {
    name: string,
    company?: string,
    city?: string,
    imageUrl?: string,
}

export interface IErrorProps {
    code: string,
    message: string,
}

export interface IError {
    code: string,
    message: string,
}

export interface IStyles {
    safeAreaContainer: ViewStyle,
    container: ViewStyle,
    descriptionContainer: ViewStyle,
    centeredContainer: ViewStyle,
    textInput: ViewStyle,
    button: ViewStyle,
    itemContainer: ViewStyle,
    separator: ViewStyle,
    image: ImageStyle,
    vacancyTitle: ViewStyle,
}