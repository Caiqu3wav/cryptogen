import { useState } from 'react'
import '../styles/taginput.css'
import { WithContext as ReactTags } from 'react-tag-input';

const keyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [keyCodes.comma, keyCodes.enter];

export default function TagInput({onTagsChange}) {
    const [tags, setTags] = useState([]);

    const handleDelete = (i) => {
        const newTags = tags.filter((tag, index) => index !== i);
        setTags(tags.filter((tag, index) => index !== i));
        onTagsChange(newTags.map((tag) => tag.text));
    };

    const handleAddition = (tag) => {
        const newTags = [...tags, tag];
        setTags([...tags, tag]);
        onTagsChange(newTags.map((tag) => tag.text));
    };

    return (
        <div className='flex flex-col gap-2 text-black bg-slate-500 rounded-lg p-2'>
            <h1 className='text-white'>Tags</h1>
            <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                inputFieldPosition="bottom"
                autocomplete
                allowDragDrop={false}
                maxTags={7}
            />
        </div>
    );
}