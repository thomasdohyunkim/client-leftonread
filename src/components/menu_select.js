import React, { Component } from 'react';

// NOTE: I haven't bothered using prop-types library since this is only used internally
// But this component required the ITEMS prop
class MenuSelect extends Component {
  constructor(props) {
    super(props);

    // Ensure there are items
    if (!this.props.items) {
      return;
    }

    this.state = {
      selected: props.items[0],
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e) {
    this.setState({
      selected: e.target.getAttribute('name'),
    });

    this.props.handleChange(e.target.getAttribute('name'));
  }

  renderMenuItems() {
    return this.props.items.map((item) => {
      const cname = this.state.selected == item ? 'menu-item menu-item-selected' : 'menu-item';
      return (
        <div key={item} className={cname} name={item} onClick={this.onSelect} role="menuitem" tabIndex={0}>
          <div className="menu-indicator" name={item} />
          <div className="menu-title" name={item} > {item} </div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.items || this.props.items.length == 0) {
      return (<div> This is an empty menu </div>);
    }

    return (
      <div className="menu-select">
        {this.renderMenuItems()}
      </div>
    );
  }
}

export default MenuSelect;
