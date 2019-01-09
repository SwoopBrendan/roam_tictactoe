import React, { Component } from 'react';

function Cell(props) {
    return (
        <button className="square" onClick={props.onClick} style={styles.buttonStyle} disabled={props.value ? 'disabled' : ''}>
            {props.value ? props.value : ' '}
        </button>
    );
}

const styles = {
    buttonStyle: {
        border: '1px outset blue',
        backgroundColor: 'lightBlue',
        height: '50px',
        width: '50px',
        cursor: 'pointer'
    }
}

export default Cell;
