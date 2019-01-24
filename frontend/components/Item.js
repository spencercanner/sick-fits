import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';


export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const {item} = this.props;
    return( 
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Link href={{
          pathname: '/item',
          query: { id: item.id }
        }}>
          <a>{item.title}</a>
        </Link>
        <PriceTag>
          {formatMoney(item.price)}
        </PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link href={{
            pathname: 'update',
            query: {id: item.id}
          }}>
            <a>Edit</a>
          </Link>
          <AddToCart id={item.id}>Add To Cart</AddToCart>
          <DeleteItem id={item.id}>Delete this item</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}