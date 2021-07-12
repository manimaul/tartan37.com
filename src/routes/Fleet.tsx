import React from 'react';
import data from '../assets/fleet.json';

export interface Owner {
    name: string;
}

export interface FleetItem {
    hull: number;
    owner: Owner;
    name: string;
    type: string;
    blurb: string;
    location: string;
    img: string;
    web: string;
}

export const fleetData = data as FleetItem[];

function Image(named: string) {
    if (named != null && named.length > 0) {
        return(
            <div><br /><img src={'/fleetimg/' + named} /><br /></div>
        )
    } else {
        return null
    }
}

function Web(named: string) {
    if (named != null && named.length > 0) {
        return(
            <div>Web: <a href={named} >{named}</a><br /></div>
        )
    } else {
        return null
    }
}

function Item(it: FleetItem) {
    return (

        <div>
            <h4>Hull #{it.hull}</h4>
            Owner: {it.owner.name}<br/>
            Type: {it.type}<br />
            Name: <b>{it.name.toUpperCase()}</b><br />
            Location: {it.location}<br />
            {Web(it.web)}
            {Image(it.img)}<br />
            <p><i>{it.blurb}</i></p>
            <hr />
        </div>
    )
}

export default class Fleet extends React.Component<any, any> {


    public render() {
        return (
            <div className="container">
                {fleetData.map((it) => Item(it))}
            </div>
        )
    }
}
