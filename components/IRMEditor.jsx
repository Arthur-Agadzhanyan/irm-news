import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

const IRMEditor = ({handleEditorChange, value}) => {
    return (
        <Editor
                apiKey='a4oasa18b0q1iybdylfene3v0p034bp29zx5m98cum84tu24'
                initialValue={value ? value : 'Введите текст поста'}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code ',
                        'insertdatetime media table paste wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic blockquote | backcolor forecolor | \
                                alignleft aligncenter alignright | \
                                bullist numlist outdent indent | help '
                }}
                onChange={handleEditorChange}
                
            />
    );
}

export default IRMEditor;
