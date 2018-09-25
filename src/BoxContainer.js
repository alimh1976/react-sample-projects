import React, { Component } from 'react';
import { ReactDOM } from 'react-dom';
import MyBox from './MyBox';

class BoxContainer extends Component {
    constructor(props){
        super(props);
        this.state ={boxes : [
            {title:'work title 1', description:'React makes it painless to create'},
            {title:'work title 2', description:'React makes it painless to create'},
        ]};

        this.eachBox = this.eachBox.bind(this);
        this.addBox = this.addBox.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
          
    }

    eachBox(box, i) {
        return (
            <MyBox 
              key={i}
              index={i}
              onRemove={this.remove} 
              onChange={this.update}
              title={box.title} 
              description={box.description} />
            );
    }

    addBox(){
        let boxData = {title:'new box', description:'description.....'};
        let myBoxes = this.state.boxes;
        myBoxes.push(boxData);

        this.setState({boxes : myBoxes});

    
    }

    remove(i) {
        var arr = this.state.boxes;
        arr.splice(i, 1);
        this.setState({boxes: arr});
    }
    update (title, description, i) {
        var arr = this.state.boxes;
        arr[i].title = title;
        arr[i].description = description;
        this.setState({boxes: arr});
    }

    render() {
        return (
            <div> 
                {this.state.boxes.map(this.eachBox)}
                <div className="addButtonContainer">
                    <button className="btn btn-outline-primary" onClick={this.addBox}>
                        <i className="fa fa-plus"></i>    
                        Add New Box
                    </button>
                </div>   
            </div>
        );
    }
}

export default BoxContainer;