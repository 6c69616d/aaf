import React from 'react';

const Files = (props) => {
    let fi = {
        key: props.id,
        id: props.id,
        nameWithFileType: props.nameWithFileType,
        original_author: props.original_author,
    }
    let editFile = props.fi;
    let boundEditFile = editFile.bind(this, fi);

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.species}</td>
            <td>{props.breed}</td>
            <td>{props.age}</td>
            <td>{props.colour}</td>
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
