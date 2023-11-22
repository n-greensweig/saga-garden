import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const plantList = useSelector(store => store.plantList);
    console.log(plantList);

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        dispatch({ type: 'FETCH_PLANTS' });
    }, []);

    const removePlant = (id) => {
        dispatch({ type: 'REMOVE_PLANT', payload: id });
    }

    return (
        <div>
            <h3>This is the plant list</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Kingdom</th>
                        <th>Clade</th>
                        <th>Order</th>
                        <th>Family</th>
                        <th>Subfamily</th>
                        <th>Genus</th>
                    </tr>
                </thead>
                <tbody>
                    {plantList.map(plant => (
                        <tr>
                            <td>{plant.name}</td>
                            <td>{plant.kingdom}</td>
                            <td>{plant.clade}</td>
                            <td>{plant.order}</td>
                            <td>{plant.family}</td>
                            <td>{plant.subfamily}</td>
                            <td>{plant.genus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PlantList;
