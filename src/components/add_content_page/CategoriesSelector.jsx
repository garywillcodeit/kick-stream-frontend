import React, { useContext, useEffect, useRef, useState } from "react";
import CheckIcon from "../../assets/img/icons/CheckIcon";
import SearchIcon from "../../assets/img/icons/SearchIcon";
import { AppContexts } from "../../contexts/AppContext";

export default function CategoriesSelector() {
  const { categories, setCategories } = useContext(AppContexts);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (search.trim().length > 0) {
      let searchData = search.toLowerCase();

      const newState = [...categories].map((e) => ({ ...e, displayed: false }));

      for (let i = 0; i < newState.length; i++) {
        let name = newState[i].name.toLowerCase();

        if (
          name === searchData ||
          name.startsWith(searchData) ||
          name.includes(searchData)
        ) {
          newState[i].displayed = true;
        }
      }

      setCategories(newState);
    } else {
      const newState = [...categories].map((e) => ({ ...e, displayed: true }));
      setCategories(newState);
    }
  }, [search]);

  const onSelectCat = (item) => {
    let newCatList = [...categories].map((e) => {
      if (e._id === item._id) {
        if (item.selected) {
          e.userSelect = false;
          e.selected = false;
        } else {
          e.userSelect = true;
          e.selected = true;
        }
      }

      return e;
    });

    if (search.length > 0) {
      newCatList = newCatList.sort((a, b) => a.name.localeCompare(b.name));
      newCatList = newCatList.sort((a, b) => b.selected - a.selected);
      setSearch("");
      searchInputRef.current.focus();
    }

    setCategories(newCatList);
  };

  return (
    <div className="categories-selector">
      <p>Choose relative categories</p>
      <div className="table-list">
        <div className="search-wrapper">
          <SearchIcon />
          <input
            ref={searchInputRef}
            type="text"
            name=""
            id=""
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
                  <tr key={index} onClick={() => onSelectCat(item)}>
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
