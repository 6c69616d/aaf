import React, { Component } from 'react';
import Animals from './Animals';
import ReactTable from "react-table";
import "react-table/react-table.css";

class AnimalsClass extends Component {
   constructor(props) {
       super(props);
       this.state = {
        pets: [],
        error: null
   };
   
   } 

   render() {
    let data = this.state.pets || {};
    let columns = ['name', 'age', 'species', 'colour'];
    return (
        <div>
 <ReactTable
    data={data}
    columns={columns}
  />
        <br />
        </div>
    );
}


componentDidMount() {
    fetch('http://localhost:3050/petshop/pet')
        .then(data => data.json())
        .then(res => {
            if (res.error) 
this.setState({ error: res.error });
            else {
                let temp = [];
                res.data.forEach(item => {
                    temp.push(
                        <Animals key={item._id}
                                name={item.name}
                                age={item.age}
                                breed={item.breed}
                                colour={item.colour}
                        />
                    );
                });
                this.setState({ pets:temp });
            }
        }
    );
}


}

export default AnimalsClass
