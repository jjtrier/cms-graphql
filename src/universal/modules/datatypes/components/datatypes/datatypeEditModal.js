import React, {Component, PropTypes} from 'react';
// import {ChipExampleSimple} from './chipsExample.js';
import Chip from 'material-ui/Chip';
import {List, ListItem} from 'material-ui/List';
import {Dialog, FlatButton, TextField, Divider, SelectField, MenuItem} from 'material-ui';
import {updateDatatype} from '../../ducks/datatypesDucks.js';
import {Button, ListGroup, ListGroupItem} from 'react-bootstrap';

const styles = {
  chip: {
    margin: 0
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

function handleTouchTap() {
  alert('You clicked the Chip.');
}

const idsFromFields = fields => {
  let ids = [];
  for (let i = 0; i < fields.length; i++) {
    ids.push(fields[i].id);
  }
  return ids;
};

export default class DatatypeEditModal extends Component {
  static propTypes = {
    datatype: PropTypes.object,
    datatypes: PropTypes.array,
    fields: PropTypes.array,
    dispatch: PropTypes.func
  }
  state = {
    open: false,
    id: this.props.datatype.id,
    name: this.props.datatype.name,
    description: this.props.datatype.description,
    visible: this.props.datatype.visible,
    fields: this.props.datatype.fields,
    errorText: ''
  };

  handleChange = event => {
    const lineKey = event.target.id;
    this.setState({
      [lineKey]: event.target.value
    });
  };

  handleRequestChipDelete = field => {
    console.log('You clicked the delete button.', field.name);
    alert('You clicked the delete button.', field.name);
  }

  handleChangeVisible = (event, index, value) => this.setState({visible: value});

  handleOpen = () => {
    this.setState({open: true});
  };

  handleSubmit = () => {
    this.setState({open: false});

    let newDatatypeInfo = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      visible: this.state.visible,
      fields: idsFromFields(this.state.fields)
    };
    JSON.stringify(newDatatypeInfo);
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
    // templatize the fields to be chips in Component
    const self = this;
    let allFields = this.props.fields;
    let fields = this.state.fields;
    let templateStoredFields = fields.map((field, idx) => {
      return (
        <ListGroupItem key={idx}>
          <Chip
            onRequestDelete={self.handleRequestChipDelete}
            onTouchTap={handleTouchTap}
            style={styles.chip}>
            {field.name}
          </Chip>
        </ListGroupItem>
      );
    });
    let templateAllFields = allFields.map((field, idx) => {
      return (
        <ListGroupItem key={idx}>
          <Chip
            onTouchTap={handleTouchTap}
            style={styles.chip}>
            {field.name}
          </Chip>
        </ListGroupItem>
      );
    });

    return (
      <div>
        <Button bsStyle="info" bsSize="xsmall" onTouchTap={this.handleOpen}>Edit Datatype</Button>
        <Dialog
          title="Edit Datatype"
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
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
          {/* diplay fields */}
          <h4>Fields</h4>
          <div style={styles.wrapper}>
            <ListGroup>
              {templateAllFields}
            </ListGroup>
            <ListGroup>
              {templateStoredFields}
            </ListGroup>
          </div>
        </Dialog>
      </div>
    );
  }
}
