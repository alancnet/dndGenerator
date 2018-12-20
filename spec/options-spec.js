// Lookup => List, No IDs
const generator = require('../')
describe('options', () => {
  it('should provide a list of options to present to the user', () => {
    const options = generator.getOptions()
    expect(options).toEqual({
      race: 'Race',
      sex: 'Sex',
      alignment: 'Alignment',
      plotHooks: 'Plot Hooks',
      occupation: 'Occupation'
    })
  })
  it('should give sub-options', () => {
    const options = generator.getOptions('occupation')
    expect(options).toEqual({
      random: 'Random',
      class: 'Class',
      profession: 'Profession'
    })
  })
  it('should give sub-options of sub-options', () => {
    const options = generator.getOptions('occupation', 'profession')
    expect(options).toEqual({
      socialClass: 'Social Class'
    })
  })
  it('should give sub-options of sub-options of sub-options', () => {
    const options = generator.getOptions('occupation', 'profession', 'socialClass')
    expect(options).toEqual({
      random: 'Random',
      learned: 'Learned',
      lesserNobility: 'Lesser Nobility',
      professional: 'Professional',
      workingClass: 'Working Class',
      martial: 'Martial',
      underclass: 'Underclass',
      entertainer: 'Entertainer'
    })
  })
  it('should give sub-options of sub-options of sub-options of sub-options', () => {
    const options = generator.getOptions('occupation', 'profession', 'socialClass', 'lesserNobility')
    expect(options).toEqual({
      random: 'Random',
      explorer: 'Explorer',
      diplomat: 'Diplomat',
      knight: 'Knight',
      minister: 'Minister',
      page: 'Page',
      squire: 'Squire'
    })
  })

  it('should give subraces', () => {
    const options = generator.getOptions('race', 'dwarf')
    expect(options).toEqual({
      random: 'Random',
      mountainDwarf: 'Mountain Dwarf',
      hillDwarf: 'Hill Dwarf'
    })
  })

  it('should be ever-expanding', () => {
    const test = (args) => {
      console.log(args.join('.'))
      options = generator.getOptions(...args)
      for (var key in options) {
        test([...args, key])
      }
    }
    test([])
  })
})
