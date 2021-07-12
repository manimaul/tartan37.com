import React from 'react';
import {fleetData, FleetItem} from "./Fleet";

let chunkSize = 4

function Chunk(arr: FleetItem[]) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

function Image(named: string) {
    let url = '/fleetimg/' + named
    return (
        <div>
            <img src={url}/><br/>
        </div>
    )
}

function Col(item: FleetItem) {
    return (
        <div className="col-sm">
            <div>
                <b>Hull #{item.hull} - {item.name.toUpperCase()}</b><br/>
                {item.owner.name}<br/>
                {Image(item.img)}<br/>
            </div>
        </div>
    );
}

function Row(groups: FleetItem[]) {
    return (
        <div className="row">
            {groups.map((item) => Col(item))}
            <hr />
        </div>
    );
}

function FleetDataWithImages() {
    return fleetData.filter((item: FleetItem) => {
        return item.img != null && item.img.length > 0
    })
}

function Gallery() {
    return (
        <div className="container">
            {Chunk(FleetDataWithImages()).map((chunk) => Row(chunk))}
        </div>
    );
}

export default Gallery;