import { Component, ReactNode } from 'react';

export class ComponentOutLineView extends Component {
    render() {
        return (
          <div
            style={{
                position: 'fixed',
                left: '0px',
                top: '0px',
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight}px`,
                border: '2px solid #e90139',
                borderRadius: '8px',
            }}
          >
            ComponentOutLineView
          </div>
        );
    }
}