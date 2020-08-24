import React from 'react';
import { FixedSizeList } from 'react-window';

 
const ListComponent = ({ items, rowComponent, height, width}) => {
  const Row = rowComponent(items);
  
  /*({ index, style }) => (
    <RowComponent image={items[index]} num={index} style={style} loading={index === items.length} />
  );*/
  
  const itemCount = items.length;

  return (
    <FixedSizeList
        height={height}
        width={width}
        itemCount={itemCount}
        itemSize={60}
        className="list-container"
    >
        {Row}
    </FixedSizeList>
  )
};

export default ListComponent;