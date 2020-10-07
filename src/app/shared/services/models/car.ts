export class Car {
  bodystyle: string
  year: number
  make: string
  model: string
  color: string
  mileage: number
  purchase_year: number
  condition: string
  image: string
  price: number
  id: number
  created_at: string
  updated_at: string

  constructor({
    bodystyle = '',
    year = null,
    make = '',
    model = '',
    color = '',
    mileage = null,
    purchase_year = null,
    condition = '',
    image = '',
    price = null,
    id = null,
    created_at ='',
    updated_at = '',
    ...rest
  }) {
    Object.assign(this, rest)
    this.bodystyle = bodystyle
    this.year = year
    this.make = make
    this.model = model
    this.color = color
    this.mileage = mileage
    this.purchase_year = purchase_year
    this.condition = condition
    this.image = image
    this.price = price
    this.id = id
    this.created_at = created_at
    this.updated_at = updated_at
  }
}
