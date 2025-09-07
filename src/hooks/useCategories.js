import { useContext } from "react";
import { AppContexts } from "../contexts/AppContext";
import { getRequest } from "../utils/requests/serverRequests";

export default function useCategories() {
  const { categories, setCategories } = useContext(AppContexts);

  const searchCategory = (search) => {
    if (search.trim().length > 0) {
      search = search.toLowerCase();

      const newState = [...categories].map((e) => {
        let name = e.name.toLowerCase();
        e.displayed = false;

        if (
          name === search ||
          name.startsWith(search) ||
          name.includes(search)
        ) {
          e.displayed = true;
        }

        return e;
      });

      return newState;
    } else {
      const newState = [...categories].map((e) => ({ ...e, showed: true }));
      return newState;
    }
  };

  const initCategories = (data, contentCats = []) => {
    data = data.sort((a, b) => a.name.localeCompare(b.name));
    data = data.sort((a, b) => b.isPopularCat - a.isPopularCat);

    data = data.map((e) => {
      e.selected = contentCats.includes(e._id);
      e.userSelect = contentCats.includes(e._id);
      e.displayed = true;

      return e;
    });
    data = data.sort((a, b) => b.selected - a.selected);

    setCategories(data);
  };

  const sortCategories = (categories) => {
    categories = categories.sort((a, b) => a.name.localeCompare(b.name));
    categories = categories.sort((a, b) => b.selected - a.selected);

    return categories;
  };

  const getCategories = async (contentCats = []) => {
    if (categories.length === 0) {
      getRequest("/upload/get-categories")
        .then(({ data }) => {
          initCategories(data, contentCats);
        })
        .catch((error) => {
          errorHandler(error);
        });
    } else {
      initCategories(categories, contentCats);
    }
  };

  return {
    searchCategory,
    initCategories,
    sortCategories,
    getCategories,
  };
}
