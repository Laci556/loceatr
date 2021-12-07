import { RootTabParamList, LoginStackParamList } from '../navigation/index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { HistoryStackParamList } from '../navigation/screens/Root/History';
import { StackScreenProps } from '@react-navigation/stack';

export type SplashProps = NativeStackScreenProps<LoginStackParamList, 'Splash'>;
export type LoginProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;
export type LoginErrorProps = NativeStackScreenProps<
  LoginStackParamList,
  'LoginError'
>;
export type SuccessProps = NativeStackScreenProps<
  LoginStackParamList,
  'Success'
>;

export type HomeProps = BottomTabScreenProps<RootTabParamList, 'Home'>;

export type HistoryScreenProps = NativeStackScreenProps<
  HistoryStackParamList,
  'HistoryScreen'
>;
export type HistoryDetailsProps = StackScreenProps<
  HistoryStackParamList,
  'HistoryDetails'
>;
