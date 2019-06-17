import React, { Component } from 'react';
import { harmonyConnectForm } from '../../base/features/harmony-redux-react-connect';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/user/actions_user';
import { REGISTER } from '../../routes';
import { Cor_Input } from '../../components/core';


class Login extends Component {
    render() {

        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >

                    <h1>{this.T('login')}</h1>

                    <Cor_Input name="email" type="email" label={this.T('email')} T={this.T.bind(this)} />
                    <Cor_Input name="password" type="password" label={this.T('password')} T={this.T.bind(this)} />

                    {this.props.loginError || ""}
                    <br />

                    <button type="submit" className="btn btn-success">{this.T('login')}</button>
                    <Link to={REGISTER} style={{ float: 'right' }} className="btn btn-default">{this.T('register')}</Link>

                </form>
            </div>
        );

    }

    handleSubmit(props) {
        this.props.login(props);
    }

    validate(values) {
        const errors = {};

        if (!values.email) {
            errors.email = 'emailError';
        }

        if (!values.password) {
            errors.password = 'passwordError';
        }

        return errors;
    }


}


export default harmonyConnectForm(Login,
    (state) => {
        return {
            loginError: state.user.get('loginError')
        }
    },
    {
        login: actions.login
    },
    {
        form: 'LoginForm',
        fields: ['email', 'password']
    }
);