import React from 'react';
import ReactDOM from 'react-dom';

function localStorageItem(param) {
    var dataParam = {
        data: param,
    }
    localStorage.setItem('listTodo', JSON.stringify(dataParam));
}

class AddToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listTodo: (localStorage.getItem('listTodo') === null ) ? [] : JSON.parse(localStorage.getItem('listTodo')).data,
        }
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleUpdateItem = this.handleUpdateItem.bind(this);
    }
    handleAddItem(e) {
        if(((e.type === 'keyup' && e.key === 'Enter') || e.type === 'click') && document.getElementById('txtDataItem').value !== '') {
            const newList = this.state.listTodo;
            newList.push(document.getElementById('txtDataItem').value)
            this.setState({listTodo: newList});
            localStorageItem(this.state.listTodo);
        }
    }
    handleDeleteEditItem(i, flagDelete, e) {
        // delete item
        if(flagDelete) {
            let newList =  this.state.listTodo;
            newList.splice(i, 1);
            this.setState({listTodo: newList});
            localStorageItem(this.state.listTodo);
        }
        // edit
        else {
            // update data in input
            document.getElementById('txtDataItem').value = this.state.listTodo[i];
            document.getElementsByClassName('update-item')[0].style.display = 'block';
            document.getElementsByClassName('update-item')[0].setAttribute('indexItem', i);
        }
    }
    handleUpdateItem(e) {
        let indexUpdate = document.getElementsByClassName('update-item')[0].getAttribute('indexItem');
        let newList = this.state.listTodo;
        newList[indexUpdate] = document.getElementById('txtDataItem').value;
        this.setState({listTodo: newList});
        document.getElementsByClassName('update-item')[0].style.display = 'none';
        document.getElementById('txtDataItem').value = '';
        localStorageItem(this.state.listTodo);
    }
    handleCheckItem(id, e) {
        document.getElementsByName(id)[0].style.textDecoration = document.getElementById(id).checked ? 'line-through' : 'none';
    }
    render() {
        let style = {
            display: 'none',
        }
        // localStorage.clear();
        const items = this.state.listTodo.map(function(item, i) {
            let id = 'chkItem' + i;
            return(
                <tr key={i}>
                    <td>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" onChange={this.handleCheckItem.bind(this, id)} id={id}/><label className="custom-control-label" name={id} htmlFor={id}>{item}</label>
                        </div>
                    </td>
                    <td><button onClick={this.handleDeleteEditItem.bind(this, i, true)} className="text-danger button-edit-item">X</button></td>
                    <td><button onClick={this.handleDeleteEditItem.bind(this, i, false)} className="text-danger button-edit-item">Edit</button></td>
                </tr>
            )
        }.bind(this));
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="d-flex flex-column bd-highlight mb-3">
                        <div className="p-2 bd-highlight">
                            <label className="text-danger font-weight-bold header-todolist">Todos</label>
                        </div>
                        <div className="p-2 bd-highlight">
                            <div className="content-todo">
                                <div className="input-group mb-1">
                                    <input type="text" className="form-control" id="txtDataItem" placeholder="Insert item" onKeyUp={this.handleAddItem}/>
                                    <div className="input-group-append" id="button-addon4">
                                        <button className="btn btn-outline-success update-item" style={style} type="button" onClick={this.handleUpdateItem}>UPDATE</button>
                                        <button className="btn btn-outline-success" type="button" onClick={this.handleAddItem}>ADD</button>
                                    </div>
                                </div>
                                <table className="table mb-0">
                                    <tbody>
                                        {items}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<AddToDoList />, document.getElementById('root'));