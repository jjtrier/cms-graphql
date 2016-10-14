/* eslint-disable pref-const */
import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton, TextField, Divider, SelectField, MenuItem} from 'material-ui';
import {createField} from '../../ducks/fieldsDucks.js';
import {Table, Button} from 'react-bootstrap';
import {styles} from './modalStyles.js';

export default class FieldCreateModal extends Component {
  constructor(props) {
    super(props);
    window.addEventListener('keydown', this._handleEscKey, false);
  }
  static propTypes = {
    dispatch: PropTypes.func
  }
  state = {
    open: false,
    name: '',
    description: '',
    required: true,
    dataJSON: [],
    newFieldCount: 0
  };
// this handles any changes to the inputs
  handleChange = event => {
    const lineKey = event.target.id;
    this.setState({
      [lineKey]: event.target.value
    });
  };
  _handleEscKey = event => {
    if (event.keyCode === 27) {
      this.handleClose();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleEscKey, false);
  }

  handleChangeKey = event => {
    let newKey = event.target.value;
    const id = event.target.id;
    const idx = id.slice(0, id.indexOf(":"));
    const oldKey = id.slice(id.indexOf(":") + 1);
    let previousState = this.state.dataJSON;
    let previousMap = previousState[idx];
    const storedValue = previousMap.get(oldKey);
    previousMap.set(newKey, storedValue);
    previousMap.delete(oldKey);
    previousState[idx] = previousMap;
    this.setState(
      {dataJSON: previousState}
    );
  }

  handleChangeValue = event => {
    let newValue = event.target.value;
    const id = event.target.id;
    const idx = id.slice(0, id.indexOf(":"));
    const key = id.slice(id.indexOf(":") + 1);
    let previousState = this.state.dataJSON;
    let previousMap = previousState[idx];
    previousMap.set(key, newValue);
    previousState[idx] = previousMap;
    this.setState(
      {dataJSON: previousState}
    );
  }

  handleFieldDelete = event => {
    const idx = event.target.id;
    let previousState = this.state.dataJSON;
    previousState.splice([idx], 1);
    this.setState(
      {dataJSON: previousState}
    );
  }

  handleChangeRequired = (event, index, value) => this.setState({required: value});

  handleOpen = () => {
    this.setState({open: true});
  };

  handleSubmit = () => {
    this.setState({open: false});
    let createFieldInfo = {
      name: this.state.name,
      description: this.state.description,
      required: this.state.required,
      dataJSON: this.state.dataJSON
    };
    createFieldInfo.dataJSON = convertMapsToObjects(createFieldInfo.dataJSON);
    createFieldInfo.dataJSON = JSON.stringify(createFieldInfo.dataJSON);
    this.props.dispatch(createField(createFieldInfo));
    this.setState({
      name: '',
      description: '',
      required: true,
      dataJSON: [],
      newFieldCount: 0
    });
  };
// this handles the closing of the modal/dialog
  handleClose = () => {
    this.setState({
      open: false,
      dataJSON: []
    });
  };
  // handles adding another key/value Pair
  addKeyValue = () => {
    let newdataJSON = this.state.dataJSON;
    const newMap = new Map();
    newMap.set(this.state.newFieldCount.toString(), '_');
    newdataJSON.push(newMap);
    this.setState({
      dataJSON: newdataJSON
    });
    this.state.newFieldCount++;
  }

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
    let dataJSON = this.state.dataJSON;

    let templateFromDataJSON = dataJSON.map((line, idx) => {
      let key = line.keys().next().value;
      let value = line.get(key);
      let idKey = (`${idx}:${key}`);
      return (
        <tr key={idx}>
          <td>
            <TextField
              id={idKey}
              value={key}
              onChange={this.handleChangeKey}
              name="Key"
              />
          </td>
          <td>
            <TextField
              id={idKey}
              value={value}
              onChange={this.handleChangeValue}
              name="Value"
              />
          </td>
          <td>
            <Button bsStyle="danger" bsSize="xsmall" id={idx} onTouchTap={this.handleFieldDelete}>Delete Row</Button>
          </td>
        </tr>
      );
// end template items
    });
    return (
      <div>
        <Button style={styles.bottomMargin} bsStyle="success" bsSize="xsmall" onTouchTap={this.handleOpen}>Create New Field</Button>
        <Dialog
          title="Create New Field"
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
                  <th></th>
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
const convertDataJSONtoMaps = dataJSON => {
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
const convertMapsToObjects = maps => {
  let arr = [];
  for (let i = 0; i < maps.length; i++) {
    let newObject = {};
    maps[i].forEach((value, key) => {
      console.log(key + " = " + value);
      newObject[key] = value;
    }, maps[i])
    arr.push(newObject);
  }
  return arr;
}
