import React, { Component } from 'react'
class CreateForm extends Component {
  render() {
    return (
      <div className="formCreate">
        <form onSubmit={this.props.onAddItem}>
          <input
            placeholder="task name"
            value={this.props.value}
            onChange={this.props.onChange}/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default CreateForm