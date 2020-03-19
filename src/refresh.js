import React from 'react';

export function Refresh(props){
  return <button className="refresh" style={{opacity: props.opacity, pointerEvents: props.pointerEvents}} onClick={props.onClick}>Refresh</button>;
}