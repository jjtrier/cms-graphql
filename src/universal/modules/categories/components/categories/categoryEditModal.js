/* eslint-disable pref-const */
import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton, TextField, SelectField, MenuItem} from 'material-ui';
import {updateCategory} from '../../ducks/categoriesDucks.js';
import {Button} from 'react-bootstrap';
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

  handleChangeVisible = (event, index, value) => this.setState({visible: value});
// this handles the choice of datatype
  handleChangeDatatype = (event, index, value) => {
    const chosenDatatype = this.props.datatypes.filter(datatype => {
      return (datatype.id === (value));
    });
    console.log('chosenDatatype[0]', chosenDatatype[0]);
    this.setState({datatype: chosenDatatype[0]})
  };
  // this handles the opening of the modal/dialog
  handleOpen = () => {
    this.setState({open: true});
  };
  // this handles the closing of the modal/dialog
  handleClose = () => {
    this.setState({
      open: false,
      category: this.props.category
    });
  };
  // this handles the submission of changed data
  handleSubmit = () => {
    this.setState({open: false});
    let updateCategoryInfo = {
      id: this.state.id,
      name: this.state.name,
      datatype: this.state.datatype.id,
      visible: this.state.visible
    };
    this.props.dispatch(updateCategory(updateCategoryInfo));
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
    const datatypesAvailable = this.props.datatypes;
    let dataTypesItems = datatypesAvailable.map((datatype, idx) => {
      return (
        <MenuItem key={idx} value={datatype.id} primaryText={datatype.name}/>
      );
    });

    const editCategoryName = (`Edit Category: ${this.state.id}`);
    return (
      <div>
        <Button bsStyle="info" bsSize="xsmall" onTouchTap={this.handleOpen}>Edit Category</Button>
        <Dialog
          title={editCategoryName}
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
                <SelectField value={this.state.datatype.id} id="datatypeSel" onChange={this.handleChangeDatatype} floatingLabelText="Datatype">
                  {dataTypesItems}
                </SelectField>
              <SelectField value={this.state.visible} id="visibleSel" onChange={this.handleChangeVisible} floatingLabelText="Visible Status">
                <MenuItem key={1} value={true} primaryText={'True'}/>
                <MenuItem key={2} value={false} primaryText={'False'}/>
              </SelectField>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
