// Pure state selection

export const getHtmlById = (state, id) => {
  if (id in state.notebooks.htmlById) {
    return state.notebooks.htmlById[id];
  }

  return null;
}

