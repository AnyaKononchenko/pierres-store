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

enum Season {
  spring = 'Spring',
  summer = 'Summer',
  fall = 'Fall',
  winter = 'Winter',
}
enum Size {
  small = 'Regular',
  medium = 'Large',
  big = 'Delux',
}

enum Quality {
  regular = 'Regular',
  silver = 'Silver',
  gold = 'Gold',
  iridium = 'Iridium',
}