import React, { Component } from 'react'
import Select from 'react-select'



class practice061 extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            isloading: true,
            selectoptions:[
                { value: 1, label: 'gmail' },
                { value: 2, label: 'yahop' },
                { value: 3, label: 'chapar' },
                { value: 4, label: 'goozak' },
            ]
        }
        this.loadData = this.loadData.bind(this)
        this.DisplayMode = this.DisplayMode.bind(this)
        this.EditMode = this.EditMode.bind(this)
        this.Additem = this.Additem.bind(this)        
        this.removeItem = this.removeItem.bind(this)        
        this.changeMode = this.changeMode.bind(this)        
        this.saveItem = this.saveItem.bind(this)  
        
        this.loadInterval;      

    }
    componentDidMount() {
        this.loadData();
        this.loadInterval = setInterval(this.loadData, 100000);
       
    }
    componentWillUnmount(){
        clearInterval(this.loadInterval)
    }

    loadData() {

        fetch(' https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((inputData) => {
                this.setState({
                    data: inputData,
                    isloading: false

                });
                
            })
    }





    Additem() {
var newId=this.state.data;
        var newInf = {
            id: newId.length+1,
            name: "new name",
            username: "new username",
            email: "new email",
            emailType: "",
            newRowMode: true
        }
        var newRow = this.state.data;
        newRow.push(newInf);
        this.setState({
            data: newRow
        })
        


    }


    DisplayMode(item, index) {

        return (

            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td></td>
                <td>
                    <button className="btn btn-primary m-2" onClick={() => this.changeMode(item,index)}><i className="fa fa-edit"></i></button>
                    <button className="btn btn-danger m-2" onClick={() => this.removeItem(item,index)}><i className="fa fa-times"></i></button>
                </td>
            </tr>

        )

    }

    EditMode(item, index) {

        return (

            <tr>
                <td>{item.id}</td>
                <td><input type="text" className="form-control" ref="nameINP" defaultValue={item.name}></input></td>
                <td><input type="text" className="form-control" ref="usernameINP" defaultValue={item.username}></input></td>
                <td><input type="text" className="form-control" ref="emailINP" defaultValue={item.email}></input></td>
                <td><Select refs="myselect" options={this.state.selectoptions}/></td>

                <td>
                    <button className="btn btn-success m-2" onClick={() => this.saveItem(item,index)}><i className="fa fa-save"></i></button>
                    <button className="btn btn-warning m-2" onClick={() => this.changeMode(item,index)}><i className="fa fa-close"></i></button>
                </td>

            </tr>

        )

    }


    changeMode(item,index){
        var mode=this.state.data;
        mode[index].newRowMode=!mode[index].newRowMode;
        this.setState({
            data:mode
        })
    }
 

    removeItem(item,index){
        if(!window.confirm("are you sure ?")){
            return false
        }
        var removeRow=this.state.data;
        console.log(removeRow);
        removeRow.splice(index,1);
        this.setState({
            data:removeRow
        })
    }
    saveItem(item,index){
        
        var datasave=this.state.data;
     
     
      

       datasave[index].name=this.refs.nameINP.value;
       datasave[index].username=this.refs.usernameINP.value;
       datasave[index].email=this.refs.emailINP.value;
       
     
    //    fetch('https://jsonplaceholder.typicode.com/users', {
    //         method: "POST", // *GET, POST, PUT, DELETE, etc.
    //         mode: "cors", // no-cors, cors, *same-origin
    //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: "same-origin", // include, same-origin, *omit
    //         headers: {
    //             "Content-Type": "application/json; charset=utf-8",
    //             // "Content-Type": "application/x-www-form-urlencoded",
    //         },
    //         redirect: "follow", // manual, *follow, error
    //         referrer: "no-referrer", // no-referrer, *client
    //         body: JSON.stringify(datasave), // body data type must match "Content-Type" header
    //     })
    //         .then(response => response.json()) // parses response to JSON
    //         .then(data => {
    //             // let temp = this.state.products;
    //             // this.setState({ products: temp });
    //             console.log(data)
    //             this.loadData();
    //         });


       this.setState({
           data:datasave

       })

       this.changeMode(item,index);

       
       



    }


    render() {
        if (this.state.isloading) {
            return (
                <div className="text-center">
                    <i className="fa fa-spin fa-spinner"></i>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="d-flex justify-content-center"><button type="button" className="btn btn-primary m-4" onClick={this.Additem}>add an item</button></div>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>name</td>
                                <td>username</td>
                                <td>email</td>
                                <td>email type</td>
                                <td>edits</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((item, index) => item.newRowMode ? this.EditMode(item, index) : this.DisplayMode(item, index))}
                            {this.state.data.map((item, index) => console.log(item.newRowMode))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default practice061;