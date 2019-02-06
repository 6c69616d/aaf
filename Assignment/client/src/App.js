import React, { Component } from 'react';
import './App.css';
import FilesTable from './FilesTable';
// import NewAnimalForm from './NewAnimalForm';
// import EditAnimalForm from './EditAnimalForm';
import Files from './Files';
import ReactModal from 'react-modal';


class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            data:[], 
            formIsValid:false, 
            animalToEdit:[], 
            showNewAnimalModal:false, showEditAnimalModal:false, 
            nom:'', species:'', breed:'', age:'', colour:'' 
        };

        this.handleSubmitNewAnimal = this.handleSubmitNewAnimal.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);

        this.handleOpenNewAnimalModal = this.handleOpenNewAnimalModal.bind(this);
        this.handleCloseNewAnimalModal = this.handleCloseNewAnimalModal.bind(this);
        this.handleOpenEditAnimalModal = this.handleOpenEditAnimalModal.bind(this);
        this.handleCloseEditAnimalModal = this.handleCloseEditAnimalModal.bind(this);
        this.editAnimal = this.editAnimal.bind(this);

    }


    componentDidMount() {
        // let pets = [
        //     { _id: "1", name: "Logan", age: "5", breed: "Border Collie", colour: "Black, white, tan" },
        //     { _id: "2", name: "Ralph", age: "2", breed: "Cocker Spaniel", colour: "Ginger" },
        //     { _id: "3", name: "Gryphon", age: "9", breed: "Staffie X", colour: "grey" }
        // ];
        const temp = [];

        fetch('http://localhost:3030/files')
            .then(res => res.json())
            .then(item => {
                item.forEach(it => {
                    temp.push(<Files
                        key={it._id}
                        id={it._id}
                        nameWithFileType={it.nameWithFileType}
                        original_author={it.original_author}
                        ef={this.editAnimal}
                        />);
                        
                })
                this.setState({ data: temp });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleSubmitNewAnimal(event) {
        event.preventDefault();

        if (!event.target.checkValidity()) {
            this.setState({ formIsValid: false });
            // form is invalid! so we do nothing
            return;
        }
        this.setState({ formIsValid: true });

        let nu = {
            nom:this.state.nom,
            species:this.state.species,
            breed:this.state.breed,
            age:this.state.age,
            colour:this.state.colour
        };
        fetch('/petshop/api/pet', {
            method: "POST",
            body:JSON.stringify(nu),
            headers: { "Content-Type": "application/json; charset=utf-8" }
        })
        .then(response => {
            response.json()
            .then(status => {
                console.log("Successful "+ status);
            })
        })
        .then(this.handleCloseEditAnimalModal());
    }

    handleSubmitUpdate(event) {
        // console.log(this.state.animalToEdit);

        event.preventDefault();
        if (!event.target.checkValidity()) {
            this.setState({ formIsValid: false });
            // form is invalid! so we do nothing
            return;
        }
        this.setState({ formIsValid: true });

        let url = '/petshop/api/pet/'+ this.state.animalToEdit.id +'/edit';
        // console.log(url);

        fetch(url, {
            method: "POST",
            body:JSON.stringify(this.state.animalToEdit),
            headers: { "Content-Type": "application/json; charset=utf-8" }
        })
        .then(response => {
            response.json()
            .then(status => {
                console.log("Successful "+ status);
            })
        })
        .then(this.handleCloseEditAnimalModal());
    }


    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({ [name]: target.value });
    }

    handleUpdateChange(event) {
        const target = event.target;
        const name = target.name;
        let temp = this.state.animalToEdit;
        temp[name] = target.value;
        console.log(temp);
        this.setState({ animalToEdit:temp });
        // this.setState({ [name]: target.value});
    }

    handleOpenNewAnimalModal () { this.setState({ showNewAnimalModal: true }); }  
    handleCloseNewAnimalModal () { this.setState({ showNewAnimalModal: false }); }
    handleCloseEditAnimalModal () { this.setState({ showEditAnimalModal: false }); }
    handleOpenEditAnimalModal () { this.setState({ showEditAnimalModal: true }); }  


    editAnimal(orig, evt) {
        this.setState({ showEditAnimalModal:true, animalToEdit:orig }); 
    }

    render() {
        return (
            <div>
                <p>
                    <button onClick={this.handleOpenNewAnimalModal}>Add a new pet</button>
                </p>

                {/* <̣NewAnimalForm hs={this.handleSubmit} hic={this.handleInputChange} ea={this.editAnimal} /> */}
                <FilesTable files={this.state.data} />

                <ReactModal
                    isOpen={this.state.showNewAnimalModal}
                    contentLabel="Minimal Modal Example" >
                    <button onClick={this.handleCloseNewAnimalModal}>Close</button>
                    {/* <NewAnimalForm hs={this.handleSubmitNewAnimal} hic={this.handleInputChange} ea={this.editAnimal} /> */}
                </ReactModal>

                <ReactModal
                    isOpen={this.state.showEditAnimalModal}
                    contentLabel="Minimal Modal Example" >
                    <button onClick={this.handleCloseEditAnimalModal}>Close</button>
                    {/* <EditAnimalForm hs={this.handleSubmitUpdate} hic={this.handleUpdateChange} ate={this.state.animalToEdit} /> */}
                </ReactModal>
            </div>
        );
    }
}

export default App;
