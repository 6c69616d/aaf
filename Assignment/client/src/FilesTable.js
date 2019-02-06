import React from 'react';

const FilesTable = (props) => {
    let data = props.files;

    return (
        <div>
            <h2>Here are the files</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name With File Type</th>
                        <th>Original Author</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        </div>
    );
}

export default FilesTable
