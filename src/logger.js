// TODO в npm пакет + дока
import differ from 'deep-diff'
import now from 'performance-now'

const
  dictionary = {
    E: {
      color: '#2196F3',
      text: 'CHANGED:'
    },
    N: {
      color: '#4CAF50',
      text: 'ADDED:'
    },
    D: {
      color: '#F44336',
      text: 'DELETED:'
    },
    A: {
      color: '#2196F3',
      text: 'ARRAY:'
    }
  },
  style = kind => `color: ${dictionary[kind].color}; font-weight: bold`,
  render = diff => {
    const { kind, path = [], lhs, rhs, index, item } = diff
 
    switch (kind) {
      case 'E':
        return `${path.join('.')} ${lhs} → ${rhs}`
      case 'N':
        return `${path.join('.')} ${rhs}`
      case 'D':
        return `${path.join('.')}`
      case 'A':
        return (`${path.join('.')}[${index}]`, item)
      default:
        return null
    }
  },
  renderDiff = elem => {
    const
      { kind } = elem,
      output = render(elem)

    console.debug(`%c ${dictionary[kind].text}`, style(kind), output)
  },
  logDiff = key => diff => {
    if (diff) {
      console.debug(`—— ${key} diff ——`)
      diff.forEach(renderDiff)
    } else {
      console.debug(`—— no ${key} diff ——`)
    }
  },
  logPropsDiff = logDiff('props'),
  logStateDiff = logDiff('state'),
  enabled = () => typeof localStorage != undefined && localStorage.debug !== 'false';

function logger(groupName, nextProps, nextState) {
    if (enabled(groupName)) {
        const
        startTime = now(),
        time = new Date(),
        propsDiff = differ(this.props, nextProps),
        stateDiff = differ(this.state, nextState),
        groupTitle = `${groupName} @${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

        console.groupCollapsed(groupTitle)
        logPropsDiff(propsDiff)
        logStateDiff(stateDiff)

        console.debug(`→ logger took ${(now() - startTime).toFixed(3)}ms`)
        console.groupEnd(groupName)
    }
}   

export default logger