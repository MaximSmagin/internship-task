import React, { useState, useMemo } from "react";
import "../HardwareList.css";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(
    props.products.prodTable
  );

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const RentItem = (item) => {
    props.products.rentFunc(item);
  };

  return (
    <table>
      <caption className="TableHeader">Hardware List</caption>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort("name")}
              className={getClassNamesFor("name")}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("date")}
              className={getClassNamesFor("date")}
            >
              Date
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("availability")}
              className={getClassNamesFor("availability")}
            >
              Availability
            </button>
          </th>
          <th> Rent</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>
              <span
                style={{
                  color: item.availability === "Available" ? "green" : "red",
                }}
              >
                {item.availability}
              </span>
            </td>
            <td>
              <button
                className="RentBtn"
                disabled={item.availability === "Available" ? false : true}
                onClick={() => RentItem(item)}
              >
                Rent
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function HardwareList(prodTable, rentFunc) {
  return (
    <div className="HardwareList">
      <ProductTable products={prodTable} rentFunc={rentFunc} />
    </div>
  );
}
