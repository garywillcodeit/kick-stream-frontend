import React, { useContext, useEffect, useRef, useState } from "react";
import CheckIcon from "../../../assets/img/icons/CheckIcon";
import { AppContexts } from "../../../contexts/AppContext";
import useCategories from "../../../hooks/useCategories";
import SearchIcon from "../../../assets/img/icons/SearchIcon";

export default function DefineCategories() {
  const { categories, setCategories } = useContext(AppContexts);
  const { searchCategory } = useCategories();
  const [search, setSearch] = useState("");
  const [selectedCats, setSelectedCats] = useState(0);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setCategories(searchCategory(search));
  }, [search]);

  const onSelectCategory = (index) => {
    const newState = [...categories].map((e, i) => {
      if (index === i) {
        e.selected = !e.selected;
      }
      e.displayed = true;

      return e;
    });

    const selected = newState.filter((e) => e.selected).length;

    setCategories(newState);
    setSelectedCats(selected);
    setSearch("");
  };

  return (
    <div className="define-categories">
      <p className="description">
        {"Select your favorite categories "}
        {selectedCats <= 3 && `(${selectedCats}/3)`}
      </p>
      <div className="table-list">
        <div className="search-wrapper">
          <SearchIcon />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Category name</th>
              <th>Selected</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => {
              if (item.displayed) {
                return (
                  <tr key={index} onClick={() => onSelectCategory(index)}>
                    <td className="item-title">
                      <h3>{item.name}</h3>
                    </td>
                    <td className="analytics">
                      <div>
                        {item.selected && (
                          <CheckIcon style={{ fill: "limegreen" }} />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
