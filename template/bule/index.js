
import {  extendTheme } from 'native-base';
import {Ionicons } from '../../library/icons'

export const theme = extendTheme({
    colors: {
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      secondary:{
        50:'#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
      },

      amber: {
        400: '#d97706',
      },
    },
    fontSizes: { 
      xxs: 10,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
      '7xl': 72,
      '8xl': 96,
      '9xl': 128,
    },
    fonts: {
      heading: '',
      body: '',
      mono: '',
    },
   
    config: {
        // Changing initialColorMode to 'dark'
        initialColorMode: 'dark',
    },
  });


  export interface IIconLib  {
    lib:any;
    name:string;
  }  
   
  export const IconsTheme={
    /*Created=0,
    Received=1,
    Estimated=2,
    Scheduled=3,
    InProcess=4,
    WaitingClose=5,
    Closed=6,
    Completed=7,*/
    //JOB
    Created:{lib:Ionicons, name:"enter-outline"},
    Received:{lib:Ionicons, name:"enter-outline"},
    Estimated:{lib:Ionicons, name:"enter-outline"},
    Scheduled:{lib:Ionicons, name:"calendar-outline"},
    InProcess:{lib:Ionicons, name:"caret-forward-circle-outline"},
    WaitingClose:{lib:Ionicons, name:"gift-outline"},
    Closed:{lib:Ionicons ,name:"ios-checkmark-circle-sharp"},
    Completed:{lib:Ionicons ,name:"ios-checkmark-circle-sharp"},

    Forward:{lib:Ionicons, name:"exit-outline"},
    Update:{lib:Ionicons ,name:"ios-create-sharp"},
    GoBack:{lib:Ionicons ,name:"ios-arrow-back-outline"},

    //Common
    Exit:{lib:Ionicons ,name:"close"},

    //Alert
    Error:{lib:Ionicons ,name:'warning-outline'},
    Warning:{lib:Ionicons ,name:'ios-alert-circle-outline'},
    Info:{lib:Ionicons ,name:'ios-information-circle-outline'},
    Success:{lib:Ionicons ,name:'ios-checkmark-circle-outline'}, 
  } 