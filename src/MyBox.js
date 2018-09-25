import React, { Component } from 'react';
import { ReactDOM } from 'react-dom';

class MyBox extends Component {
    constructor(props){
        super(props);
        this.state = {editing: false};

        this.changeMode = this.changeMode.bind(this);
        this.removeBox = this.removeBox.bind(this);
        this.saveBox = this.saveBox.bind(this);
        this.displayMode = this.displayMode.bind(this);
        this.editMode = this.editMode.bind(this);
        
    }
    changeMode(){
        this.setState({editing:!this.state.editing});
    }

    removeBox(){
       if(window.confirm('are you sure?'))
       {
            this.props.onRemove(this.props.index);
       }
    }

    saveBox(){
        this.props.onChange(
            this.refs.title.value,
            this.refs.description.value,
            this.props.index);

        this.setState({editing: false});
    }

    displayMode(){
        return (
            <div className="my-box">
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
                <div>
                   <button className="btn btn-primary btn-sm fa fa-edit" onClick={this.changeMode}/>     
                    | 
                   <button className="btn btn-danger btn-sm fa fa-remove" onClick={this.removeBox}/>    
                </div>
            </div>
        );
    }

    editMode(){
        return (
            <div className="my-box">
               Title : <input ref="title" className="form-control" defaultValue={this.props.title}/>
               Description : <textarea ref="description"  className="form-control">
                        {this.props.description}
                </textarea>
                <div>
                   <button className="btn btn-success btn-sm fa fa-save" onClick={this.saveBox}/>        
                   <button className="btn btn-warning btn-sm fa fa-times" onClick={this.changeMode}/>        
                </div>
            </div>
        );
    }

    render(){
        if (this.state.editing) {
            return (this.editMode());
        } else {
           return (this.displayMode());
        }
    }
}

export default MyBox;