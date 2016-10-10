import React, {Component} from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import socketOptions from 'universal/utils/socketOptions';
import 'universal/styles/global/graphiql.css';
import {hostUrl} from 'universal/utils/fetching';
// import {Link} from 'react-router';
import {browserHistory} from 'react-router'

const graphQLFetcher = async ({query, variables}) => {
  if (!__CLIENT__) {
    return;
  }
  const authToken = localStorage.getItem(socketOptions.authTokenName);
  variables = variables ? JSON.parse(variables) : undefined;
  const currentHostUrl = hostUrl();
  const res = await fetch(`${currentHostUrl}/graphql`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({query, variables})
  });
  return res.json();
};

export default class Graphiql extends Component {
  constructor() {
    super();
    this._onClickToolbarButton = this._onClickToolbarButton.bind(this);
  }
  render() {
    return (
      <GraphiQL fetcher={graphQLFetcher}>
        <GraphiQL.Toolbar>
          <GraphiQL.ToolbarButton
            onClick={this._onClickToolbarButton}
            title="ToolbarButton"
            label="CMS Home"
            />
        </GraphiQL.Toolbar>
      </GraphiQL>
    );
  }
  _onClickToolbarButton() {
    browserHistory.push('/');
  }
}
