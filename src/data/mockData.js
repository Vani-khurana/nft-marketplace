import bids1 from '../assets/bids1.png'
import bids2 from '../assets/bids2.png'
import bids3 from '../assets/bids3.png'
import bids4 from '../assets/bids4.png'
import bids5 from '../assets/bids5.png'
import bids6 from '../assets/bids6.png'
import bids7 from '../assets/bids7.png'
import bids8 from '../assets/bids8.png'

import seller1 from '../assets/seller1.jpg'
import seller2 from '../assets/seller2.png'
import riya from '../assets/riya.png'
import harshita from '../assets/harshita.png'
import seller4 from '../assets/seller4.png'

export const CREATORS = [
  { name: 'Yuvraj Singh', image: seller1 },
  { name: 'Vani', image: seller2 },
  { name: 'Riya', image: riya },
  { name: 'Harshita', image: harshita },
  { name: 'Garima', image: seller4 }
];

const INITIAL_ASSIGN_CREATORS = [
  { name: 'Yuvraj Singh', image: seller1 },
  { name: 'Vani', image: seller2 },
  { name: 'Garima', image: seller4 }
];

const getRandomCreator = () => INITIAL_ASSIGN_CREATORS[Math.floor(Math.random() * INITIAL_ASSIGN_CREATORS.length)];

export const MOCK_ITEMS = [
  { id: '1', title: 'Abstract Smoke Red', price: 1.25, likes: 92, image: bids1, creator: getRandomCreator() },
  { id: '2', title: 'Mountain Landscape', price: 0.20, likes: 25, image: bids2, creator: getRandomCreator() },
  { id: '3', title: 'Paint Color on Wall', price: 0.55, likes: 55, image: bids3, creator: getRandomCreator() },
  { id: '4', title: 'Abstract Patern', price: 0.87, likes: 82, image: bids4, creator: getRandomCreator() },
  { id: '5', title: 'White Line Grafiti', price: 0.09, likes: 22, image: bids5, creator: getRandomCreator() },
  { id: '6', title: 'Abstract Triangle', price: 0.90, likes: 71, image: bids6, creator: getRandomCreator() },
  { id: '7', title: 'Lake Landscape', price: 0.52, likes: 63, image: bids7, creator: getRandomCreator() },
  { id: '8', title: 'Blue Red Art', price: 0.85, likes: 66, image: bids8, creator: getRandomCreator() },
]
