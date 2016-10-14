/* eslint-disable pref-const */
import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton, TextField, Divider, SelectField, MenuItem} from 'material-ui';
import {updateCategory} from '../../ducks/categoriesDucks.js';
import {Table, Button} from 'react-bootstrap';
import {styles} from './modalStyles.js';

export default class CategoryEditModal extends Component {
  constructor(props) {
    super(props);
    window.addEventListener('keydown', this._handleEscKey, false);
  }
  static propTypes = {
    category: PropTypes.object,
    dispatch: PropTypes.func,
    datatypes: PropTypes.array
  }
  state = {
    open: false,
    id: this.props.category.id,
    name: this.props.category.name,
    datatype: this.props.category.datatype,
    datatypes: this.props.datatypes,
    visible: this.props.category.visible,
    errorText: '',
    newCategoryCount: 0
  };
  _handleEscKey = event => {
    if (event.keyCode === 27) {
      this.handleClose();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleEscKey, false);
  }
// this handles any changes to the inputs
  handleChange = event => {
    const lineKey = event.target.id;
    this.setState({
      [lineKey]: event.target.value
    });
  };

  handleChangeVisible = (event, index, value) => this.setState({required: value});
  handleChangeDatatype = (event, index, value) => this.setState({required: value});

  handleOpen = () => {
    this.setState({open: true});
  };

  handleSubmit = () => {
    this.setState({open: false});
    let updateCategoryInfo = {
      id: this.state.id,
      name: this.state.name,
      datatype: this.state.datatype,
      visible: this.state.visible
    };
    updateCategoryInfo = JSON.stringify(updateCategoryInfo);
    this.props.dispatch(updateCategory(updateCategoryInfo));
  };
// this handles the closing of the modal/dialog
  handleClose = () => {
    this.setState({
      open: false,
      category: this.props.category
    });
  };

  render() {
    // these are used by the modal
    const actions = [
      <FlatButton
        key="0"
        label="Cancel"
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        key="1"
        label="Submit"
        onTouchTap={this.handleSubmit}
      />
    ];

    const editCategoryName = (`Edit Category: ${this.state.id}`);
    console.log('this.state !!', this.state);
    return (
      <div>
        <Button bsStyle="info" bsSize="xsmall" onTouchTap={this.handleOpen}>Edit Category</Button>
        <Dialog
          title={editCategoryName}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          contentStyle={{width: "80%", height: "100%", maxHeight: "none", maxWidth: "none", fontSize: "10px"}}
          actions={actions} open={this.state.open} >
          <div>
            <div style={styles.wrapper}>
              <TextField
                floatingLabelText="Name"
                id="name"
                value={this.state.name}
                onChange={this.handleChange}
                name="Name"
                />
              <SelectField value={this.state.visible} id="visibleSel" onChange={this.handleChangeVisible} floatingLabelText="Visible Status">
                <MenuItem key={1} value={true} primaryText={'True'}/>
                <MenuItem key={2} value={false} primaryText={'False'}/>
              </SelectField>
              <SelectField value={this.state.datatype.id} id="datatypeSel" onChange={this.handleChangeDatatype} floatingLabelText="Datatype">
                <MenuItem key={1} value={1} primaryText={'One'}/>
                <MenuItem key={2} value={2} primaryText={'Two'}/>
                <MenuItem key={3} value={3} primaryText={'Three'}/>
              </SelectField>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
