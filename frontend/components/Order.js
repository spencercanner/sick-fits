import React from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import {format} from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id 
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        image
        price
        quantity
      }
    }
  }
`

class Order extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{id: this.props.id}}>
        {({data, error, loading}) => {
          if(error) return <Error error={error}/>
          if(loading) return <p>Loading...</p>
          return (
            <div>
                <p>Order ID: {data.order.id}</p>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Order;