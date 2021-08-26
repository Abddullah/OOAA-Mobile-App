// <<<<<<< HEAD
import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '../Screens/Authentication/Login';
import SignUp from '../Screens/Authentication/SignUp';
import ForgetPassword from '../Screens/Authentication/ForgetPassword';
import Codeverify from '../Screens/Authentication/CodeVerify';
import ActivateAccount from '../Screens/Authentication/SignUp/activateAccount';
import ConfirmPassword from '../Screens/Authentication/confirmPassword/confirmPassword';
import Home from '../Screens/Home';
import Pin from '../Screens/Pin';
import Search from '../Screens/Search';
import Gift from '../Screens/Gift';
import ShopItems from '../Screens/Gift/shopItems';
import EstablishmentCard from '../Screens/Gift/EstablishmentCrad';
import CheckOut from '../Screens/CheckOut';
import Basket from '../Screens/basket';
import DietryRequirements from '../Screens/DietryRequirements';
import Product from '../Screens/Product';
import Yard from '../Screens/Yard';
import CreateYard from '../Screens/Yard/createYard';
import FullViewItemCard from '../Screens/Yard/fullViewItemCard';
import IncludeDetails from '../Screens/Yard/includeDetails';
import UpdateAddress from '../Components/updateAddressModal';
import AddressList from '../Components/addressList';
import ProductsRender from '../Components/productsFullView/productsFullView'
import googlemapfullview from '../Components/googleMapFullView'

const AppStack = createStackNavigator(
  {
    Home: { screen: Home },
    Pin: { screen: Pin },
    Search: { screen: Search },
    DietryRequirements: { screen: DietryRequirements },
    CheckOut: { screen: CheckOut },
    Gift: { screen: Gift },
    ShopItems: { screen: ShopItems },
    EstablishmentCard: { screen: EstablishmentCard },
    Basket: { screen: Basket },
    Product: { screen: Product },
    Yard: { screen: Yard },
    CreateYard: { screen: CreateYard },
    FullViewItemCard: { screen: FullViewItemCard },
    IncludeDetails: { screen: IncludeDetails },
    UpdateAddress: { screen: UpdateAddress },
    AddressList: { screen: AddressList },
    ProductsRender: { screen: ProductsRender },
    googlemapfullview: { screen: googlemapfullview },
  },
  {
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  ConfirmPassword: { screen: ConfirmPassword },
  ActivateAccount: { screen: ActivateAccount },
  Codeverify: { screen: Codeverify },
  ForgetPassword: { screen: ForgetPassword },
},
  {
    headerMode: 'none',
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
)



// const MainNavigator = createSwitchNavigator(
//   {
//       AuthLoading: AuthLoading,
//       AppStackCompany: AppStackCompany,
//       AppStackUser: AppStackUser,
//       Auth: AuthStack
//   },
//   {
//       initialRouteName: "AuthLoading",
//       header: null
//   }
// );

// const Routes = createAppContainer(StackNavigator);

// export default Routes;
