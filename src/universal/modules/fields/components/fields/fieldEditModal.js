import React, {Component, PropTypes} from 'react';
import stylesToo from './fields.css';
import Chip from 'material-ui/Chip';
import {List, ListItem} from 'material-ui/List';
import {Dialog, FlatButton, TextField, Divider, SelectField, MenuItem} from 'material-ui';
import {blue300, indigo900, green200} from 'material-ui/styles/colors';
import {updateField} from '../../ducks/fieldsDucks.js';
import {Table, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {styles} from './modalStyles.js';
import {DeletableChip, AddableChip} from './subComponents/subComponents.js';

export default class FieldEditModal extends Component {
  static propTypes = {
    field: PropTypes.object,
    dispatch: PropTypes.func
  }
  state = {
    open: false,
    id: this.props.field.id,
    name: this.props.field.name,
    description: this.props.field.description,
    required: this.props.field.required,
    dataJSON: this.props.field.dataJSON,
    errorText: '',
    newFieldCount: 0
  };
// this handles any changes to the inputs
  handleChange = event => {
    const lineKey = event.target.id;
    console.log('inside handleChange', lineKey, event.target.value);
    // need to create a new key line with the new key name, and then delete the old one
    // let newdataJSON = this.state.dataJSON;
    // newdataJSON[lineKey] = event.target.value;
    // console.log('newdataJSON', newdataJSON);
    // this.setState({
    //   dataJSON: newdataJSON
    // });
  };

  handleChangeRequired = (event, index, value) => this.setState({required: value});

  handleOpen = () => {
    this.setState({open: true});
  };

  handleSubmit = () => {
    this.setState({open: false});

    let updateFieldInfo = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      required: this.state.required,
      dataJSON: this.state.dataJSON
    };
    JSON.stringify(updateFieldInfo);
    this.props.dispatch(updateField(null, updateFieldInfo));
  };
// this handles the closing of the modal/dialog
  handleClose = () => {
    this.setState({
      open: false,
      field: this.props.field,
      dataJSON: this.props.field.dataJSON
    });
  };
  // handles adding another key/value Pair
  addKeyValue = () => {
    console.log('inside addKeyValue');
    let newdataJSON = this.state.dataJSON;
    newdataJSON[this.state.newFieldCount] = 'new...';
    this.setState({
      dataJSON: newdataJSON
    });
    this.state.newFieldCount++;
  }

  render() {
    // these are used by the modal
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
    // render out iteams in dataJSON
    // console.log('this.state.dataJSON', this.state.dataJSON);
    let dataJSON = this.state.dataJSON;
    // function to make these an array of objects
    let arrayOfJSONData = [];

    for (let key in dataJSON) {
      let objectToFill = {};
      if (dataJSON.hasOwnProperty(key)) {
        objectToFill[key] = dataJSON[key];
      }
      arrayOfJSONData.push(objectToFill);
    }

    let templateFromDataJSON = arrayOfJSONData.map((line, idx) => {
      let keys = Object.keys(line);
      return (
        <tr key={idx}>
          <td>
            <TextField
              id={idx.toString()}
              value={keys[0]}
              onChange={this.handleChange}
              name="Key"
              />
          </td>
          <td>
            <TextField
              id={'value:'+idx.toString()}
              value={line[keys[0]]}
              onChange={this.handleChange}
              name="Value"
              />
          </td>
        </tr>
      )
// end template items
    });
    return (
      <div>
        <Button bsStyle="info" bsSize="xsmall" onTouchTap={this.handleOpen}>Edit Field</Button>
        <Dialog
          title="Edit Field"
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
            <TextField
              floatingLabelText="Description"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
              />
            <SelectField value={this.state.required} id="requiredSel" onChange={this.handleChangeRequired} floatingLabelText="Required Status">
              <MenuItem key={1} value={true} primaryText={'True'}/>
              <MenuItem key={2} value={false} primaryText={'False'}/>
            </SelectField>
            </div>
            <Divider/>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {templateFromDataJSON}
              </tbody>
            </Table>
            <Button bsStyle="info" bsSize="xsmall" onTouchTap={this.addKeyValue}>Add Key/Value Pair</Button>
          </div>
        </Dialog>
      </div>
    );
  }
}
