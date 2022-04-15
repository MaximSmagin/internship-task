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
  //console.log(props.products)
  //console.log(props.products.prodTable)
  const { items, requestSort, sortConfig } = useSortableData(
    props.products.prodTable
  );
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <caption className="TableHeader">Rent List</caption>
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
          <th> Return</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.date}</td>

            <td>
              {" "}
              <button
                className="RentBtn"
                style={{
                  backgroundColor:
                    item.availability === "Available" ? "#90EE90" : "gray",
                }}
                enabled={{
                  backgroundColor:
                    item.availability === "Available" ? "true" : "false",
                }}
                onclick="return false;"
              >
                {" "}
                Rent
              </button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function RentList(prodTable) {
  return (
    <div className="RentList">
      <ProductTable products={prodTable} />
    </div>
  );
}
