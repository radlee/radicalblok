import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class AddEditBlog extends React.Component {

    state={
        title: '',
        description: '',
        content: ''
    }

    handleChange = (event) => {
        const target = event.target;
        const { name, value } = target;
        this.setState({
            [name]: value
        })
    }

    handleCkeditorState = (event, editor) => {
        const data = editor.getData();
        this.setState({
            content: data
            
        })
    }

  render() {

    console.log("State " , this.state)

    return (
        <div className='container'>
            <div className='wrapper'>
                <div className='form-group'>
                    <h1>Add Blog</h1>
                    <div className='form-group'>
                        <label>Title</label>
                        <input type='text' name='title' value={this.state.title} onChange={this.handleChange} placeholder='Blog Title' className='form-control' required />
                    </div>

                    <div className='form-group'>
                        <label>Description</label>
                        <input type='text' name='description' value={this.state.description} onChange={this.handleChange} placeholder='Blog Description' className='form-control' required />
                    </div>

                    <div className='form-group'>
                        <label>Content</label>
                        {/* <textarea cols='25' rows='14' type='text' name='content' value={this.state.content} onChange={this.handleChange} placeholder='Blog Content' className='form-control' required /> */}
                        <CKEditor 
                            editor={ ClassicEditor }
                            onInit={ editor=> {

                            }}

                            onChange={this.handleCkeditorState}
                
                        />
                    </div>

                    <div className='form-group'>
                        <input type='submit' name='submit' className='btn btn-secondary' />
                    </div>

                </div>

            </div>

        </div>

    )
    
  }
}
