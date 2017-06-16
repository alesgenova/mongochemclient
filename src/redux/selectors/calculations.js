// Pure state selection

export const getCalculationsById = state => state.calculations.byId;

export const getOrbitals = (state, id) => {
  if (id in state.calculations.orbitalsById) {
    return state.calculations.orbitalsById[id];
  }

  return {}
}

export const error = state => state.calculations.error;
