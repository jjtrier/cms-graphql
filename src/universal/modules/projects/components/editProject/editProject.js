import React, {Component, PropTypes} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
};

export default class EditProject extends Component {
  static propTypes = {
    project: PropTypes.object,
    dispatch: PropTypes.func
  }

  state = {
    project: this.props.project,
    value: 'categories',
    categories: this.props.categories
  }

  handleChange = value => {
    this.setState({
      value
    });
  };

  render() {
    console.log('this.props.project', this.props.project);
    let categories = this.state.categories;
    let categoriesTemplate = categories.map((category, idx) => {
      return (
        <tr key={idx}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>{category.projectId}</td>
          <td>{category.categorytype}</td>
        </tr>
    );
    })
    //
    //render block below
    return (
      <div>
        <h1>{this.props.project.name}</h1>
          <Tabs
          value={this.state.value}
          onChange={this.handleChange}>
          <Tab label="Categories" value="categories" >
            <div>
              <h2 style={styles.headline}>Categories</h2>
              <p>
                Tabs are also controllable if you want to programmatically pass them their values.
                This allows for more functionality in Tabs such as not
                having any Tab selected or assigning them different values.
              </p>
            </div>
          </Tab>
          <Tab label="Tab B" value="b">
            <div>
              <h2 style={styles.headline} >Controllable Tab B</h2>
              <p>
                This is another example of a controllable tab. Remember, if you
                use controllable Tabs, you need to give all of your tabs values or else
                you wont be able to select them.
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
