import React from 'react';

const Files = (props) => {
    let fi = {
        key: props.id,
        id: props.id,
        nameWithFileType: props.nameWithFileType,
        original_author: props.original_author,
        creation_date: props.creation_date,
        //version_number: props.metadata.version_number,
    }   
    let editFile = props.ef;
    let boundEditFile = editFile.bind(this, fi);
    console.log(props)
    return (
        <tr>
            <td>{props.nameWithFileType}</td>
            <td>{props.original_author}</td>
            <td>{props.creation_date}</td>
            <td> </td>
            <td>
                <button 
                    onClick={boundEditFile} 
                    >
                    Edit
                </button>
            </td>
        </tr>
    );
}

export default Files
