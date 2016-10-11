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
    dataJSON: mapOutDataJSON(this.props.field.dataJSON),
    errorText: '',
    newFieldCount: 0
  };
// this handles any changes to the inputs
  handleChange = event => {
    console.log('inside handleChange', lineKey, event.target.value);
    // need to create a new key line with the new key name, and then delete the old one
    // let newdataJSON = this.state.dataJSON;
    // newdataJSON[lineKey] = event.target.value;
    // console.log('newdataJSON', newdataJSON);
    // this.setState({
    //   dataJSON: newdataJSON
    // });
  };

  handleChangeKey = event => {
    // let oldKey = event.target.id;
    let newKey = event.target.value;
    const id = event.target.id;
    const idx = id.slice(0, id.indexOf(":"));
    const oldKey = id.slice(id.indexOf(":") + 1);
    console.log('oldKey', oldKey);
    let previousMap = this.state.dataJSON[idx];
    let storedValue = previousMap.get(oldKey);
    let newMap = new Map();
    newMap.set(newKey, storedValue);
    console.log('newMap', newMap);
    // console.log('previousMap', previousMap);
    // console.log('key in change', oldKey, newKey);
    // console.log('dataJSON', this.state.dataJSON);
  }

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
      dataJSON: mapOutDataJSON(this.props.field.dataJSON)
    });
  };
  // handles adding another key/value Pair
  addKeyValue = () => {
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
    let dataJSON = this.state.dataJSON;

    let templateFromDataJSON = dataJSON.map((line, idx) => {
      let key = line.keys().next().value;
      let value = line.get(key);
      return (
        <tr key={idx}>
          <td>
            <TextField
              id={idx + ':' + key}
              value={key}
              onChange={this.handleChangeKey}
              name="Key"
              />
          </td>
          <td>
            <TextField
              id={'value:'+idx.toString()}
              value={value}
              onChange={this.handleChange}
              name="Value"
              />
          </td>
        </tr>
      );
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
const mapOutDataJSON = dataJSON => {
  let arrayOfJSONData = [];

for (let key in dataJSON) {
  let newMap = new Map();
  if (dataJSON.hasOwnProperty(key)) {
    newMap.set(key, dataJSON[key]);
  }
  arrayOfJSONData.push(newMap);
}
  return arrayOfJSONData;
};
