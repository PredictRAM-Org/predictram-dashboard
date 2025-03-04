import React, { Component } from "react";
import Select, { createFilter } from "react-select";
import { FixedSizeList as List } from "react-window";

function CustomSelect({ data, handleChange, isMultipleSelect, value }) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#F6F7F8",
      borderRadius: "0.625rem",
      padding: "0.25rem 0.125rem",
      fontWeight: "500",
      color: "#14151F",
      border: "none",
      boxShadow: state.isFocused ? "0 0 0 1px #666666" : "none",
    }),
  };

  const height = 35;

  class MenuList extends Component {
    render() {
      const { options, children, maxHeight, getValue } = this.props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;

      return (
        <List
          height={maxHeight}
          itemCount={children.length}
          itemSize={height}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
      );
    }
  }
  return (
    <Select
      isMulti={isMultipleSelect}
      className="m-2"
      styles={customStyles}
      value={value}
      filterOption={createFilter({ ignoreAccents: false })}
      components={{ MenuList }}
      onChange={handleChange}
      options={data}
    />
  );
}

export default CustomSelect;
