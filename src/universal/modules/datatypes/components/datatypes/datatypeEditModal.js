import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton, TextField, Divider, SelectField, MenuItem} from 'material-ui';
import {updateDatatype} from '../../ducks/datatypesDucks.js';
import {Button} from 'react-bootstrap';

const idsFromFields = fields => {
  let ids = [];
  for (let i = 0; i < fields.length; i++) {
    ids.push(fields[i].id);
  }
  return ids;
};

const textifyArray = fields => {
  let res = '[';
  for (let i = 0; i < fields.length; i++) {
    res += fields[i];
    if (i < fields.length-1) {
      res += ','
    }
  }
  res += ']';
  return res;
};

export default class DatatypeEditModal extends Component {
  static propTypes = {
    datatype: PropTypes.object,
    datatypes: PropTypes.array,
    dispatch: PropTypes.func
  }
  state = {
    open: false,
    id: this.props.datatype.id,
    name: this.props.datatype.name,
    description: this.props.datatype.description,
    visible: this.props.datatype.visible,
    fields: idsFromFields(this.props.datatype.fields),
    errorText: ''
  };

  handleChange = event => {
    const lineKey = event.target.id;
    this.setState({
      [lineKey]: event.target.value
    });

  };
  handleChangeUserType = (event, index, value) => this.setState({usertype: value});
  handleChangeVisible = (event, index, value) => this.setState({visible: value});

  handleOpen = () => {
    this.setState({open: true});
  };

  handleSubmit = () => {
    this.setState({open: false});
    console.log('this.state from submit', this.state);

    let newDatatypeInfo = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      visible: this.state.visible,
      fields: this.state.fields
    };
    // newDatatypeInfo.fields = textifyArray(this.state.fields);
    console.log('newDatatypeInfo', newDatatypeInfo);
    JSON.stringify(newDatatypeInfo);
    console.log('newDatatypeInfo', newDatatypeInfo);
    this.props.dispatch(updateDatatype(null, newDatatypeInfo));
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        onTouchTap={this.handleSubmit}
      />
    ];

    return (
      <div>
        <Button bsStyle="info" bsSize="xsmall" onTouchTap={this.handleOpen}>Edit Datatype</Button>
        <Dialog
          title="Edit Datatype, ID {this.state.id}"
          autoDetectWindowHeight={false}
          autoScrollBodyContent={false}
          contentStyle={{width: "100%", maxHeight: "none"}}
          actions={actions} open={this.state.open} >
          <div>
            <TextField
              floatingLabelText="Name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
              name="Name"
              />
            <Divider/>
            <TextField
              floatingLabelText="Description"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
              />
            <Divider/>
            <SelectField value={this.state.visible} id="visibleSel" onChange={this.handleChangeVisible} floatingLabelText="Visible Status">
              <MenuItem key={1} value={true} primaryText={'Visible'}/>
              <MenuItem key={2} value={false} primaryText={'Hidden'}/>
            </SelectField>
            <Divider/>
          </div>
        </Dialog>
      </div>
    );
  }
}
