import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateExercise extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            selectedFile: null,
            date: new Date(),
            users: [],
            messageResponse: ''
        }

    }

    //React LifeCycle Method
    componentDidMount() {
        this.setState({
            users: ['test user'],
            username: 'test user'
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    fileSelectedHandler = e => {
        // console.log('XXXXX=>', e.target.files[0])
        this.setState({
            selectedFile: e.target.files[0]
        });
    };

    onSubmit(e) {
        e.preventDefault();
        // const fd = new FormData();
        // fd.append('image', this.state.avatar, this.state.avatar.name);

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
            avatar: this.state.selectedFile
        }

        console.log('exercise', exercise);

        axios.post('http://localhost:3001/api/face', exercise).then(res => {
            this.setState({messageResponse: res.data.msg})
        });
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise</h3>
                { this.state.messageResponse && 
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{ this.state.messageResponse }</strong>
                        {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> */}
                    </div> }
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label>Username: </label>
                        <select
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map((user) => {
                                    return <option key={user} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label>Upload image: </label>
                        <input 
                            type="file" 
                            className="form-control"
                            onChange={this.fileSelectedHandler}
                        />
                    </div>
                    <div>
                        <label>Description: </label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div>
                        <label>Duration: </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <Datepicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>    

                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }

}