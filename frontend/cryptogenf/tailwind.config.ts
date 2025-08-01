import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens:{
      low: '440px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
        'major': {'max': '1260px'},
        'major1': {'max': '1240px'},
        'majortwo': {'max': '1235px'},
        'majortwomin': {'min': '1235px'},
        'majortwo0.1': {'max': '1200px'},
        'majortwo1': {'max': '1148px'},
        'majortwo1-2': {'max': '1048px'},
        'majortwo2': {'max': '1122px'},
        'majortwo3': {'max': '1034px'},
        'majortwo3.1': {'max': '990px'},
        'majortwo4': {'max': '940px'},
        'majorthree': {'max': '890px'},
        'majorthree1': {'max': '800px'},
        'majorthree2': {'max': '772px'},
        'majorfour': {'max': '761px'},
        'majorfour1': {'max': '700px'},
        'majorfour2': {'max': '680px'},
        'midtw': {'max': '648px'},
        'midtwo': {'max': '553px'},
        'midtwo2': {'max': '538px'},
        'midtwo3': {'max': '516px'},
        'midtwo4': {'max': '485px'},
        'midthree': {'max': '600px'},
        'midfour': {'max': '452px'},
        'midfour1': {'max': '420px'},
        'lowone': {'max': '382px'},
        'lowtwo': {'max': '370px'},
        'lowtwo1': {'max': '348px'},
        'lowtwo2': {'max': '325px'},
        'lowtwo2-1': {'max': '306px'},
        'lowtwo3': {'max': '293px'},
        'lowthree': {'max': '275px'},
        'lowthreetwo':{'max': '234px'},
      },
      colors: {
        mainColor: "#60a5fa",
        mainSecondColor: "#000",
        tertiaryColor: "#9333ea",
      },
    }, 
  },
  plugins: [],
};
export default config;
