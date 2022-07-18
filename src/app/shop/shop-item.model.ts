export class ShopItem {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public imagePath: string,
    public rating: number,
    public price: number
  ) {}
}
