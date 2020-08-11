import React, { Component } from 'react';
import axios from 'axios';

export default class ExercisesList extends Component {
    state = {
        selectedFile: null,
        messageResponse: ''
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('avatar', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('http://localhost:3001/api/face', fd).then(res => {
            this.setState({messageResponse: res.data.msg})
        });
    }

    render() {
        return (
            <div>
                 { this.state.messageResponse && 
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{ this.state.messageResponse }</strong>
                        {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> */}
                    </div> }
                <input
                    type="file"
                    onChange={this.fileSelectedHandler}
                />
                <button onClick={this.fileUploadHandler}>SEND</button>
            </div>
        );
    }

}