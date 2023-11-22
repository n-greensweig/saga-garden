import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const NewPlantForm = () => {
    const dispatch = useDispatch();

    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState({ name: '', kingdom: '', clade: '', order: '', family: '', subfamily: '', genus: '' });

    const handleChangeFor = (key, value) => {
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({
            ...newPlant, [key]: value,
        })
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'ADD_PLANT', payload: newPlant });
        // updates the next plant to have a new id
        setPlant({ name: '', kingdom: '', clade: '', order: '', family: '', subfamily: '', genus: '' });
    }

    return (
        <div>
            <h3>This is the form</h3>
            <form onSubmit={addNewPlant}>
                <input type='text' value={newPlant.name} onChange={event => handleChangeFor('name', event.target.value)} placeholder='Name' />
                <input type='text' value={newPlant.kingdom} onChange={event => handleChangeFor('kingdom', event.target.value)} placeholder='Kingdom' />
                <input type='text' value={newPlant.clade} onChange={event => handleChangeFor('clade', event.target.value)} placeholder='Clade' />
                <input type='text' value={newPlant.order} onChange={event => handleChangeFor('order', event.target.value)} placeholder='Order' />
                <input type='text' value={newPlant.family} onChange={event => handleChangeFor('family', event.target.value)} placeholder='Family' />
                <input type='text' value={newPlant.subfamily} onChange={event => handleChangeFor('subfamily', event.target.value)} placeholder='Subfamily' />
                <input type='text' value={newPlant.genus} onChange={event => handleChangeFor('genus', event.target.value)} placeholder='Genus' />
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default NewPlantForm;
