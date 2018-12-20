const tables = require('./tables')
const { camel } = require('case')
const mappings = {
  'occupation': 'classorprof',
  'socialClass': 'profession',
  'workClass': 'workingClass',
  'workingClass': 'workClass'
}
const mapping = key => mappings[key] || key
const presets = {
  '': {
    race: 'Race',
    sex: 'Sex',
    alignment: 'Alignment',
    plotHooks: 'Plot Hooks',
    occupation: 'Occupation'
  },
  'occupation': {
    random: 'Random',
    class: 'Class',
    profession: 'Profession'
  },
  'occupation.profession': {
    socialClass: 'Social Class'
  },
  'occupation.class': {
    class: 'Class'
  }
}
const presetTables = {
  '': Object.keys(presets['']),
  'occupation': ['class', 'profession']
}
const getOptions = (...args) => {
  const preset = presets[args.join('.')]
  if (preset) return preset

  const parent = Object.assign({}, getOptions(...args.slice(0, args.length - 1)))
  delete parent.random
  const parentTable = Object.keys(parent)
  let key = args[args.length - 1]
  const idx = parentTable.indexOf(key)
  const json = tables[mapping(key)]
  if (!json) return null
  const options = json.options
  const table = {
    random: 'Random'
  }
  for (let opt of options) {
    table[mapping(opt.table || camel(opt.name))] = opt.name
  }
  return table
}

// Fix races
Object.keys(getOptions('race')).forEach(race => (
  mappings[race] = 'race' + race
))

module.exports = {
  tables,
  getTableOptions: tablename => tables[tablename].options,
  getOptions
}
