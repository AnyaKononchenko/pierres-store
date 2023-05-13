export type ProductType = {
  name: string
  image: string
  description: string
  price: number
  inStock: number
  quality: Quality
  sold: number
  category: string
  season?: Season
  size?: Size
  color?: string
}

export enum Season {
  spring = 'Spring',
  summer = 'Summer',
  fall = 'Fall',
  winter = 'Winter',
}

export enum Size {
  small = 'Regular',
  medium = 'Large',
  big = 'Delux',
}

export enum Quality {
  regular = 'Regular',
  silver = 'Silver',
  gold = 'Gold',
  iridium = 'Iridium',
}
