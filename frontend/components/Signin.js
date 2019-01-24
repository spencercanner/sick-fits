import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import {CURRENT_USER_QUERY} from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`


class Signin extends Component {
  state = {
    email: '',
    password: '',
  };

  saveToState = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  
  render() {
    return (
      <Mutation refetchQueries={[{query: CURRENT_USER_QUERY}]} mutation={SIGNIN_MUTATION} variables={this.state}>
        {(signin, {error, loading}) => (
          <Form method="post" onSubmit={async (e) => {
            e.preventDefault();
            await signin();
            this.setState({name: '', email: '', password: ''})
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign In</h2>
              <ErrorMessage error={error} />
              <label htmlFor="email">
                Email
                <input 
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Email
                <input 
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
            </fieldset>
            <button type="submit">Sign Up!</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signin;