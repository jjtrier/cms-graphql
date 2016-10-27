const projectSchema =
`{
  id
  name
  description
  categories{id,name,visible,
    entries{id,title,projectId,datatypeId,visible,data,categoryId}
    datatype{
    id
    name
    description
    visible
      fields{
        id
        name
        description
    }
  }}
}`;

browserHistory.push('/');

<ToggleDisplay show={self.state.isAuthorized} tag="td">
  <FieldEditModal field={field}
    dispatch={self.props.dispatch}/>
</ToggleDisplay>;

<Modal
  isOpen={bool}
  onAfterOpen={afterOpenFn}
  onRequestClose={requestCloseFn}
  closeTimeoutMS={n}
  shouldCloseOnOverlayClick={false}
  style={customStyle}
  contentLabel="No Overlay Click Modal"
>

  <h1>Force Modal</h1>
  <p>Modal cannot be closed when clicking the overlay area</p>
  <button onClick={handleCloseFunc}>Close Modal...</button>
</Modal>

// With your styles
  .ModalClass {
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    background-color: papayawhip;
  }

  .OverlayClass {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rebeccapurple;
  }

  class CSSClassesExample extends React.Component {
    constructor () {
      super();
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    openModal () { this.setState({open: true}); }

    closeModal () { this.setState({open: false}); }

    render () {
      return (
        <div>
          <button onClick={this.openModal}>Open Modal</button>
          <Modal
            className="ModalClass"
            overlayClassName="OverlayClass"
            isOpen={this.state.open}
            onRequestClose={this.closeModal}
          >
            <h1>Styled Using Classes Modal</h1>
            <button onClick={this.closeModal}>Close</button>
            <input />
            <input />
          </Modal>
        </div>
      );
    }
  }
