import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import {CURRENT_USER_QUERY} from './User'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`


class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  }
  state = {
    password: '',
    confirmPassword: ''
  };

  saveToState = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  
  render() {
    return (
      <Mutation 
        refetchQueries={[{query: CURRENT_USER_QUERY}]} 
        mutation={RESET_MUTATION} 
        variables={{
          resetToken: this.props.resetToken,
          ...this.state
        }}>
        {(requestReset, {error, loading, called}) => (
          <Form method="post" onSubmit={async (e) => {
            e.preventDefault();
            await requestReset();
            this.setState({password: '', confirmPassword: ''})
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset your Password</h2>
              <ErrorMessage error={error} />
              <label htmlFor="password">
                Password
                <input 
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="confirmPassword">
                Confirm your password
                <input 
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                />
              </label>
            </fieldset>
            <button type="submit">Request Reset!</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Reset;