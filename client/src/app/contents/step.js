import lodash from 'lodash'

function getStepName(code) {
  switch (code) {
    case 0:
      return '开始'
    case 1:
      return '处理'
    case 2:
      return '就绪'
    case 3:
      return '结束'
  }
}

function getCurrentStep(steps) {
  return getStepName(lodash.max(steps.map(step => step.step)))
}

export {
  getCurrentStep
}
