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
