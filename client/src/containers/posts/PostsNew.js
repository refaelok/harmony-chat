import React, { Component } from 'react';
import { harmonyConnectForm } from '../../base/features/harmony-redux-react-connect';
import * as actions from '../../actions/posts/actions_posts';

import { Link } from 'react-router-dom';
import { PORTAL } from '../../routes';

import { Cor_Input, Cor_Textarea } from '../../components/core';

class PostsNew extends Component {

    render() {

        return (
            <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >

                <h3>{this.T('createNewPost')}</h3>

                <Cor_Input name="title" type="text" label={this.T('title')} T={this.T.bind(this)} />
                <Cor_Input name="categories" type="text" label={this.T('categories')} T={this.T.bind(this)} />
                <Cor_Textarea name="content" label={this.T('content')} T={this.T.bind(this)} />

                
                <br/>

                <button type="submit" className="btn btn-primary">{this.T('submit')}</button>
                <Link to={PORTAL} className="btn btn-danger">{this.T('cancel')}</Link>

            </form>
        );

    }

    handleSubmit(props) {
        this.props.createPost(props);
    }

    validate(values) {
        const errors = {};

        if (!values.title) {
            errors.title = 'titleError';
        }

        if (!values.categories) {
            errors.categories = 'categoriesError';
        }

        if (!values.content) {
            errors.content = 'contentError';
        }

        return errors;
    }
}


export default harmonyConnectForm(PostsNew,
    (state) => {
        return {
            message: state.posts.get('message')
        }
    },
    {
        createPost: actions.createPost,
        initializePosts: actions.initializePosts
    },
    {
        form : 'PostsNewForm',
        fields: ['title', 'categories', 'content']
    }
);