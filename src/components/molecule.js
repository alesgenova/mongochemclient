import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MoleculeMenu from './menu.js'

class Molecule extends Component {

  componentRef = 0;

  static generateOrbitals(cjson) {
    if (!cjson) {
      return [];
    }

    if (!cjson.basisSet || !cjson.molecularOrbitals) {
      return [];
    }

    const numbers = cjson.molecularOrbitals.numbers;
    const electronCount = cjson.basisSet.electronCount;
    const energies = cjson.molecularOrbitals.energies

    const orbitals = [];
    for (let i = 0; i < numbers.length; i += 1) {
        const mode = numbers[i];
        const energy = energies[i].toFixed(4);

        let text = '';
        if (mode === electronCount / 2) {
            text = ' (HOMO)';
        }
        else if (mode === electronCount / 2 + 1) {
            text = ' (LUMO)';
        }
        //
        let oObj = { id: mode, label: `${mode}, ${energy}` + text };
        orbitals.push(oObj);
    }

    return orbitals;
  }

  constructor(props) {
    super(props)

    if (this.props.animation) {
      this.state = {
          animation: {...this.props.animation}
      }
    }
    else {
      this.state = {}
    }

    if (this.props.isoSurfaces) {
      this.state.isoSurfaces = this.props.isoSurfaces;
    }
    else {
      this.state.isoSurfaces = this.isoSurfaces();
    }
  }

  onAmplitude = (value) => {
    this.setState({
      animation: {
        amplitude: value
      }
    })
  }

  onIsoScale = (value) => {
    const isoSurfaces = this.isoSurfaces(value);
    this.setState({
      isoSurfaces: isoSurfaces
    })
    this._setWcOptions()
  }

  componentDidMount() {
    this._setWcCjson()
    this._setWcOptions()
  }

  componentDidUpdate() {
    this._setWcCjson()
    this._setWcOptions()
  }

  _setWcCjson(){
    this.componentRef.cjson = this.props.cjson;
  }

  _setWcOptions(){
    let options = {};
    options.isoSurfaces = this.state.isoSurfaces;
    this.componentRef.options = options;
  }

  render() {
    const animation = this.state.animation;
    const hasVolume = !!this.props.cjson && !!this.props.cjson.cube;
    const hasAnimation = !!animation && !!this.props.animateMode;

    return (
      <div>
        { (hasAnimation || hasVolume || this.props.orbitalControls) && <MoleculeMenu onAmplitude={this.onAmplitude}
                                                       onIsoScale={this.onIsoScale}
                                                       animationControls={hasAnimation}
                                                       orbitalControls={hasVolume || this.props.orbitalControls}
                                                       isoValue={this.state.isoSurfaces[0].value}
                                                       orbitals={Molecule.generateOrbitals(this.props.cjson)}
                                                       onOrbital={this.props.onOrbital}
                                                       orbital={this.props.orbital}
                                                                            /> }
        {/* <Molecule3d modelData={ moleculeToModelData(this.props.cjson, this.props.animateMode) }
                    volume={ this.props.cjson && this.props.cjson.cube ? this.props.cjson.cube : null }
                    isoSurfaces={ this.state.isoSurfaces }
                    backgroundColor='#ffffff' animation={{...animation}}/> */}
        <div style={{width: "50%", height: "20rem", position: "relative"}}>
          <oc-molecule-moljs ref={node=>this.componentRef = node}/>
        </div>
      </div>
    );
  }

  isoSurfaces(scale = 42) {
    const iso = (scale + 1) / 2000.0;

    return [{
      value: iso,
      color: 'blue',
      opacity: 0.9,
    }, {
      value: -iso,
      color: 'red',
      opacity: 0.9
    }
    ];
  }

}

Molecule.propTypes = {
  cjson: PropTypes.object,
  isoSurfaces: PropTypes.array,
  animateMode: PropTypes.number
}

Molecule.defaultProps = {
  cjson: null,
  isoSurfaces: null,
  animateMode: null
}

/* Obsolete, conversion from cjson is now done in the individual components
function moleculeToModelData(cjson, mode) {
  let modelData = {
      atoms: [],
      bonds: []
  }
  let eigenVectors = null;

  if (cjson == null) {
    return modelData
  }

  if (mode != null) {
    eigenVectors = cjson.vibrations.eigenVectors[mode-1];
  }

  const atoms = cjson.atoms;
  for (let [i, element] of atoms.elements.number.entries()) {
    const coords = atoms.coords['3d'];
    const coordsIndex = i * 3;
    let positions = [coords[coordsIndex], coords[coordsIndex+1], coords[coordsIndex+2]];

    let atom = {
        elem: elementSymbols[element],
        serial: i,
        positions,
    }

    if (eigenVectors != null) {
      atom.dx = eigenVectors[coordsIndex];
      atom.dy = eigenVectors[coordsIndex+1];
      atom.dz = eigenVectors[coordsIndex+2];
    }

    modelData.atoms.push(atom);
  }

  const bonds = cjson.bonds;
  for (let [i, order] of bonds.order.entries()) {
    const connections = bonds.connections.index;
    const connectionIndex = i*2;
    let bond = {
      atom1_index: connections[connectionIndex],
      atom2_index: connections[connectionIndex+1],
      bond_order: order
    }
    modelData.bonds.push(bond);
  }


  return modelData;
}
*/

export default Molecule
