import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import {CURRENT_USER_QUERY} from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`


class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  saveToState = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  
  render() {
    return (
      <Mutation refetchQueries={[{query: CURRENT_USER_QUERY}]} mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, {error, loading}) => (
          <Form method="post" onSubmit={async (e) => {
            e.preventDefault();
            await signup();
            this.setState({name: '', email: '', password: ''});
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for an Account</h2>
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
              <label htmlFor="name">
                Email
                <input 
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.saveToState}
                />
              </label>
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
            </fieldset>
            <button type="submit">Sign Up!</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;