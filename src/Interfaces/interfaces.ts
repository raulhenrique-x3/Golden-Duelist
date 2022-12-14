export interface ICard {
  name: string;
  atk?: number;
  def?: number;
  card_images?: any;
  attribute?: string;
  level?: number;
  race?: string;
  type?: string;
  id?: number | any;
  card_prices?: any;
  desc?: string;
  link_value?: number;
  card_sets?: [];
  image_url?: string;
  cartQuantity?: any;
  card?: any;
  children?: JSX.Element[];
  alt?: string;
}
