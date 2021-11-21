import { RootStackParamList, LoginStackParamList } from './index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
