import React, { Component } from 'react';
import Select from 'react-select';
// npm install react-select --save
{/* <Select defaultValue={this.state.cities.find(city =>city.value == person.city)}
onChange={(event) => this.handleChangeSelect(event,i)}
options={this.state.cities}
/> */}

class Product extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            selectedCategoryId: 0,
            products: [
                // { id: 1, productName: 'Tablet AAA', price: 1500, categoryId: 1 },
                // { id: 2, productName: 'Mobile AAA', price: 3000, categoryId: 1 },
                // { id: 3, productName: 'Monitor AAA', price: 6000, categoryId: 1 },
            ],
            categories: [
                { value: 1, label: 'Tablet' },
                { value: 2, label: 'Monitor' },
                { value: 3, label: 'Mobile' },
                { value: 4, label: 'Keyboard' },
            ]
        };
        this.addRow = this.addRow.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.loadData = this.loadData.bind(this);

        this.loadInterval;

    }
    componentDidMount() {
        this.loadData();
        this.loadInterval = setInterval(this.loadData, 40000);
    }
    componentWillUnmount() {
        clearInterval(this.loadInterval);
    }
    loadData()
    {
        let token = window.localStorage.getItem("token");
        //fetch('http://localhost:4373/api/product')
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + token,
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            //body: JSON.stringify({ id: id }), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(data => this.setState({ products: data, isLoading: false }));
    }
    displayMode(item, i) {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.website}</td>
                <td>
                    <div className="btn-group">
                        <button className="btn btn-primary btn-sm" onClick={() => this.changeState(i)}>
                            <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => this.removeItem(item.id, i)}>
                            <i className="fa fa-remove"></i>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
    editMode(item, i) {
        return (
            <tr>
                <td>
                <input type="hidden" ref="id" value={item.id}/>
                {item.id}</td>
                <td>
                    <input className="form-control" ref="productName" defaultValue={item.productName} />
                </td>
                <td>
                    <input className="form-control" ref="price" defaultValue={item.price} />
                </td>
                <td>
                    <Select options={this.state.categories}
                       defaultValue={this.state.categories.find(category =>category.value == item.categoryId)}
                        onChange={(event) => this.handleChangeSelect(event, i)} />
                </td>
                <td>
                    <div className="btn-group">
                        <button className="btn btn-success btn-sm" onClick={this.saveItem}>
                            <i className="fa fa-save"></i>
                        </button>
                        <button className="btn btn-warning btn-sm">
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
    changeState(i){
        let temp = this.state.products;
        temp[i].newRow = true;
        this.setState({ products: temp });
    }
    removeItem(id, index) {
        if(!window.confirm('are sure remove item?')){
            return;
        }
        fetch('https://jsonplaceholder.typicode.com/users'+ id, {
            method: "Delete", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            //body: JSON.stringify({ id: id }), // body data type must match "Content-Type" header
        })
            .then(response => response.json()) // parses response to JSON
            .then(data => {
                if (data.isSuccess) {
                    let temp = this.state.products;
                    temp.splice(index, 1);
                    this.setState({ products: temp });
                } else {
                    window.aert(data.message);
                }
            });
    }
    saveItem() {
        let newProduct = {};
        newProduct.id = this.refs.id.value;
        newProduct.productName = this.refs.productName.value;
        newProduct.price = this.refs.price.value;
        newProduct.categoryId = this.state.selectedCategoryId; //??
        newProduct.newRow = false;

        fetch('https://jsonplaceholder.typicode.com/users', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(newProduct), // body data type must match "Content-Type" header
        })
            .then(response => response.json()) // parses response to JSON
            .then(data => {
                // let temp = this.state.products;
                // this.setState({ products: temp });
                 window.alert(data.message);
                this.loadData();
            });
    }
    handleChangeSelect(e, i) {
        this.setState({ selectedCategoryId: e.value });
    }
    addRow() {
        let temp = this.state.products;
        let newProduct = { productName: 'new ', price: 0, categoryId: 1, newRow: true };
        temp.push(newProduct);
        this.setState({ products: temp });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    <i className="fa fa-spin fa-spinner fa-2x"></i>
                    Loading Data
                </div>
            );
        } else {
            return (
                <div>
                    <button className="btn btn-primary btn-sm" onClick={this.addRow}><i className="fa fa-plus"></i>Add New Item</button>
                    <br />
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map((product, index) =>
                                product.newRow ? this.editMode(product, index) :
                                    this.displayMode(product, index))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default Product;