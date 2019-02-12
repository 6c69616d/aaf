import React, { Component } from 'react';
import './App.css';
import FilesTable from './FilesTable';
// import NewFileForm from './NewFileForm';
// import EditFileForm from './EditFileForm';
import Files from './Files';
import ReactModal from 'react-modal';


class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            data:[], 
            formIsValid:false, 
            FileToEdit:[], 
            showNewFileModal:false, showEditFileModal:false, 
            nom:'', species:'', breed:'', age:'', colour:'' 
        };

        this.handleSubmitNewFile = this.handleSubmitNewFile.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);

        this.handleOpenNewFileModal = this.handleOpenNewFileModal.bind(this);
        this.handleCloseNewFileModal = this.handleCloseNewFileModal.bind(this);
        this.handleOpenEditFileModal = this.handleOpenEditFileModal.bind(this);
        this.handleCloseEditFileModal = this.handleCloseEditFileModal.bind(this);
        this.editFile = this.editFile.bind(this);

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
                        creation_date={it.creation_date}
                        version_number={it.metadata.version}
                        ef={this.editFile}
                        />);
                        
                })
                this.setState({ data: temp });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleSubmitNewFile(event) {
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
        .then(this.handleCloseEditFileModal());
    }

    handleSubmitUpdate(event) {
        // console.log(this.state.FileToEdit);

        event.preventDefault();
        if (!event.target.checkValidity()) {
            this.setState({ formIsValid: false });
            // form is invalid! so we do nothing
            return;
        }
        this.setState({ formIsValid: true });

        let url = '/petshop/api/pet/'+ this.state.FileToEdit.id +'/edit';
        // console.log(url);

        fetch(url, {
            method: "POST",
            body:JSON.stringify(this.state.FileToEdit),
            headers: { "Content-Type": "application/json; charset=utf-8" }
        })
        .then(response => {
            response.json()
            .then(status => {
                console.log("Successful "+ status);
            })
        })
        .then(this.handleCloseEditFileModal());
    }


    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({ [name]: target.value });
    }

    handleUpdateChange(event) {
        const target = event.target;
        const name = target.name;
        let temp = this.state.FileToEdit;
        temp[name] = target.value;
        console.log(temp);
        this.setState({ FileToEdit:temp });
        // this.setState({ [name]: target.value});
    }

    handleOpenNewFileModal () { this.setState({ showNewFileModal: true }); }  
    handleCloseNewFileModal () { this.setState({ showNewFileModal: false }); }
    handleCloseEditFileModal () { this.setState({ showEditFileModal: false }); }
    handleOpenEditFileModal () { this.setState({ showEditFileModal: true }); }  


    editFile(orig, evt) {
        this.setState({ showEditFileModal:true, FileToEdit:orig }); 
    }

    render() {
        return (
            <div>
                <p>
                    <button onClick={this.handleOpenNewFileModal}>Add a new pet</button>
                </p>

                {/* <̣NewFileForm hs={this.handleSubmit} hic={this.handleInputChange} ea={this.editFile} /> */}
                <FilesTable files={this.state.data} />

                <ReactModal
                    isOpen={this.state.showNewFileModal}
                    contentLabel="Minimal Modal Example" >
                    <button onClick={this.handleCloseNewFileModal}>Close</button>
                    {/* <NewFileForm hs={this.handleSubmitNewFile} hic={this.handleInputChange} ea={this.editFile} /> */}
                </ReactModal>

                <ReactModal
                    isOpen={this.state.showEditFileModal}
                    contentLabel="Minimal Modal Example" >
                    <button onClick={this.handleCloseEditFileModal}>Close</button>
                    {/* <EditFileForm hs={this.handleSubmitUpdate} hic={this.handleUpdateChange} ate={this.state.FileToEdit} /> */}
                </ReactModal>
            </div>
        );
    }
}

export default App;
